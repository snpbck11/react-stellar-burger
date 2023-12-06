export const SET_AUTH_CHECKED = "SET_AUTH_CHECKED";
export const SET_USER = "SET_USER";

export const setAuthChecked = (payload) => ({type: SET_AUTH_CHECKED, payload});
export const setUser = (payload) => ({type: SET_USER, payload});