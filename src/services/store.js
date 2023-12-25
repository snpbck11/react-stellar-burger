import { compose, createStore, applyMiddleware, combineReducers  } from 'redux';
import thunk from 'redux-thunk';
import { ingredientsReducer } from "./reducers/ingredients";
import { constructorReducer } from './reducers/burger-constructor';
import { ingredeintDetailsReducer } from './reducers/ingredient-details';
import { orderDetailsReducer } from './reducers/order-details';
import userReducer from './reducers/user';
import { socketMiddleware } from './socket-middleware/socket-middleware';
import { FEED_CONNECT, FEED_DISCONNECT, FEED_WS_CLOSE, FEED_WS_CONNECTING, FEED_WS_ERROR, FEED_WS_MESSAGE, FEED_WS_OPEN } from './actions/feed';
import { feedReducer } from './reducers/feed';
import { orderReducer } from './reducers/order';

const feedMiddleware = socketMiddleware({
  wsConnect: FEED_CONNECT,
  wsDisconnect: FEED_DISCONNECT,
  wsConnecting: FEED_WS_CONNECTING,
  onOpen: FEED_WS_OPEN,
  onClose: FEED_WS_CLOSE,
  onError: FEED_WS_ERROR,
  onMessage: FEED_WS_MESSAGE
})

const composeEnhancers = typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ 
? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) 
: compose; 

const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  burgerConstructor: constructorReducer,
  ingredientDetails: ingredeintDetailsReducer,
  orderDetails: orderDetailsReducer,
  user: userReducer,
  feed: feedReducer,
  order: orderReducer
});

const enhancer = composeEnhancers(applyMiddleware(thunk, feedMiddleware));

export const store = createStore(rootReducer, enhancer);