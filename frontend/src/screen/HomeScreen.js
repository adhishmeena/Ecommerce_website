import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col } from "react-bootstrap";
//import products from "../products"; //; commenting this as we want to get data from server/backend
import Product from "../Components/Product";
import Message from "../Components/Message";
import Loader from "../Components/Loader";
import { listproducts } from "../Actions/productActions";
//import axios from "axios";

const HomeScreen = () => {
  const dispatch = useDispatch(); // now we are using hooks to dispatch
  ///const [products, setProducts] = useState([]); // in below code products is been replace by setproducts

  const productList = useSelector((state) => state.productList); // 3) using useselector() hook to fetch data from state
  const { loading, error, products } = productList; // stoirng all states of productreducers

  useEffect(() => {
    dispatch(listproducts()); //1) firing of the actions , 2) used reducer to change the state and bring data to the state

    // // useEffect is same as salesforce connected callback , It loads everytime when this page is loaded

    // // axios.get("api/products"); // It returns promise so to handle it we are going to use async await https://javascript.info/async-await

    // const fetchproducts = async () => {
    //   // const res =  await axios.get("api/products");// this res has data variable , here I am using destructure

    //   const { data } = await axios.get("/api/products");
    //   setProducts(data);
    //  };

    // calling fetchproducts function
    // fetchproducts();
  }, [dispatch]); // second parameter [] of useEffect is used to keep dependencies , It is genrally used when we want to fire useEffect on change of some values

  // const products = [];
  return (
    <>
      {/* <h1>HomeScreen</h1> */}
      {/* {products[0].name} */}

      <h1> Latest Products</h1>
      {loading ? (
        //  <h2>Loading....</h2>
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Row>
          {products.map(
            (
              product //as this arrow function has one line so we can return it like this
            ) => (
              <Col key={product._id} sm={12} md={8} lg={5} xl={3}>
                {/* <img src={product.image} /> */}
                <Product product={product} />
              </Col>
            )
          )}
        </Row>
      )}
    </>
  );
};

export default HomeScreen;
