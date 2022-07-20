import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  ListGroupItem,
} from "react-bootstrap";
import Rating from "../Components/Rating";
import axios from "axios";
//import products from "../products";
//import { useParams } from "react-router-dom";

const ProductScreen = () => {
  let params = useParams(); // use this to read link

  // const product = products.find((p) => p._id === params.id);

  const [product, setproduct] = useState({});

  useEffect(() => {
    // useEffect is same as salesforce connected callback , It loads everytime when this page is loaded

    // axios.get("api/products"); // It returns promise so to handle it we are going to use async await https://javascript.info/async-await
    //    let params = useParams();

    const fetchproduct = async () => {
      // const res =  await axios.get("api/products");// this res has data variable , here I am using destructure
      const { data } = await axios.get(`/api/products/${params.id}`); // after proxy this will behave as http://localhost:5000/api/products/1
      setproduct(data);
    };
    // calling fetchproducts function
    fetchproduct();
  }, []); // second parameter [] of useEffect is used to keep dependencies , It is genrally used when we want to fire useEffect on change of some values

  return (
    <>
      <Link className="btn btn-dark my-3" to="/">
        {" "}
        Go Back{" "}
      </Link>

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
                      ${product.countInStock > 0
                        ? "In Stock"
                        : "Out of Stock"}{" "}
                    </strong>
                  </Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Button
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
    </>
  );
};

export default ProductScreen;
