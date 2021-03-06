import React, { useState } from "react";
import { renderCardImage, showToast, WavesButton } from "../tools";
import { useSelector, useDispatch } from "react-redux";
import AddToCartHandler from "../addToCartHandler";
import { userAddToCart } from "../../store/actions/user.actions";

const Card = (props) => {
  const [modal, setModal] = useState(false);
  const [errorType, setErrorType] = useState(null);
  const user = useSelector((state) => state.users);
  const dispatch = useDispatch();

  const handleClose = () => setModal(false);

  const handleAddToCart = (item) => {
    if (!user.auth) {
      setModal(true);
      setErrorType("auth");
      return false;
    }
    if (!user.data.verified) {
      setModal(true);
      setErrorType("verify");
      return false;
    }
    if (item.available !== 0) {
      dispatch(userAddToCart(item));
    } else {
      showToast("ERROR", `${item.model} is out of stock!`);
    }
  };

  return (
    <div className={`card_item_wrapper ${props.grid ? "grid_bars" : ""}`}>
      <img
        alt={props.item.model}
        src={renderCardImage(props.item.images)}
        width="211px"
        height="278px"
        style={{ imageRendering: "-webkit-optimize-contrast" }}
      ></img>
      <div className="action_container">
        <div className="tags">
          <div className="brand">{props.item.brand.name}</div>
          <div className="name">{props.item.model}</div>
          <div className="price">${props.item.price}</div>
        </div>

        {props.grid ? (
          <div className="description">
            <p className="mt-3">{props.item.description}</p>
          </div>
        ) : null}

        <div className="actions">
          <div className="button_wrapp">
            <WavesButton
              type="default"
              altClass="card_link"
              title="View product"
              linkTo={`/product_detail/${props.item._id}`}
              style={{ fontWeight: "bold" }}
            />
          </div>
          <div className="button_wrapp">
            <WavesButton
              type="bag_link"
              runAction={() => handleAddToCart(props.item)}
              iconSize="23"
            />
          </div>
        </div>
      </div>
      <AddToCartHandler
        modal={modal}
        errorType={errorType}
        handleClose={handleClose}
      />
    </div>
  );
};

export default Card;
