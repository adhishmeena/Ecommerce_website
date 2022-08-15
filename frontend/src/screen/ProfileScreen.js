import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate, useHistory } from "react-router-dom";
import { Form, Button, Row, Col, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import message from "../Components/Message";
import Loader from "../Components/Loader";
import { getUserDetails } from "../Actions/UserActions";

import Message from "../Components/Message";

const ProfileScreen = () => {
  let location = useLocation();
  const Nav = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setconfirmpassword] = useState("");
  const [message, setmessage] = useState(null);
  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const redirect = location.search ? location.search.split("=")[1] : "/";
  //alert(JSON.stringify(redirect));

  useEffect(() => {
    if (!userInfo) {
      Nav("/login");
    } else {
      if (!user.name) {
        dispatch(getUserDetails("profile")); // this will send profile(string) to action
      } else {
        setName(user.name);
        setEmail(user.email);
      }
    }
  }, [dispatch, userInfo, redirect, user]);
  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmpassword) {
      setmessage("Passwords do not match");
    } else {
      //dispatch update profile
      /// dispatch(register(name, email, password));
    }
    /// dispatch(register(name, email, password));
    //DISPATCH REGISTER
    ////dispatch(login(email, password));
  };
  return (
    <Row>
      <Col md={3}>
        <h2>User Profile</h2>
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
            Update
          </Button>
        </Form>
      </Col>

      <Col md={9}>
        <h2>My Orders</h2>
      </Col>
    </Row>
  );
};

export default ProfileScreen;
