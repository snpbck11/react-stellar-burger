import { compose, createStore, applyMiddleware, combineReducers  } from 'redux';
import thunk from 'redux-thunk';
import { ingredientsReducer } from "./reducers/ingredients";
import { constructorReducer } from './reducers/burger-constructor';
import { ingredeintDetailsReducer } from './reducers/ingredient-details';
import { orderDetailsReducer } from './reducers/order-details';

const composeEnhancers = typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ 
? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) 
: compose; 

const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  burgerConstructor: constructorReducer,
  ingredientDetails: ingredeintDetailsReducer,
  orderDetails: orderDetailsReducer
});

const enhancer = composeEnhancers(applyMiddleware(thunk));

export const store = createStore(rootReducer, enhancer);