import React from "react";
import { Table, Pagination, Modal, Button } from "react-bootstrap";
import Moment from "react-moment";
import Loader from "../../../../utils/loader";

const ProductsTable = ({
  prods,
  prev,
  next,
  edit,
  removeModal,
  handleClose,
  handleItemToRemove,
  modelToBeRemoved,
  handleRemove,
}) => {
  const goToPrevPage = (page) => {
    prev(page);
  };

  const goToNextPage = (page) => {
    next(page);
  };

  return (
    <>
      {prods && prods.docs ? (
        <>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Created</th>
                <th>Model</th>
                <th>Available</th>
                <th colSpan={2} style={{ textAlign: "center" }}>
                  Admin Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {prods.docs.map((item) => (
                <tr key={item._id}>
                  <td>
                    <Moment to={item.date}></Moment> (
                    <Moment format="DD-MMM-YYYY">{item.date}</Moment>)
                  </td>
                  <td>{item.model}</td>
                  <td>{item.available}</td>
                  <td
                    className="action_btn edit_btn"
                    onClick={() => edit(item._id)}
                  >
                    Edit
                  </td>
                  <td
                    className="action_btn remove_btn"
                    onClick={() => handleItemToRemove(item._id, item.model)}
                  >
                    Remove
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Pagination>
              {prods.hasPrevPage ? (
                <>
                  <Pagination.Prev
                    onClick={() => goToPrevPage(prods.prevPage)}
                  />
                  <Pagination.Item onClick={() => goToPrevPage(prods.prevPage)}>
                    {prods.prevPage}
                  </Pagination.Item>
                </>
              ) : null}
              <Pagination.Item active>{prods.page}</Pagination.Item>
              {prods.hasNextPage ? (
                <>
                  <Pagination.Item onClick={() => goToNextPage(prods.nextPage)}>
                    {prods.nextPage}
                  </Pagination.Item>
                  <Pagination.Next
                    onClick={() => goToNextPage(prods.nextPage)}
                  />
                </>
              ) : null}
            </Pagination>
          </div>
        </>
      ) : (
        <Loader />
      )}
      <Modal show={removeModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Are you sure?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          "{modelToBeRemoved}" will be deleted permanently.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleRemove}>
            Delete
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ProductsTable;
