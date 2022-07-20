import React, { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
//import products from "../products";; commenting this as we want to get data from server/backend
import Product from "../Components/Product";
import axios from "axios";

const HomeScreen = () => {
  const [products, setProducts] = useState([]); // in below code products is been replace by setproducts

  useEffect(() => {
    // useEffect is same as salesforce connected callback , It loads everytime when this page is loaded

    // axios.get("api/products"); // It returns promise so to handle it we are going to use async await https://javascript.info/async-await

    const fetchproducts = async () => {
      // const res =  await axios.get("api/products");// this res has data variable , here I am using destructure

      const { data } = await axios.get("/api/products");
      setProducts(data);
    };

    // calling fetchproducts function
    fetchproducts();
  }, []); // second parameter [] of useEffect is used to keep dependencies , It is genrally used when we want to fire useEffect on change of some values
  return (
    <>
      {/* <h1>HomeScreen</h1> */}
      {/* {products[0].name} */}
      <Row>
        {products.map(
          (
            product //as this arrow function has one line so we can return it like this
          ) => (
            <Col key={product._id} sm={12} md={8} lg={4} xl={3}>
              {/* <img src={product.image} /> */}
              <Product product={product} />
            </Col>
          )
        )}
      </Row>
    </>
  );
};

export default HomeScreen;
