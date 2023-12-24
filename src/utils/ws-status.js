export const wsUrl = "wss://norma.nomoreparties.space/orders/all";
export const wsUrlProfile = (url) => `wss://norma.nomoreparties.space/orders?token=${url}`;

export const WebsocketStatus = {
  CONNECTING: "CONNECTING",
  ONLINE: "ONLINE",
  OFFLINE: "OFFLINE"
};