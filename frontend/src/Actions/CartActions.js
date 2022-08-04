import axios from "axios";
import { CART_ADD_ITEMS } from "../Constants/CartConstants";
// we can use getState to get any state  (ex:- ProductDetails etc that we have mentioned in store.js )
// react thunk allow to pass function within a function
export const addToCart = (id, qty) => async (dispatch, getState) => {
  const { date } = await axios.get(`/api/products/${id}`);

  dispatch({
    type: CART_ADD_ITEMS,

    payload: {
      product: data._id,
      name: data.name,
      image: data.image,
      price: data.price,
      countInStock: data.countInStock,
      qty,
    },
  });

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};
