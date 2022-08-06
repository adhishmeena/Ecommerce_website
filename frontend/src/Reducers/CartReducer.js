import { CART_ADD_ITEMS, CART_REMOVE_ITEMS } from "../Constants/CartConstants";

import React from "react";

export const CartReducer = (state = { cartItems: [] }, action) => {
  switch (action.type) {
    case CART_ADD_ITEMS:
      const item = action.payload;

      const existItem = state.cartItems.find((x) => x.product === item.product);

      if (existItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((x) =>
            x.product === existItem.product ? item : x
          ),
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, item],
        };
      }

    case CART_REMOVE_ITEMS:
      return {
        ...state,
        cartItems: state.cartItems.filter((x) => x.product !== action.payload), // it will return all the items which is not equal to delete items
      };

    default:
      return state;
  }
};

//export default CartReducer
