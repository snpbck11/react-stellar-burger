import { getOrderRequestApi } from "../../utils/api";
import {
  GET_ORDER_REQUEST,
  GET_ORDER_REQUEST_SUCCES,
  GET_ORDER_REQUEST_FAILED
} from '../constants/order';
import { AppDispatch, AppThunk } from "../types";
import { TOrderInfo } from "../types/data";

// Необходимо подсадить AppThunk !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

interface IGetOrderRequestAction {
  readonly type: typeof GET_ORDER_REQUEST;
};

interface IGetOrderRequestSuccesAction {
  readonly type: typeof GET_ORDER_REQUEST_SUCCES;
  readonly payload: any
};

interface IGetOrderRequestFailedAction {
  readonly type: typeof GET_ORDER_REQUEST_FAILED
};

export type TGetOrderRequestActions =
  | IGetOrderRequestAction
  | IGetOrderRequestSuccesAction
  | IGetOrderRequestFailedAction;

const getOrderRequest = (): IGetOrderRequestAction => ({ type: GET_ORDER_REQUEST });
const getOrderSuccess = (payload: TOrderInfo): IGetOrderRequestSuccesAction => ({ type: GET_ORDER_REQUEST_SUCCES, payload });
const getOrderFailed = (): IGetOrderRequestFailedAction => ({ type: GET_ORDER_REQUEST_FAILED });

export const getOrder: AppThunk = (number: number) => {
  return (dispatch: AppDispatch) => {
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