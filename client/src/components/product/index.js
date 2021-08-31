import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearProductById } from "../../store/actions";
import { productById } from "../../store/actions/product.actions";
import Loader from "../../utils/loader";
import { renderCardImage } from "../../utils/tools";
import ProdInfo from "./prodInfo";

const ProductDetail = (props) => {
  const products = useSelector((state) => state.products);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(productById(props.match.params.id));
  }, [dispatch, props.match.params]);

  useEffect(() => {
    return () => {
      dispatch(clearProductById());
    };
  }, [dispatch]);

  return (
    <div className="page_container">
      {/* TODO: Looks ugly remove page_top  */}
      <div className="page_top">
        <div className="container">PRODUCT DETAIL</div>
      </div>
      <div className="container">
        {products && products.byId ? (
          <div className="product_detail_wrapper">
              {/*  style={{ width: "300px", height: "400px" }} */}
            <div className="left">
              <img
                alt={products.byId.model}
                src={renderCardImage(products.byId.images)}
                onClick={() => alert("add")}
                width="300px"
                height="400px"
              ></img>
            </div>
            <div className="right" style={{ marginLeft: "20px" }}>
              <ProdInfo detail={products.byId} />
            </div>
          </div>
        ) : (
          <Loader />
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
