export const GET_ORDER_NUMBER = "GET_ORDER_NUMBER";
export const ORDER_NUMBER_SUCCESS = "ORDER_NUMBER_SUCCESS";
export const ORDER_NUMBER_FAILED = "ORDER_NUMBER_FAILED";
export const SHOW_ORDER_DETAILS = "SHOW_ORDER_DETAILS";
export const CLOSE_ORDER_DETAILS = "CLOSE_ORDER_DETAILS";

export const getOrderNumber = () => ({type: GET_ORDER_NUMBER});
export const orderNumberSuccess = (payload) => ({type: ORDER_NUMBER_SUCCESS, payload});
export const orderNumberFailed = () => ({type: ORDER_NUMBER_FAILED});
export const showOrder = () => ({type: SHOW_ORDER_DETAILS});
export const closeOrder = () => ({type: CLOSE_ORDER_DETAILS});