export const socketMiddleware = (wsActions) => {
  return store => {
    let socket = null;

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
        dispatch({type: wsConnecting});
      };

      if (socket) {
        socket.onopen = () => {
          dispatch({type: onOpen});
        };

        socket.onerror = () => {
          dispatch({type: onError, payload: "Error"});
        };

        socket.onmessage = event => {
          const { data } = event;
          const parsedData = JSON.parse(data);
          const { success, ...restParsedData } = parsedData;

          dispatch({type: onMessage, payload: restParsedData});
        };

        socket.onclose = () => {
          dispatch({type: onClose});
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