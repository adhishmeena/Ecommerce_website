import React from "react";
import { Container, Row, Col } from "react-bootstrap"; // we are not using this
const FormContainer = ({ Children }) => {
  return (
    <Container>
      <Row className="Justify-content-md-center">
        <Col xs={12} md={6}>
          {Children}
        </Col>
      </Row>
    </Container>
  );
};

export default FormContainer;
