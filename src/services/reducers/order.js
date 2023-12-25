import { GET_ORDER_REQUEST, GET_ORDER_REQUEST_FAILED, GET_ORDER_REQUEST_SUCCES } from "../actions/order";

const initialState = {
  order: null,
  orderRequest: false,
  orderRequestFailed: false
};

export const orderReducer = (state = initialState, action) => {
  switch(action.type) {
    case GET_ORDER_REQUEST: {
      return {...state, orderRequest: true}
    };
    case GET_ORDER_REQUEST_SUCCES: {
      return {
        ...state, order: action.payload.orders[0], orderRequest: false, orderRequestFailed: false
      };
    };
    case GET_ORDER_REQUEST_FAILED: {
      return {
        ...state, orderRequest: false, orderRequestFailed: true
      };
    };
    default: return state;
  };
};