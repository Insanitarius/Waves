import React, { useState } from "react";
import { WavesButton } from "../../utils/tools";
import { useSelector, useDispatch } from "react-redux";

import LocalShippingIcon from "@material-ui/icons/LocalShipping";
import DoneOutlineIcon from "@material-ui/icons/DoneOutline";
import SentimentVeryDissatisfiedIcon from "@material-ui/icons/SentimentVeryDissatisfied";

const ProdInfo = (props) => {
  const detail = props.detail;

  const showProdTags = (detail) => (
    <div className="product_tags">
      <div className="tag">
        <div>
          <LocalShippingIcon />
        </div>
        <div className="tag_text">
          {detail.shipping ? (
            <div> Free shipping in India Only </div>
          ) : (
            <div> No shipping for this product </div>
          )}
        </div>
      </div>
      {detail.available > 0 ? (
        <div className="tag">
          <div>
            <DoneOutlineIcon />
          </div>
          <div className="tag_text">
            <div>
              <strong>{detail.available}</strong> available in stock
            </div>
          </div>
        </div>
      ) : (
        <div className="tag">
          <div>
            <SentimentVeryDissatisfiedIcon />
          </div>
          <div className="tag_text">
            <div>This product is out of stock</div>
          </div>
        </div>
      )}
    </div>
  );


  const showProdActions = (detail)=>(
      <div className="product_actions">
          <div className="price">${detail.price}</div>
          <div className="cart">
              <WavesButton type="add_to_cart_link" runAction={()=> alert('Add to cart')} />
          </div>
      </div>
  )

  
  const showProdSpecs = (detail)=>(
    <div className="product_specifications">
        <h2>Specs:</h2>
        <div>
            <div className="item">
                <strong>Frets: </strong> {detail.frets}
            </div>
            <div className="item">
                <strong>WoodType: </strong> {detail.woodtype}
            </div>
        </div>
    </div>
)






  return (
    <div>
      {/* FIXME */}
      <h1 style={{ color: "#2196F3", display: "inline" }}>
        {detail.brand.name}{" "}
      </h1>
      <h1 style={{ display: "inline" }}>{detail.model}</h1>
      {/* TILL HERE */}
      <p>{detail.description}</p>
      {showProdTags(detail)}
      {showProdActions(detail)}
      {showProdSpecs(detail)}
    </div>
  );
};

export default ProdInfo;
