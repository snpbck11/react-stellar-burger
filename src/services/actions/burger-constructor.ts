import { v4 as uuid } from "uuid";

import {
  ADD_BUN,
  ADD_INGREDIENT,
  DELETE_INGREDIENT,
  RESET_CONSTRUCTOR,
  SWAP_INGREDIENT
} from '../constants/burger-constructor';

import type { TIngredient } from "../types/data";

interface IAddBunAction {
  readonly type: typeof ADD_BUN;
  readonly bun: TIngredient;
};

interface IAddIngredientAction {
  readonly type: typeof ADD_INGREDIENT;
  readonly payload: TIngredient;
};

interface IDeleteIngredientAction {
  readonly type: typeof DELETE_INGREDIENT;
  readonly payload: TIngredient;
};

interface IResetConstructorAction {
  readonly type: typeof RESET_CONSTRUCTOR;
};

interface ISwapIngredientAction {
  readonly type: typeof SWAP_INGREDIENT;
  readonly payload: ReadonlyArray<TIngredient>;
};

export type TBurgerConstructorActions =
  | IAddBunAction
  | IAddIngredientAction
  | IDeleteIngredientAction
  | IResetConstructorAction
  | ISwapIngredientAction;

export const addBun = (bun: TIngredient): IAddBunAction => ({ type: ADD_BUN, bun });
export const addIngredient = (ingredient: TIngredient): IAddIngredientAction => {
  return {
    type: ADD_INGREDIENT,
    payload: {
      ...ingredient,
      uniqueId: uuid()
    }
  };
};
export const deleteInredient = (payload: TIngredient): IDeleteIngredientAction => ({ type: DELETE_INGREDIENT, payload });
export const resetConstructor = (): IResetConstructorAction => ({ type: RESET_CONSTRUCTOR });
export const swapIngredient = (payload: ReadonlyArray<TIngredient>): ISwapIngredientAction => ({ type: SWAP_INGREDIENT, payload });