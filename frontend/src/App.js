import React from "react";
import Header from "./Components/Header";
import { Container } from "react-bootstrap";
import Footer from "./Components/Footer";
import HomeScreen from "./screen/HomeScreen";
import ProductScreen from "./screen/ProductScreen";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <Router>
      <Header />
      <main className="py-3">
        <Container style={{ border: "2px solid black" }}>
          {/* <h1> Welcome to OnlineStore</h1> */}
          <Routes>
            <Route path="/" element={<HomeScreen />} exact />
            <Route path="/product/:id" element={<ProductScreen />} />
            {/*  In
            product.js component we have given path in this way so that we use
            it in router `/product/${product._id}` */}
          </Routes>
        </Container>
      </main>
      <Footer />
    </Router>
  );
};

export default App;
