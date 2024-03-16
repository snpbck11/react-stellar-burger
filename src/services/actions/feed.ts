import {
  FEED_CONNECT,
  FEED_DISCONNECT,
  FEED_WS_CLOSE,
  FEED_WS_CONNECTING,
  FEED_WS_ERROR,
  FEED_WS_MESSAGE,
  FEED_WS_OPEN,
  FEED_WS_SEND_MESSAGE
} from "../constants/feed";
import { socketMiddleware } from '../socket-middleware/socket-middleware';

import type { TMessage } from "../types/data";

export interface IFeedConnectAction {
  readonly type: typeof FEED_CONNECT;
  readonly payload: string;
};

export interface IFeedDisconnectAction {
  readonly type: typeof FEED_DISCONNECT;
};

export interface IFeedWSCloseAction {
  readonly type: typeof FEED_WS_CLOSE;
};

export interface IFeedWSConnectingAction {
  readonly type: typeof FEED_WS_CONNECTING;
};

export interface IFeedWSErrorAction {
  readonly type: typeof FEED_WS_ERROR;
  readonly payload: string;
};

export interface IFeedWSMessageAction {
  readonly type: typeof FEED_WS_MESSAGE;
  readonly payload: TMessage
};

export interface IFeedWSOpenAction {
  readonly type: typeof FEED_WS_OPEN;
};

export type TFeedActions =
  | IFeedConnectAction
  | IFeedDisconnectAction
  | IFeedWSCloseAction
  | IFeedWSConnectingAction
  | IFeedWSErrorAction
  | IFeedWSMessageAction
  | IFeedWSOpenAction

export const connect = (url: string): IFeedConnectAction => ({
  type: FEED_CONNECT,
  payload: url
});

export const disconnect = (): IFeedDisconnectAction => ({
  type: FEED_DISCONNECT
});

export interface IWebsocketActions {
  readonly wsConnect: typeof FEED_CONNECT;
  readonly wsDisconnect: typeof FEED_DISCONNECT;
  readonly wsConnecting: typeof FEED_WS_CONNECTING;
  readonly onOpen: typeof FEED_WS_OPEN;
  readonly onClose: typeof FEED_WS_CLOSE;
  readonly onError: typeof FEED_WS_ERROR;
  readonly onMessage: typeof FEED_WS_MESSAGE;
  readonly wsSendMessage: typeof FEED_WS_SEND_MESSAGE;
};

export const feedMiddleware = socketMiddleware({
  wsConnect: FEED_CONNECT,
  wsDisconnect: FEED_DISCONNECT,
  wsConnecting: FEED_WS_CONNECTING,
  onOpen: FEED_WS_OPEN,
  onClose: FEED_WS_CLOSE,
  onError: FEED_WS_ERROR,
  onMessage: FEED_WS_MESSAGE,
  wsSendMessage: FEED_WS_SEND_MESSAGE
});