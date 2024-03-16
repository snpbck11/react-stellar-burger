import {
  TypedUseSelectorHook,
  useSelector as selectorHook,
  useDispatch as dispatchHook
} from 'react-redux';
import { AppDispatch, AppThunk, RootState } from '../services/types/index';

export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;
export const useDispatch = () => dispatchHook<AppDispatch | AppThunk>();