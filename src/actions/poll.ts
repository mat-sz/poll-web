import { ActionModel, PollModel } from '../types/Models';
import { ActionType } from '../types/ActionType';

export function subscribeAction(shortId: string): ActionModel {
  return {
    type: ActionType.SUBSCRIBE,
    value: shortId,
  };
}

export function unsubscribeAction(shortId: string): ActionModel {
  return {
    type: ActionType.UNSUBSCRIBE,
    value: shortId,
  };
}

export function replaceSubscriptionAction(poll: PollModel): ActionModel {
  console.log(poll);
  return {
    type: ActionType.REPLACE_SUBSCRIPTION,
    value: poll,
  };
}

export function removeSubscriptionAction(shortId: string): ActionModel {
  return {
    type: ActionType.REMOVE_SUBSCRIPTION,
    value: shortId,
  };
}

export function voteAction(shortId: string, answerId: string): ActionModel {
  return {
    type: ActionType.VOTE,
    value: {
      shortId,
      answerId,
    },
  };
}
