import { MessageType } from './MessageType';

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
}

export interface SubscriptionResponseMessageModel extends MessageModel {
  type: MessageType.SUBSCRIPTION_RESPONSE;
  success: boolean;
  channel: string;
}

export type Message =
  | WelcomeMessageModel
  | ErrorMessageModel
  | PingMessageModel
  | SubscriptionRequestMessageModel
  | SubscriptionResponseMessageModel;
