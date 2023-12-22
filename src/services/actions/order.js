import { getOrderRequestApi } from "../../utils/api";

export const GET_ORDER_REQUEST = "GET_ORDER_REQUEST";
export const GET_ORDER_REQUEST_SUCCES = "GET_ORDER_REQUEST_SUCCESS";
export const GET_ORDER_REQUEST_FAILED = "GET_ORDER_REQUEST_FAILED";

const getOrderRequest = () => ({type: GET_ORDER_REQUEST});
const getOrderSuccess = (payload) => ({type: GET_ORDER_REQUEST_SUCCES, payload});
const getOrderFailed = () => ({type: GET_ORDER_REQUEST_FAILED});

export const getOrder = (number) => {
  return dispatch => {
    dispatch(getOrderRequest());

    getOrderRequestApi(number)
    .then((res) => {
      dispatch(getOrderSuccess(res));
    })
    .catch((err) => {
      dispatch(getOrderFailed());
      console.log(`Ошибка ${err}`);
    })
  };
};