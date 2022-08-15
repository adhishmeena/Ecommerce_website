import {
  legacy_createStore as createStore,
  combineReducers,
  applyMiddleware,
} from "redux";

import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import {
  ProductListReducer,
  ProductDetailsReducer,
} from "./Reducers/ProductReducers";
import { CartReducer } from "./Reducers/CartReducer";

import {
  userLoginReducer,
  userRegisterReducer,
  userDetailsReducer,
} from "./Reducers/userReducers";
const reducer = combineReducers({
  productList: ProductListReducer,
  ProductDetails: ProductDetailsReducer,
  cart: CartReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
});

const cartItemsFromStorage = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const initialState = {
  cart: { cartItems: cartItemsFromStorage },
  userLogin: { userInfo: userInfoFromStorage },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
