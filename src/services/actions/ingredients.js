export const GET_INGREDIENTS = "GET_INGREDIENTS";
export const GET_INGREDIENTS_SUCCESS = "GET_INGREDIENTS_SUCCESS";
export const GET_INGREDIENTS_FAILED = "GET_INGREDIENTS_FAILED";

export const getIngredientsRequest = () => ({type: GET_INGREDIENTS});
export const ingredientsRequestSuccess = (payload) => ({type: GET_INGREDIENTS_SUCCESS, payload});
export const ingredientsRequestFailed = () => ({type: GET_INGREDIENTS_FAILED});