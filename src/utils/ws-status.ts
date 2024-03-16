export const wsUrl = "wss://norma.nomoreparties.space/orders/all";
export const wsUrlProfile = (url: string) => `wss://norma.nomoreparties.space/orders?token=${url}`;

interface IWebsocketStatus {
  CONNECTING: "CONNECTING",
  ONLINE: "ONLINE",
  OFFLINE: "OFFLINE"
};

export const WebsocketStatus: IWebsocketStatus = {
  CONNECTING: "CONNECTING",
  ONLINE: "ONLINE",
  OFFLINE: "OFFLINE"
};