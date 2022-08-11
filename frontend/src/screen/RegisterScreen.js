import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Form, Button, Row, Col, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import message from "../Components/Message";
import Loader from "../Components/Loader";
import { register } from "../Actions/UserActions";
import FormContainer from "../Components/FormContainer";
import Message from "../Components/Message";

const RegisterScreen = () => {
  let location = useLocation();
  const Nav = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setconfirmpassword] = useState("");
  const [message, setmessage] = useState(null);
  const dispatch = useDispatch();

  const userRegister = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userRegister;

  const redirect = location.search ? location.search.split("=")[1] : "/";
  //alert(JSON.stringify(redirect));

  useEffect(() => {
    if (userInfo) {
      Nav(redirect);
    }
  }, [userInfo, redirect]);
  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmpassword) {
      setmessage("Passwords do not match");
    } else {
      dispatch(register(name, email, password));
    }
    dispatch(register(name, email, password));
    //DISPATCH REGISTER
    ////dispatch(login(email, password));
  };
  return (
    <Container className="Justify-content-md-center">
      <Row className="Justify-content-md-center">
        <Col xs={12} md={6} className="py-3">
          <h1>Sign Up</h1>
          {message && <Message variant="danger"> {message}</Message>}
          {error && <Message variant="danger"> {error}</Message>}
          {loading && <Loader />}
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="name"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="email">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="password" className="py-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="confirmpassword" className="py-3">
              <Form.Label>confirm password</Form.Label>
              <Form.Control
                type="password"
                placeholder="confirm password"
                value={confirmpassword}
                onChange={(e) => setconfirmpassword(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Button type="submit" variant="primary">
              {" "}
              Register
            </Button>
          </Form>
          <Row className="py-3">
            <Col>
              have an Account?{" "}
              <Link to={redirect ? `/login?redirect=${redirect}` : "/login"}>
                Click here
              </Link>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default RegisterScreen;
