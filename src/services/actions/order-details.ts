import { getOrderNumberRequest } from "../../utils/api";
import {
  GET_ORDER_NUMBER,
  ORDER_NUMBER_SUCCESS,
  ORDER_NUMBER_FAILED,
  SHOW_ORDER_DETAILS,
  CLOSE_ORDER_DETAILS
} from "../constants/order-details";
import { AppDispatch } from "../types";
import { resetConstructor } from "./burger-constructor";
 
interface IGetOrderNumberAction {
  readonly type: typeof GET_ORDER_NUMBER;
};

interface IOrderNumberSuccessAction {
  readonly type: typeof ORDER_NUMBER_SUCCESS;
  readonly payload: number;
};

interface IOrderNumberFailedAction {
  readonly type: typeof ORDER_NUMBER_FAILED;
};

interface IShowOrderDetailsAction {
  readonly type: typeof SHOW_ORDER_DETAILS;
};

interface ICloseOrderDetailsAction {
  readonly type: typeof CLOSE_ORDER_DETAILS;
};

export type TOrderNumberActions =
  | IGetOrderNumberAction
  | IOrderNumberSuccessAction
  | IOrderNumberFailedAction
  | IShowOrderDetailsAction
  | ICloseOrderDetailsAction;

export const getOrderNumber = (): IGetOrderNumberAction => ({ type: GET_ORDER_NUMBER });
export const orderNumberSuccess = (payload: number): IOrderNumberSuccessAction => ({ type: ORDER_NUMBER_SUCCESS, payload });
export const orderNumberFailed = (): IOrderNumberFailedAction => ({ type: ORDER_NUMBER_FAILED });
export const showOrder = (): IShowOrderDetailsAction => ({ type: SHOW_ORDER_DETAILS });
export const closeOrder = (): ICloseOrderDetailsAction => ({ type: CLOSE_ORDER_DETAILS });

export const getOrderDetails = (idArray: string[] | undefined) => {
  return (dispatch: AppDispatch) => {
    dispatch(getOrderNumber());
    getOrderNumberRequest(idArray)
      .then((res) => {
        dispatch(orderNumberSuccess(res.order.number));
        dispatch(resetConstructor());
      })
      .catch((err) => {
        dispatch(orderNumberFailed());
        console.log(err);
      });
  };
};