import { getUser } from "../actions/user";
import { Middleware, MiddlewareAPI } from "redux";
import { AppDispatch, RootState } from "../types";
import type { IWebsocketActions } from "../actions/feed";

export const socketMiddleware = (wsActions: IWebsocketActions): Middleware => {
  return (store: MiddlewareAPI<AppDispatch, RootState>) => {
    let socket: WebSocket | null = null;

    return next => action => {
      const { dispatch } = store;
      const { type } = action;
      const {
        wsConnect,
        wsSendMessage,
        onOpen,
        onClose,
        onError,
        wsConnecting,
        wsDisconnect,
        onMessage
      } = wsActions;

      if (type === wsConnect) {
        socket = new WebSocket(action.payload);
        dispatch({ type: wsConnecting });
      };

      if (socket) {
        socket.onopen = () => {
          dispatch({ type: onOpen });
        };

        socket.onerror = () => {
          dispatch({ type: onError, payload: "Error" });
        };

        socket.onmessage = event => {
          const { data } = event;
          const parsedData = JSON.parse(data);

          if (parsedData.message === "Invalid or missing token") {
            getUser();
          } else {
            dispatch({ type: onMessage, payload: parsedData });
          };
        };

        socket.onclose = () => {
          dispatch({ type: onClose });
        };

        if (type === wsSendMessage) {
          socket.send(JSON.stringify(action.payload));
        };

        if (type === wsDisconnect) {
          socket.close();
          socket = null;
        }
      };

      next(action);
    };
  };
};