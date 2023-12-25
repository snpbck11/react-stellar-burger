import { resetConstructor } from "../services/actions/burger-constructor";
import { getIngredientsRequest, ingredientsRequestFailed, ingredientsRequestSuccess } from "../services/actions/ingredients";
import { getOrderNumber, orderNumberFailed, orderNumberSuccess } from "../services/actions/order-details";

const baseUrl = "https://norma.nomoreparties.space/api";

const checkResponse = (res) => {
  return res.ok ? res.json() : Promise.reject(`Ошибка ${res.status}`);
};

const checkSuccess = (res) => {
  return res && res.success ? res : Promise.reject(`Ответ не success: ${res.success}`);
};

const request = (endpoint, options) => {
  return fetch(`${baseUrl}${endpoint}`, options)
  .then(checkResponse)
  .then(checkSuccess)
};

export const getIngredientsData = () => {
  return request(`/ingredients`)
};

export const getOrderNumberRequest = (idArray) => {
  return fetchWithRefresh(`${baseUrl}/orders`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      authorization: localStorage.getItem("accessToken"),
    }, 
    body: JSON.stringify({
      "ingredients": idArray,
    })
  })
};

export const getIngredients = () => {
  return dispatch => {
    dispatch(getIngredientsRequest());
    getIngredientsData()
    .then((res) => dispatch(ingredientsRequestSuccess(res.data)))
    .catch((err) => {
      dispatch(ingredientsRequestFailed());
      console.log(err);
    })        
  }
};

export const getOrderDetails = (idArray) => {
  return dispatch => {
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
  }
};

export const forgotPaswordRequest = (email) => {
  return request('/password-reset', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    }, 
    body: JSON.stringify({
      "email": email
    })
  })
};

export const resetPassword = (form) => {
  return request('/password-reset/reset', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    }, 
    body: JSON.stringify({
      "password": form.password,
      "token": form.token
    })
  })
};

export const getUserRegister = (user) => {
  return request('/auth/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    }, 
    body: JSON.stringify({
      "email": user.email,
      "password": user.password,
      "name": user.name
    })
  })
}

export const getUserLogin = (user) => {
  return request('/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify({
      "email": user.email,
      "password": user.password
    })
  })
}

export const getUserLogout = () => {
  return request('/auth/logout', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify({
      "token": localStorage.getItem("refreshToken")
    })
  })
}

const refreshToken = () => {
  return request('/auth/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify({
      token: localStorage.getItem("refreshToken")
    })
  })
};

const fetchWithRefresh = async (url, options) => {
  try {
    const res = await fetch(url, options);
    return await checkResponse(res);
  } catch (err) {
    if (err.message === "jwt expired") {
      const refreshData = await refreshToken();
      if (!refreshData.success) {
        return Promise.reject(refreshData);
      }
      localStorage.setItem("refreshToken", refreshData.refreshToken);
      localStorage.setItem("accessToken", refreshData.accessToken);
      options.headers.authorization = refreshData.accessToken;
      const res = await fetch(url, options);
      return await checkResponse(res);
    } else {
      return Promise.reject(err);
    }
  }
};

export const getUserData = () => {
  return fetchWithRefresh(`${baseUrl}/auth/user`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      authorization: localStorage.getItem("accessToken")
    }
  })
};

export const updateUserData = (user) => {
  return fetchWithRefresh(`${baseUrl}/auth/user`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      authorization: localStorage.getItem("accessToken")
    },
    body: JSON.stringify({
      "email": user.email,
      "name": user.name,
      "password": user.password
    })
  })
};

export const getOrderRequestApi = (number) => {
  return request(`/orders/${number}`)
};