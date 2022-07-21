import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  ListGroupItem,
  Form,
} from "react-bootstrap";

import { useDispatch, useSelector } from "react-redux";
import Rating from "../Components/Rating";
import { listproductDetails } from "../Actions/productActions";
import Loader from "../Components/Loader";
import Message from "../Components/Message";
//import products from "../products";
//import { useParams } from "react-router-dom";

const ProductScreen = () => {
  let params = useParams(); // use this to read link
  let Nav = useNavigate();
  const [Quantity, setQty] = useState(0);

  // const product = products.find((p) => p._id === params.id);
  const dispatch = useDispatch();

  const ProductDetails = useSelector((state) => state.ProductDetails);
  const { loading, error, product } = ProductDetails;

  useEffect(() => {
    //let params = useParams();

    dispatch(listproductDetails(params.id));

    // alert(JSON.stringify(params.id));

    // useEffect is same as salesforce connected callback , It loads everytime when this page is loaded

    // axios.get("api/products"); // It returns promise so to handle it we are going to use async await https://javascript.info/async-await
    //    let params = useParams();

    // const fetchproduct = async () => {
    //   // const res =  await axios.get("api/products");// this res has data variable , here I am using destructure
    //   const { data } = await axios.get(`/api/products/${params.id}`); // after proxy this will behave as http://localhost:5000/api/products/1
    //   setproduct(data);
    // };
    // // calling fetchproducts function
    // fetchproduct();
  }, [dispatch]); // second parameter [] of useEffect is used to keep dependencies , It is genrally used when we want to fire useEffect on change of some values

  const AddToCartHandler = () => {
    Nav(`/cart/${params.id}?Quantity=${Quantity}`);
  };

  return (
    <>
      <Link className="btn btn-dark my-3" to="/">
        {" "}
        Go Back{" "}
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Row>
          <Col md={6}>
            <Image src={product.image} alt={product.name} fluid />{" "}
            {/*  // fluid will keep the image in container */}
          </Col>
          <Col md={3}>
            <ListGroup variant="flush">
              <ListGroup.Item>{product.name}</ListGroup.Item>
              <ListGroup.Item>
                <Rating
                  value={product.rating}
                  text={`${product.numReviews} reviews`}
                />
              </ListGroup.Item>

              <ListGroup.Item>Price : ${product.price}</ListGroup.Item>
              <ListGroup.Item>
                description : ${product.description}
              </ListGroup.Item>
            </ListGroup>
          </Col>

          <Col md={3}>
            <Card>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Row>
                    <Col>price</Col>
                    <Col>
                      <strong> ${product.price} </strong>
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Status</Col>
                    <Col>
                      <strong>
                        {" "}
                        $
                        {product.countInStock > 0
                          ? "In Stock"
                          : "Out of Stock"}{" "}
                      </strong>
                    </Col>
                  </Row>
                </ListGroup.Item>

                {product.countInStock > 0 && (
                  <ListGroup.Item>
                    <Row>
                      <Col>Quantity</Col>

                      <Col>
                        <Form.Control
                          as="select"
                          value={Quantity}
                          onChange={(event) => {
                            return setQty(event.target.value);
                          }}
                        >
                          {[...Array(product.countInStock).keys()].map((x) => {
                            return (
                              <option key={x + 1} value={x + 1}>
                                {" "}
                                {x + 1}{" "}
                              </option>
                            );
                          })}
                        </Form.Control>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                )}

                <ListGroup.Item>
                  <Button
                    onClick={AddToCartHandler}
                    className="btn-block"
                    type="button"
                    style={{ width: "100%" }}
                    disabled={product.countInStock === 0}
                    fluid
                  >
                    Add to Cart
                  </Button>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      )}
    </>
  );
};

export default ProductScreen;
