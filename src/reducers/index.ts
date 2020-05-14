import { ActionModel, PollModel } from '../types/Models';
import { ActionType } from '../types/ActionType';
import { Store } from 'redux';

export interface StateType {
  connected: boolean;
  error?: string;
  clientId?: string;
  subscribedPolls: Record<string, PollModel>;
}

let initialState: StateType = {
  connected: false,
  error: undefined,
  clientId: undefined,
  subscribedPolls: {},
};

export type StoreType = Store<StateType, ActionModel>;

function applicationState(state = initialState, action: ActionModel) {
  const newState = { ...state };
  switch (action.type) {
    case ActionType.SET_ERROR:
      newState.error = action.value as string;
      break;
    case ActionType.DISMISS_ERROR:
      newState.error = undefined;
      break;
    case ActionType.SET_CONNECTED:
      newState.connected = action.value as boolean;
      break;
    case ActionType.SET_CLIENT_ID:
      newState.clientId = action.value as string;
      break;
    case ActionType.REPLACE_SUBSCRIPTION:
      newState.subscribedPolls[action.value.shortId] = action.value;
      newState.subscribedPolls = { ...newState.subscribedPolls };
      break;
    case ActionType.REMOVE_SUBSCRIPTION:
      delete newState.subscribedPolls[action.value];
      newState.subscribedPolls = { ...newState.subscribedPolls };
      break;
    default:
      return state;
  }

  return newState;
}

export default applicationState;
