import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Message from "../Components/Message";
import { Link, useParams, useLocation } from "react-router-dom";
import {
  Row,
  ListGroup,
  Col,
  Image,
  Form,
  Button,
  Card,
} from "react-bootstrap";
import { addToCart } from "../Actions/CartActions";

const CartScreen = ({ history }) => {
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

  const removeFromCartHandler = (id) => {
    console.log("remove");
  };

  const checkoutHandler = () => {
    history.pushState("/login?redirect=shipping"); // we will utilise this later , if they are logged in then they are going to redirect to shipping if not then to login
  };
  return (
    <Row>
      <Col md={8}>
        <h1>Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <Message>
            {" "}
            Your cart is empty <Link to="/"> Go Back</Link>
          </Message>
        ) : (
          <ListGroup variant="flush">
            {cartItems.map((item) => (
              <ListGroup.Item key={item.product}>
                <Row>
                  <Col md={2}>
                    <Image src={item.image} alt={item.name} fluid rounded />
                  </Col>

                  <Col md={3}>
                    <Link to={`/product/${item.product}`}> {item.name}</Link>
                  </Col>

                  <Col md={2}>${item.price}</Col>
                  <Col md={2}>
                    <Form.Control
                      as="select"
                      value={item.qty}
                      onChange={(e) => {
                        dispatch(
                          addToCart(item.product, Number(e.target.value))
                        );
                      }}
                    >
                      {[...Array(item.countInStock).keys()].map((x) => {
                        return (
                          <option key={x + 1} value={x + 1}>
                            {" "}
                            {x + 1}{" "}
                          </option>
                        );
                      })}
                    </Form.Control>
                  </Col>

                  <Col md={2}>
                    <button
                      type="button"
                      variant="light"
                      onClick={() => removeFromCartHandler(item.product)}
                    >
                      <i className="fas fa-trash"></i>
                    </button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Col>

      <Col md={4}>
        <Card>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>
                Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)})
                items
              </h2>
              $
              {cartItems
                .reduce((acc, item) => acc + item.qty * item.price, 0)
                .toFixed(2)}
            </ListGroup.Item>
            <ListGroup.Item>
              <Button
                type="button"
                ClassName="btn-block"
                disabled={cartItems.length == 0}
                onClick={checkoutHandler}
              >
                Proceed to checkOut
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>

      <Col md={2}></Col>
    </Row>
  );
};

export default CartScreen;
