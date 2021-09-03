import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";

import { Card, CardMedia, CardActionArea } from "@material-ui/core";

function ImageViewer({ formik, deleteImage }) {
  const [idToDelete, setIdToDelete] = useState(null);
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
  };
  const handleShow = (index) => {
    setIdToDelete(index);
    setShow(true);
  };

  const confirmDelete = () => {
    deleteImage(idToDelete);
    handleClose();
    setIdToDelete(null);
  };

  return (
    <>
      {formik.values && formik.values.images
        ? formik.values.images.map((item, i) => (
            <Card
              className="pic_block"
              key={item}
              style={{ marginLeft: "6px" }}
            >
              <CardActionArea onClick={() => handleShow(i)}>
                <CardMedia
                  image={item}
                  className="pic_block"
                  height="100%"
                  width="100%"
                  style={{
                    imageRendering: "-webkit-optimize-contrast",
                  }}
                />
              </CardActionArea>
            </Card>
          ))
        : null}

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure about deleting this image?</Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={confirmDelete}>
            Delete
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ImageViewer;
