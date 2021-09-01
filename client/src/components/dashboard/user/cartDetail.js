import React from "react";
import { renderCardImage } from "../../../utils/tools";

const CartDetail = ({ products, removeItem }) => {
  const renderItems = () =>
    products
      ? products.map((product, index) => (
          <div className="user_product_block" key={`${product._id}`}>
            <div className="item">
              {/* <div
                className="image"
                style={{
                  background: `url(${renderCardImage(
                    product.images
                  )}) no-repeat`,
                }}
              ></div> */}
              <div className="image">
              <img
                alt={product.model}
                src={renderCardImage(product.images)}
                width="125px"
                height="125px"
              ></img>
              </div>
            </div>
            <div className="item" style={{ marginTop: "25px",marginLeft: "5px" }}>
              <h4>Product name</h4>
              <div>
              <strong><span style={{ color: "#2196F3", marginLeft: "5px" }}>{product.brand.name}  </span></strong>
                <strong><span>{product.model}</span></strong>
              </div>
            </div>
            <div className="item" style={{ marginTop: "25px" }}>
              <h4>Price</h4>
              <div>
                <span style={{ color: "#B12704",marginLeft: "2px" }}>${product.price}</span>
              </div>
            </div>

            <div className="item btn">
              <div
                className="cart_remove_btn"  style={{ marginBottom: "25px" }}
                onClick={() => removeItem(index)}
              >
                Remove
              </div>
            </div>
          </div>
        ))
      : null;

  return <div>{renderItems()}</div>;
};

export default CartDetail;
