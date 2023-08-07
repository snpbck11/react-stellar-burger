export const SHOW_INGREDIENT_DETAILS = "SHOW_INGREDIENT_DETAILS";
export const CLOSE_INGREDIENT_DETAILS = "CLOSE_INGREDIENT_DETAILS";

export const showIngredientDetails = (payload) => ({type: SHOW_INGREDIENT_DETAILS, payload});
export const closeIngredientDetails = () => ({type: CLOSE_INGREDIENT_DETAILS});