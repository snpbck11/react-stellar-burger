const accessToken = localStorage.getItem("accessToken")?.replace("Bearer ", "");

export const wsUrl = "wss://norma.nomoreparties.space/orders/all";
export const wsUrlProfile = `wss://norma.nomoreparties.space/orders?token=${accessToken}`;

export const WebsocketStatus = {
  CONNECTING: "CONNECTING",
  ONLINE: "ONLINE",
  OFFLINE: "OFFLINE"
};