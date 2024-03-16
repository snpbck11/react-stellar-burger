import { SHOW_INGREDIENT_DETAILS, CLOSE_INGREDIENT_DETAILS } from "../constants/ingredient-details";
import { TIngredient } from "../types/data";

export interface IShowIngredientDetailsAction {
  readonly type: typeof SHOW_INGREDIENT_DETAILS;
  readonly payload: TIngredient;
};

export interface ICloseIngredientDetailsAction {
  readonly type: typeof CLOSE_INGREDIENT_DETAILS;
};

export type TIngredientDetailsActions =
  | IShowIngredientDetailsAction
  | ICloseIngredientDetailsAction;

export const showIngredientDetails = (payload: TIngredient): IShowIngredientDetailsAction => ({ type: SHOW_INGREDIENT_DETAILS, payload });
export const closeIngredientDetails = (): ICloseIngredientDetailsAction => ({ type: CLOSE_INGREDIENT_DETAILS });