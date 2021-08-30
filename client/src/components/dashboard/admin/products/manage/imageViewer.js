import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";

function ImageViewer({ formik, deleteImage }) {
  const [idToDelete, setIdToDelete] = useState(null);
  const [show, setShow] = useState(false);

  const handleClose = ()=>{
      setShow(false)
  }
  const handleShow = (index)=>{
      setIdToDelete(index)
    setShow(true)
}
 
 const confirmDelete = ()=>{
     deleteImage(idToDelete)
     handleClose()
    setIdToDelete(null)


 }


  return (
    <>
      {formik.values && formik.values.images
        ? formik.values.images.map((item, i) => (
            <div
              key={item}
              className="pic_block"
              onClick={() => handleShow(i)}
              style={{ background: `url(${item})` }}
            ></div>
          ))
        : null}

        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Confirm Delete</Modal.Title>
            </Modal.Header>
            <Modal.Body>Are you sure about deleting this image?</Modal.Body>
            <Modal.Footer>
                <Button variant="danger" onClick={confirmDelete}>Delete</Button>
                <Button variant="secondary" onClick={handleClose}>Close</Button>
            </Modal.Footer>
        </Modal>
    </>
  );
}

export default ImageViewer;
