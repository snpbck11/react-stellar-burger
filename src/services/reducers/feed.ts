import {
  FEED_WS_CLOSE,
  FEED_WS_CONNECTING, FEED_WS_ERROR, FEED_WS_MESSAGE,
  FEED_WS_OPEN
} from "../constants/feed";
import type { TOrder } from "../types/data";
import type { TFeedActions } from "../actions/feed";
import { WebsocketStatus } from "../../utils/ws-status";

export type TFeedState = {
  status: string,
  orders: ReadonlyArray<TOrder>,
  total: number | null,
  totalToday: number | null,
  connectingError: string,
  isLoading: boolean 
};

const initialState: TFeedState = {
  status: WebsocketStatus.OFFLINE,
  orders: [],
  total: null,
  totalToday: null,
  connectingError: "",
  isLoading: false
};

export const feedReducer = (state = initialState, action: TFeedActions) => {
  switch (action.type) {
    case FEED_WS_CONNECTING:
      return {
        ...state,
        status: WebsocketStatus.CONNECTING
      };
    case FEED_WS_OPEN:
      return {
        ...state,
        status: WebsocketStatus.ONLINE,
        connectingError: '',
        isLoading: true,
      };
    case FEED_WS_CLOSE:
      return {
        ...state,
        status: WebsocketStatus.OFFLINE
      };
    case FEED_WS_ERROR:
      return {
        ...state,
        connectingError: action.payload
      };
    case FEED_WS_MESSAGE:
      return {
        ...state,
        orders: action.payload.orders,
        total: action.payload.total,
        totalToday: action.payload.totalToday,
        isLoading: false,
      };
    default:
      return state
  };
};