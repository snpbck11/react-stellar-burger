import { combineReducers } from "redux";
import { constructorReducer } from "./burger-constructor";
import { feedReducer } from "./feed";
import { ingredeintDetailsReducer } from "./ingredient-details";
import { ingredientsReducer } from "./ingredients";
import { orderReducer } from "./order";
import { orderDetailsReducer } from "./order-details";
import { userReducer } from "./user";

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  burgerConstructor: constructorReducer,
  ingredientDetails: ingredeintDetailsReducer,
  orderDetails: orderDetailsReducer,
  user: userReducer,
  feed: feedReducer,
  order: orderReducer
});