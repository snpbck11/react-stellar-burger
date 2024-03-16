import {
  GET_ORDER_NUMBER,
  ORDER_NUMBER_SUCCESS,
  ORDER_NUMBER_FAILED,
  SHOW_ORDER_DETAILS,
  CLOSE_ORDER_DETAILS
} from "../constants/order-details";

import type { TOrderNumberActions } from "../actions/order-details";

type TOrderNumberState = {
  orderNumber: number,
  isLoading: boolean,
  isFailed: boolean,
  isOpen: boolean
};

const initialState: TOrderNumberState = {
  orderNumber: 99999,
  isLoading: false,
  isFailed: true,
  isOpen: false
};

export const orderDetailsReducer = (state = initialState, action: TOrderNumberActions) => {
  switch (action.type) {
    case GET_ORDER_NUMBER: {
      return {
        ...state, isLoading: true
      };
    };
    case ORDER_NUMBER_SUCCESS: {
      return {
        ...state, orderNumber: action.payload, isLoading: false, isFailed: false
      };
    };
    case ORDER_NUMBER_FAILED: {
      return {
        ...state, isFailed: true
      };
    };
    case SHOW_ORDER_DETAILS: {
      return {
        ...state, isOpen: true
      };
    };
    case CLOSE_ORDER_DETAILS: {
      return {
        ...state, isOpen: false
      };
    };
    default:
      return state;
  };
};