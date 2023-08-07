import { resetConstructor } from "../services/actions/burger-constructor";
import { getIngredientsRequest, ingredientsRequestFailed, ingredientsRequestSuccess } from "../services/actions/ingredients";
import { getOrderNumber, orderNumberFailed, orderNumberSuccess } from "../services/actions/order-details";


const baseUrl = "https://norma.nomoreparties.space/api";

const checkResponse = (res) => {
  return res.ok ? res.json() : res.json().then((err) => Promise.reject(err))
}

const request = (endpoint, options) => {
  return fetch(`${baseUrl}${endpoint}`, options)
  .then(checkResponse)
}

export const getIngredientsData = () => {
  return request(`/ingredients`)
}

export const getOrderNumberRequest = (idArray) => {
  return request('/orders', {
    method: 'POST',
    headers:{
      'Content-Type': 'application/json'
    }, 
    body: JSON.stringify({
      "ingredients": idArray
    })
  })
}

export const getIngredients = () => {
  return dispatch => {
    dispatch(getIngredientsRequest());
    getIngredientsData()
    .then((res) => dispatch(ingredientsRequestSuccess(res.data)))
    .catch((err) => {
      dispatch(ingredientsRequestFailed());
      console.log(`Ошибка ${err}`);
    })        
  }
}

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
      console.log(`Ошибка ${err}`);
    });
  }
}