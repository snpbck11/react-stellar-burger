const baseUrl = "https://norma.nomoreparties.space/api";

const checkResponse = (res) => {
  return res.ok ? res.json() : res.json().then((err) => Promise.reject(err))
}

const request = (endpoint, options) => {
  return fetch(`${baseUrl}${endpoint}`, options)
  .then(checkResponse)
}

export default request