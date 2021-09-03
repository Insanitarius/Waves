import React from "react";
import { Pagination, Button } from "react-bootstrap";

const PaginateNav = ({ prods, prev, next, resetSearch }) => {
  const goToPrevPage = (page) => {
    prev(page);
  };
  const goToNextPage = (page) => {
    next(page);
  };

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      {prods.docs.length > 0 ? (
        <Pagination>
          {prods.hasPrevPage ? (
            <>
              <Pagination.Prev onClick={() => goToPrevPage(prods.prevPage)} />
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
              <Pagination.Next onClick={() => goToNextPage(prods.nextPage)} />
            </>
          ) : null}
        </Pagination>
      ) : (
        <div>
          <h5>No items found</h5>
          <Button className="mt-3" variant="danger" onClick={resetSearch}>
            Reset Search
          </Button>
        </div>
      )}
    </div>
  );
};

export default PaginateNav;
