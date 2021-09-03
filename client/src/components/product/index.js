import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearProductById } from "../../store/actions";
import { productById } from "../../store/actions/product.actions";
import Loader from "../../utils/loader";
import { renderCardImage } from "../../utils/tools";
import ProdInfo from "./prodInfo";
import { Modal } from "react-bootstrap";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ProductDetail = (props) => {
  const [modal, setModal] = useState(false);
  const products = useSelector((state) => state.products);
  const dispatch = useDispatch();

  const sliderSettings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const handleClose = () => setModal(false);

  const handleCarousel = () => {
    if (products.byId.images.length > 0) {
      setModal(true);
    }
  };

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
      <div className="page_top">
        <div className="container">
          <h6 className="mt-2">PRODUCT DETAILS</h6>
        </div>
      </div>
      <div className="container">
        {products && products.byId ? (
          <div className="product_detail_wrapper">
            <div className="left">
              <img
                alt={products.byId.model}
                src={renderCardImage(products.byId.images)}
                onClick={() => handleCarousel()}
                width="300px"
                height="400px"
                className="image"
                style={{ imageRendering: "-webkit-optimize-contrast" }}
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
      <Modal show={modal} onHide={handleClose} dialogClassName="modal-90w">
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <Slider {...sliderSettings}>
            {products.byId && products.byId.images
              ? products.byId.images.map((item) => (
                  <div key={item} style={{ margin: "0 auto", width: "1185px" }}>
                    <img
                      alt={products.byId.model}
                      src={item}
                      height={`${window.innerHeight}px`}
                      className="image"
                      style={{
                        imageRendering: "-webkit-optimize-contrast",
                      }}
                    ></img>
                  </div>
                ))
              : null}
          </Slider>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default ProductDetail;
