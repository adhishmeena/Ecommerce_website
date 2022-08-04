import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Message from "../Components/Message";
import { Link, useParams, useLocation } from "react-router-dom";
import { Row, ListGroup, Image, Form, Button, Card } from "react-bootstrap";
import { addToCart } from "../Actions/CartActions";

const CartScreen = () => {
  let params = useParams();
  let location = useLocation();
  const productId = params.id;
  const qty = location.search ? Number(location.search.split("=")[1]) : 1;

  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart); // useSelector takes an arrow functions

  const { cartItems } = cart;

  console.log(cartItems);

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, productId, qty]);
  //console.log(qty);

  // alert("inside");
  return <div>CartScreen</div>;
};

export default CartScreen;
