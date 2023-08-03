import { SHOW_INGREDIENT_DETAILS, CLOSE_INGREDIENT_DETAILS } from "../actions/ingredient-details";

const initalState = {
  ingredientDetails: null
}

export const ingredeintDetailsReducer = (state = initalState, action) => {
  switch(action.type) {
    case SHOW_INGREDIENT_DETAILS: {
      return {
        ...state,
        ingredientDetails: action.payload
      }
    }
    case CLOSE_INGREDIENT_DETAILS: {
      return {
        ...state,
        ingredientDetails: null
      }
    }
    default:
      return state
  }
}