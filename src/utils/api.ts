import { TIngredient, TUser, TOrder, TUserResetPassword } from "../services/types/data";

const baseUrl = "https://norma.nomoreparties.space/api";

type TResponseBody<TDataKey extends string = '', TDataType = {}> = {
  [key in TDataKey]: TDataType
} & {
  success: boolean;
  message?: string;
  headers?: Headers;
  refreshToken: string;
  accessToken: string;
};

const checkResponse = (res: Response) => {
  return res.ok ? res.json() : Promise.reject(`Ошибка ${res.status}`);
};

const checkSuccess = <T extends { success: boolean }>(res: T) => {
  return res && res.success ? res : Promise.reject(`Ответ не success: ${res.success}`);
};

const request = (endpoint: string, options?: RequestInit) => {
  return fetch(`${baseUrl}${endpoint}`, options)
    .then(checkResponse)
    .then(checkSuccess)
};

export const getIngredientsData = (): Promise<TResponseBody<'data', TIngredient[]>> => {
  return request(`/ingredients`)
};

export const getOrderNumberRequest = (idArray: string[] | undefined): Promise<TResponseBody<'order', TOrder>> => {
  return fetchWithRefresh(`${baseUrl}/orders`, {
    method: 'POST',
    headers: {
      "Content-Type": 'application/json;charset=utf-8',
      authorization: localStorage.getItem("accessToken"),
    },
    body: JSON.stringify({
      "ingredients": idArray,
    })
  } as RequestInit);
};

export const forgotPaswordRequest = (email: string): Promise<TResponseBody> => {
  return request('/password-reset', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify({
      "email": email
    })
  });
};

export const resetPassword = (form: TUserResetPassword): Promise<TResponseBody<"user", TUser>> => {
  return request('/password-reset/reset', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify({
      "password": form.password,
      "token": form.token
    })
  });
};

export const getUserRegister = (user: TUser): Promise<TResponseBody<"user", TUser>> => {
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
  });
};

export const getUserLogin = (user: TUser): Promise<TResponseBody<"user", TUser>> => {
  return request('/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify({
      "email": user.email,
      "password": user.password
    })
  });
};

export const getUserLogout = (): Promise<TResponseBody<"user", TUser>> => {
  return request('/auth/logout', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify({
      "token": localStorage.getItem("refreshToken")
    })
  });
};

const refreshToken = (): Promise<TResponseBody<"user", TUser>> => {
  return request('/auth/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify({
      "token": localStorage.getItem("refreshToken")
    })
  });
};

const fetchWithRefresh = async (url: string, options: RequestInit) => {
  try {
    const res = await fetch(url, options);
    return await checkResponse(res);
  } catch (err: any) {
    if (err.message === "jwt expired") {
      const refreshData = await refreshToken();
      if (!refreshData.success) {
        return Promise.reject(refreshData);
      };
      localStorage.setItem("refreshToken", refreshData.refreshToken);
      localStorage.setItem("accessToken", refreshData.accessToken);
      options.headers = { ...options.headers, authorization: refreshData.accessToken }
      const res = await fetch(url, options);
      return await checkResponse(res);
    } else {
      return Promise.reject(err);
    };
  };
};

export const getUserData = (): Promise<TResponseBody<"user", TUser>> => {
  return fetchWithRefresh(`${baseUrl}/auth/user`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      authorization: localStorage.getItem("accessToken")
    }
  } as RequestInit);
};

export const updateUserData = (user: TUser): Promise<TResponseBody<"user", TUser>> => {
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
  } as RequestInit);
};

export const getOrderRequestApi = (number: number) => {
  return request(`/orders/${number}`)
};