import { SHOW_INGREDIENT_DETAILS, CLOSE_INGREDIENT_DETAILS } from "../constants/ingredient-details";

import type { TIngredientDetailsActions } from "../actions/ingredient-details";
import { TIngredient } from "../types/data";

export type TIngredientDetailsState = {
  ingredientDetails: TIngredient | null
};

const initalState: TIngredientDetailsState = {
  ingredientDetails: null
};

export const ingredeintDetailsReducer = (state = initalState, action: TIngredientDetailsActions) => {
  switch (action.type) {
    case SHOW_INGREDIENT_DETAILS: {
      return {
        ...state,
        ingredientDetails: action.payload
      };
    };
    case CLOSE_INGREDIENT_DETAILS: {
      return {
        ...state,
        ingredientDetails: null
      };
    };
    default:
      return state;
  };
};