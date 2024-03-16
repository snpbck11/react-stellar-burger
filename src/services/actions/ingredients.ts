import { getIngredientsData } from '../../utils/api';
import { GET_INGREDIENTS, GET_INGREDIENTS_SUCCESS, GET_INGREDIENTS_FAILED } from '../constants/ingredients';
import { AppDispatch, AppThunk } from '../types';
import { TIngredient } from '../types/data';

export interface IGetIngrtedientsAction {
  readonly type: typeof GET_INGREDIENTS;
};

export interface IGetIngrtedientsSuccessAction {
  readonly type: typeof GET_INGREDIENTS_SUCCESS;
  readonly payload: ReadonlyArray<TIngredient>;
};

export interface IGetIngrtedientsFailedAction {
  readonly type: typeof GET_INGREDIENTS_FAILED;
};

export type TGetIngredientsActions =
  | IGetIngrtedientsAction
  | IGetIngrtedientsSuccessAction
  | IGetIngrtedientsFailedAction

export const getIngredientsRequest = (): IGetIngrtedientsAction => ({ type: GET_INGREDIENTS });
export const ingredientsRequestSuccess = (payload: ReadonlyArray<TIngredient>): IGetIngrtedientsSuccessAction => ({ type: GET_INGREDIENTS_SUCCESS, payload });
export const ingredientsRequestFailed = (): IGetIngrtedientsFailedAction => ({ type: GET_INGREDIENTS_FAILED });

export const getIngredients: AppThunk = () => {
  return (dispatch: AppDispatch) => {
    dispatch(getIngredientsRequest());
    getIngredientsData()
      .then((res) => dispatch(ingredientsRequestSuccess(res.data)))
      .catch((err) => {
        dispatch(ingredientsRequestFailed());
        console.log(err);
      });
  };
};
