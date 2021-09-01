import React from "react";
import { Modal, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const AddToCartHandler = ({ modal, handleClose, errorType }) => {
  return (
    <>
      <Modal show={modal} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Sorry------</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {errorType === "auth" ? (
            <div>Sorry you need to register/signin to continue</div>
          ) : (
            <div>Sorry you need to verify your email to continue</div>
          )}
        </Modal.Body>
        <Modal.Footer>
          {errorType === "auth" ? (
            <LinkContainer to="/sign_in">
              <Button variant="primary">Register/SignIn</Button>
            </LinkContainer>
          ) : (
              //TODO: Send verification again
            <LinkContainer to="/sign_in">
              <Button variant="primary">Resend verification mail</Button>
            </LinkContainer>
          )}
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AddToCartHandler;
