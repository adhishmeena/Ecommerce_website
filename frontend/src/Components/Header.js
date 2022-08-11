import React from "react";
import { useDispatch, useSelector } from "react-redux"; // we use useDispatch to call an action , and we use useselector for bringing state from redux
import { LinkContainer } from "react-router-bootstrap"; // LinkContainer is same as Link of React , It allows us to wrap bootstrap into container.
import { Nav, Navbar, Container, NavDropdown } from "react-bootstrap";
import { logout } from "../Actions/UserActions";
const Header = () => {
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  console.log(userLogin);
  const { userInfo } = userLogin;

  const logoutHandler = () => {
    console.log("logout");
    dispatch(logout());
  };
  return (
    <header>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>Online Store</Navbar.Brand>
          </LinkContainer>

          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="ms-auto">
              <LinkContainer to="/cart">
                <Nav.Link>
                  {" "}
                  <i className="fas fa-shopping-cart"></i> Cart
                </Nav.Link>
              </LinkContainer>
              {userInfo ? (
                <NavDropdown title={userInfo.name} id="username">
                  <LinkContainer to="/profile">
                    <NavDropdown.Item> Profile</NavDropdown.Item>
                  </LinkContainer>

                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer to="/Login">
                  <Nav.Link>
                    {" "}
                    <i className="fas fa-user"></i> Sign in
                  </Nav.Link>
                </LinkContainer>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
