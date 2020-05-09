import { put, takeEvery, call } from 'redux-saga/effects';

import { ActionModel, PingMessageModel, Message } from '../types/Models';
import { ActionType } from '../types/ActionType';
import { sendMessageAction } from '../actions/websocket';
import {
  setClientIdAction,
  setConnectedAction,
  setErrorAction,
} from '../actions/state';
import { MessageType } from '../types/MessageType';

function* message(action: ActionModel, dispatch: (action: any) => void) {
  const msg: Message = action.value as Message;

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
  }
}

function* connected() {
  yield put(setConnectedAction(true));
}

function* disconnected() {
  yield put(setConnectedAction(false));
}

export default function* root(dispatch: (action: any) => void) {
  yield takeEvery(ActionType.WS_MESSAGE, function* (action: ActionModel) {
    // TODO: rewrite this to avoid passing dispatch
    yield call(() => message(action, dispatch));
  });
  yield takeEvery(ActionType.WS_CONNECTED, connected);
  yield takeEvery(ActionType.WS_DISCONNECTED, disconnected);
}
