import { GET_ORDER_NUMBER, ORDER_NUMBER_SUCCESS, ORDER_NUMBER_FAILED, SHOW_ORDER_DETAILS, CLOSE_ORDER_DETAILS } from "../actions/order-details";

const initialState = {
  orderNumber: null,
  isLoading: false,
  isFailed: true,
  isOpen: false 
}

export const orderDetailsReducer = (state = initialState, action) => {
  switch(action.type) {
    case GET_ORDER_NUMBER: {
      return {
        ...state, isLoading: true
      }
    }
    case ORDER_NUMBER_SUCCESS: {
      return {
        ...state, orderNumber: action.payload, isLoading: false, isFailed: false
      }
    }
    case ORDER_NUMBER_FAILED: {
      return {
        ...state, isFailed: true
      }
    }
    case SHOW_ORDER_DETAILS: {
      return {
        ...state, isOpen: true
      }
    }
    case CLOSE_ORDER_DETAILS: {
      return {
        ...state, isOpen: false
      }
    }
    default:
      return state
  }
}