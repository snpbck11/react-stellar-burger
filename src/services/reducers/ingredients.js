import {
  GET_INGREDIENTS,
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_FAILED
} from "../actions/ingredients"

const initalState = {
  ingredientsRequest: false,
  ingredientsFailed: false,
  isLoading: false,
  ingredients: []
}

export const ingredientsReducer = (state = initalState, action) => {
  switch(action.type) {
    case GET_INGREDIENTS: {
      return {...state, isLoading: true, ingredientsRequest: true, ingredientsFailed: false}
    }
    case GET_INGREDIENTS_SUCCESS: {
      return {...state, isLoading: false, ingredientsRequest: false, ingredientsFailed: false, ingredients: [...state.ingredients, ...action.payload] }
    }
    case GET_INGREDIENTS_FAILED: {
      return {...state, ingredientsFailed: true, isLoading: false}
    }
    default:
      return state
  }
}