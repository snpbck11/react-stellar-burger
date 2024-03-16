import { getUserRegister, getUserData, getUserLogin, getUserLogout, updateUserData } from "../../utils/api";
import { AppThunk, AppDispatch } from "../types";

import { SET_AUTH_CHECKED, SET_USER } from "../constants/user";
import { TUser } from "../types/data";

interface ISetAuthCheckedAction {
  readonly type: typeof SET_AUTH_CHECKED;
  readonly payload: boolean;
};

interface ISetUserAction {
  readonly type: typeof SET_USER;
  readonly payload: TUser | null;
};

export type TSetUserActions =
  | ISetAuthCheckedAction
  | ISetUserAction

export const setAuthChecked = (payload: boolean): ISetAuthCheckedAction => ({ type: SET_AUTH_CHECKED, payload });
export const setUser = (payload: TUser | null): ISetUserAction => ({ type: SET_USER, payload });

export const getUser: AppThunk = () =>
  (dispatch: AppDispatch) => {
    return getUserData()
      .then((res) => {
        dispatch(setUser(res.user));
      })
  };

export const register: AppThunk = (user: TUser) =>
  (dispatch: AppDispatch) => {
    return getUserRegister(user)
      .then((res) => {
        if (res.success) {
          dispatch(setAuthChecked(true));
          dispatch(setUser(res.user));
          localStorage.setItem("accessToken", res.accessToken);
          localStorage.setItem("refreshToken", res.refreshToken);
        };
      })
      .catch(err => console.log(err))
  };

export const login: AppThunk = (user: TUser) =>
  (dispatch: AppDispatch) => {
    return getUserLogin(user)
      .then((res) => {
        dispatch(setAuthChecked(true));
        dispatch(setUser(res.user));
        localStorage.setItem("accessToken", res.accessToken);
        localStorage.setItem("refreshToken", res.refreshToken)
      })
      .catch(err => console.log(err))
  };

export const logout: AppThunk = () =>
  (dispatch: AppDispatch) => {
    return getUserLogout()
      .then(() => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        dispatch(setUser(null));
      })
      .catch(err => console.log(err))
  };

export const checkUserAuth: AppThunk = () =>
  (dispatch: AppDispatch) => {
    if (localStorage.getItem("accessToken")) {
      getUserData()
        .then((res) => {
          dispatch(setUser(res.user));
        })
        .catch((err) => {
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          dispatch(setUser(null));
          console.log(err);
        })
        .finally(() => dispatch(setAuthChecked(true)));
    } else {
      dispatch(setAuthChecked(true));
    };
  };

export const updateData: AppThunk = (user) => {
  return (dispatch: AppDispatch) => {
    updateUserData(user)
      .then((res) => {
        if (res.success) {
          dispatch(setUser(res.user))
        }
      })
      .catch(err => console.log(err))
  };
};
