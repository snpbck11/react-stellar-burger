import {v4 as uuid} from "uuid";

export const ADD_BUN = "ADD_BUN";
export const ADD_INGREDIENT = "ADD_INGREDIENT";
export const DELETE_INGREDIENT = "DELETE_INGREDIENT";
export const RESET_CONSTRUCTOR = "RESET_CONSTRUCTOR";
export const SWAP_INGREDIENT = "SWAP_INGREDIENT";

export const addBun = (payload) => ({type: ADD_BUN, payload});
export const addIngredient = (item) => {
  return {
    type: ADD_INGREDIENT, 
    payload: {
      ...item,
      uniqueId: uuid()
    }
  }
};
export const deleteInredient = (payload) => ({type: DELETE_INGREDIENT, payload});
export const resetConstructor = () => ({type: RESET_CONSTRUCTOR});
export const swapInredient = (payload) => ({type: SWAP_INGREDIENT, payload});