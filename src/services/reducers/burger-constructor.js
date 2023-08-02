import { ADD_BUN, ADD_INGREDIENT, DELETE_INGREDIENT, RESET_CONSTRUCTOR, SWAP_INGREDIENT } from "../actions/burger-constructor";

const initalState = {
    bun: {},
    ingredients: []
}

export const constructorReducer = (state = initalState, action) => {
  switch(action.type) {
    case ADD_BUN: {
      return {
        ...state,
        bun: action.payload
      }
    }
    case ADD_INGREDIENT: {
      return {
        ...state,
        ingredients: [...state.ingredients, action.payload]
      }
    } 
    case DELETE_INGREDIENT: {
      const index = state.ingredients.findIndex((ingredient) => ingredient === action.payload)
      if (index !== -1) {
        const newIngredients = [...state.ingredients]
        newIngredients.splice(index, 1)
        return {...state, ingredients: newIngredients}
      }
      return state
    }
    case SWAP_INGREDIENT: {
        const newIngredients = action.payload
        return {
          ...state,
          ingredients: [...newIngredients]
      }
    }
    
    case RESET_CONSTRUCTOR: {
      return {
        ...state,
        bun: {},
        ingredients: []
      }
    }
    default: 
      return state
  }
}

export const addBun = (payload) => ({type: ADD_BUN, payload});
export const addIngredient = (payload) => ({type: ADD_INGREDIENT, payload});
export const deleteInredient = (payload) => ({type: DELETE_INGREDIENT, payload});
export const resetConstructor = () => ({type: RESET_CONSTRUCTOR});
export const swapInredient = (payload) => ({type: SWAP_INGREDIENT, payload});