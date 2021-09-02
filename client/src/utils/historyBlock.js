import React from "react";
import { Table } from "react-bootstrap";
import Moment from "react-moment";

const HistoryBlock = ({ history }) => {
  let sortedHistoryByDate = history.slice(0).reverse();
  return (
    <div style={{ marginBottom: "-0.8rem", marginLeft: "2px" }}>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Date</th>
            <th>Products</th>
            <th>Amount Paid</th>
            <th>Order ID</th>
          </tr>
        </thead>
        <tbody>
          {sortedHistoryByDate.map((item) => (
            <tr key={item.tansactionID}>
              <td>
                <Moment format="DD-MMM-YYYY">{item.date}</Moment>
              </td>
              <td>
                {item.items.map((article, i) => (
                  <div key={i}>{article.name}</div>
                ))}
              </td>
              <td>{item.amount}</td>
              <td>{item.orderID}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default HistoryBlock;
