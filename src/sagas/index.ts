import { put, takeEvery, call } from 'redux-saga/effects';

import {
  ActionModel,
  PingMessageModel,
  Message,
  PollModel,
  SubscriptionRequestMessageModel,
  SubscriptionMode,
} from '../types/Models';
import { ActionType } from '../types/ActionType';
import { sendMessageAction } from '../actions/websocket';
import {
  setClientIdAction,
  setConnectedAction,
  setErrorAction,
} from '../actions/state';
import { MessageType } from '../types/MessageType';
import { apiServer } from '../config';
import {
  replaceSubscriptionAction,
  removeSubscriptionAction,
} from '../actions/poll';

function* message(action: ActionModel, dispatch: (action: any) => void) {
  const msg = action.value as Message;

  switch (msg.type) {
    case MessageType.WELCOME:
      yield put(setClientIdAction(msg.clientId));
      break;
    case MessageType.ERROR:
      yield put(setErrorAction(msg.message));
      break;
    case MessageType.PING:
      const pongMessage: PingMessageModel = {
        type: MessageType.PING,
        timestamp: new Date().getTime(),
      };
      yield put(sendMessageAction(pongMessage));
      break;
    case MessageType.SUBSCRIPTION_UPDATE:
      yield put(replaceSubscriptionAction(msg.value));
      break;
  }
}

function* connected() {
  yield put(setConnectedAction(true));
}

function* disconnected() {
  yield put(setConnectedAction(false));
}

function* subscribe(action: ActionModel) {
  const shortId = action.value as string;
  yield put(
    replaceSubscriptionAction({ shortId: shortId, title: 'Loading...' } as any)
  );

  const res = yield call(() => fetch(apiServer + 'v1/poll/' + shortId));
  const poll: PollModel = yield call(() => res.json());

  yield put(
    replaceSubscriptionAction(
      (poll.id ? poll : { shortId: shortId, title: 'Not found' }) as any
    )
  );

  const subscribeMessage: SubscriptionRequestMessageModel = {
    type: MessageType.SUBSCRIPTION_REQUEST,
    channel: shortId,
    mode: SubscriptionMode.SUBSCRIBE,
  };

  yield put(sendMessageAction(subscribeMessage));
}

function* unsubscribe(action: ActionModel) {
  const shortId = action.value as string;
  yield put(removeSubscriptionAction(shortId));

  const unsubscribeMessage: SubscriptionRequestMessageModel = {
    type: MessageType.SUBSCRIPTION_REQUEST,
    channel: shortId,
    mode: SubscriptionMode.UNSUBSCRIBE,
  };

  yield put(sendMessageAction(unsubscribeMessage));
}

function* vote(action: ActionModel) {
  const answerId = action.value.answerId as string;
  const shortId = action.value.shortId as string;

  yield call(() =>
    fetch(apiServer + 'v1/poll/' + shortId + '/vote', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ answerId }),
    })
  );
}

export default function* root(dispatch: (action: any) => void) {
  yield takeEvery(ActionType.WS_MESSAGE, function* (action: ActionModel) {
    // TODO: rewrite this to avoid passing dispatch
    yield call(() => message(action, dispatch));
  });
  yield takeEvery(ActionType.WS_CONNECTED, connected);
  yield takeEvery(ActionType.WS_DISCONNECTED, disconnected);

  yield takeEvery(ActionType.SUBSCRIBE, subscribe);
  yield takeEvery(ActionType.UNSUBSCRIBE, unsubscribe);

  yield takeEvery(ActionType.VOTE, vote);
}
