import { getUserRegister, getUserData, getUserLogin, getUserLogout, updateUserData } from "../../utils/api"

export const SET_AUTH_CHECKED = "SET_AUTH_CHECKED";
export const SET_USER = "SET_USER";

export const setAuthChecked = (payload) => ({type: SET_AUTH_CHECKED, payload});
export const setUser = (payload) => ({type: SET_USER, payload});

export const getUser = () => {
  return (dispatch) => {
    return getUserData()
      .then((res) => {
        dispatch(setUser(res.user));
      });
  };
};

export const register = (user) => {
  return (dispatch) => {
    return getUserRegister(user)
    .then((res) => {
      if (res.success) {
        dispatch(setAuthChecked(true));
        dispatch(setUser(res.user));
        localStorage.setItem("accessToken", res.accessToken);
        localStorage.setItem("refreshToken", res.refreshToken);
      };
    });
  };
};

export const login = (user) => {
  return (dispatch) => {
    return getUserLogin(user)
    .then((res) => {
      if (res.success) {
        dispatch(setAuthChecked(true));
        dispatch(setUser(res.user));
        localStorage.setItem("accessToken", res.accessToken);
        localStorage.setItem("refreshToken", res.refreshToken)
      };
    });
  };
};

export const logout = () => {
  return (dispatch) => {
    return getUserLogout()
    .then((res) => {
      if (res.success) {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        dispatch(setUser(null));
      };
    });
  };
}

export const checkUserAuth = () => {
  return (dispatch) => {
    if (localStorage.getItem("accessToken")) {
      dispatch(getUser())
      .catch(() => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        dispatch(setUser(null));
      })
      .finally(() => dispatch(setAuthChecked(true)));
    } else {
      dispatch(setAuthChecked(true));
    }
  };
};

export const updateData = (user) => {
  return (dispatch) => {
      updateUserData(user)
      .then((res) => {
        if (res.success) {
          dispatch(setUser(res.user))
        }
      })
  };
};