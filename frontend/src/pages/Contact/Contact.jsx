import React from "react";
import Container from "react-bootstrap/esm/Container";
import { Row, Col, Form, Button } from "react-bootstrap";
import MainLayout from "../../components/Layout/MainLayout";

function Contact() {
  return (
    <MainLayout>
      <Container className="align-items-center min-vh-100">
        <h1 className="text-center py-5">Contact</h1>
        <Row>
          <Col>
            <Form>
              <Form.Group controlId="email">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" />
              </Form.Group>
              <Form.Group controlId="message" className="my-5">
                <Form.Label>Message</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Enter message"
                />
              </Form.Group>
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </MainLayout>
  );
}

export default Contact;
