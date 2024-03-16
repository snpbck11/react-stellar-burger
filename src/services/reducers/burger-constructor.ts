import { TBurgerConstructorActions } from "../actions/burger-constructor";
import { ADD_BUN, ADD_INGREDIENT, DELETE_INGREDIENT, RESET_CONSTRUCTOR, SWAP_INGREDIENT } from "../constants/burger-constructor";
import type { TIngredient } from "../types/data";

export type TBurgerConstructorState = {
  bun: TIngredient | null,
  ingredients: ReadonlyArray<TIngredient>
};

const initalState: TBurgerConstructorState = {
  bun: null,
  ingredients: []
};

export const constructorReducer = (state = initalState, action: TBurgerConstructorActions) => {
  switch (action.type) {
    case ADD_BUN: {
      return {
        ...state,
        bun: action.bun
      };
    };
    case ADD_INGREDIENT: {
      return {
        ...state,
        ingredients: [...state.ingredients, action.payload]
      };
    };
    case DELETE_INGREDIENT: {
      const index = state.ingredients.findIndex((ingredient) => ingredient === action.payload)
      if (index !== -1) {
        const newIngredients = [...state.ingredients]
        newIngredients.splice(index, 1)
        return { ...state, ingredients: newIngredients }
      };
      return state
    };
    case SWAP_INGREDIENT: {
      const newIngredients = action.payload
      return {
        ...state,
        ingredients: [...newIngredients]
      };
    };
    case RESET_CONSTRUCTOR: {
      return {
        ...state,
        bun: null,
        ingredients: []
      };
    };
    default:
      return state
  };
};