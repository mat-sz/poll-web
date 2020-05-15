import { MessageType } from './MessageType';

export enum SubscriptionMode {
  SUBSCRIBE = 'subscribe',
  UNSUBSCRIBE = 'unsubscribe',
}

export interface AnswerModel {
  id: string;
  text: string;
  count: number;
}

export interface PollModel {
  id: string;
  title: string;
  answerIds: string[];
  answers?: AnswerModel[];
  shortId?: string;
}

export interface ActionModel {
  type: string;
  value: any;
}

export interface MessageModel {
  type: MessageType;
}

export interface WelcomeMessageModel extends MessageModel {
  type: MessageType.WELCOME;
  clientId: string;
  authenticationMode: string;
}

export interface ErrorMessageModel extends MessageModel {
  type: MessageType.ERROR;
  message: string;
}

export interface PingMessageModel extends MessageModel {
  type: MessageType.PING;
  timestamp: number;
}

export interface SubscriptionRequestMessageModel extends MessageModel {
  type: MessageType.SUBSCRIPTION_REQUEST;
  channel: string;
  mode: SubscriptionMode;
}

export interface SubscriptionResponseMessageModel extends MessageModel {
  type: MessageType.SUBSCRIPTION_RESPONSE;
  success: boolean;
  channel: string;
  mode: SubscriptionMode;
}

export interface SubscriptionUpdateMessageModel extends MessageModel {
  type: MessageType.SUBSCRIPTION_UPDATE;
  channel: string;
  value: any;
}

export type Message =
  | WelcomeMessageModel
  | ErrorMessageModel
  | PingMessageModel
  | SubscriptionRequestMessageModel
  | SubscriptionResponseMessageModel
  | SubscriptionUpdateMessageModel;
