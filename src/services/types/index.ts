import { TBurgerConstructorActions } from "../actions/burger-constructor";
import { TFeedActions } from "../actions/feed";
import { TIngredientDetailsActions } from "../actions/ingredient-details";
import { TGetIngredientsActions } from "../actions/ingredients";
import { TGetOrderRequestActions } from "../actions/order";
import { TOrderNumberActions } from "../actions/order-details";
import { store } from "../store";
import { ThunkAction } from "redux-thunk";
import { Action, ActionCreator, Dispatch } from "redux";
import { TSetUserActions } from "../actions/user";

export type RootState = ReturnType<typeof store.getState>;

type TApplicationActions =
  | TBurgerConstructorActions
  | TFeedActions
  | TIngredientDetailsActions
  | TGetIngredientsActions
  | TOrderNumberActions
  | TGetOrderRequestActions
  | TSetUserActions

export type AppThunk<TReturn = void> = ActionCreator<ThunkAction<TReturn, Action, RootState, TApplicationActions>>;
export type AppDispatch = Dispatch<TApplicationActions>;