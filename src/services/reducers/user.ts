import { SET_AUTH_CHECKED, SET_USER } from "../constants/user";

import type { TSetUserActions } from "../actions/user";
import { TUser } from "../types/data";

type TSetUserState = {
  user: TUser | null,
  isAuthChecked: boolean
};

const initialState: TSetUserState = {
  user: null,
  isAuthChecked: false
};

export const userReducer = (state = initialState, action: TSetUserActions) => {
  switch (action.type) {
    case SET_AUTH_CHECKED:
      return {
        ...state,
        isAuthChecked: action.payload
      };
    case SET_USER:
      return {
        ...state,
        user: action.payload
      };
    default:
      return state;
  };
};