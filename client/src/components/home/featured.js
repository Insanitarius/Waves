import React from "react";
import Carousel from "../../utils/carousel";

const Featured = () => {
  const carouselItems = [
    {
      img: "/images/featured/featured_home.jpg",
      lineOne: "Fender",
      lineTwo: "Custom shop",
      linkTitle: "Shop Now",
      linkTo: "/shop",
    },
    {
      img: "/images/featured/featured_home_2.jpg",
      lineOne: "B-Stock",
      lineTwo: "Awesome discounts",
      linkTitle: "View offers",
      linkTo: "/shop",
    },
  ];

  return (
    <div className="featured_container">
      <Carousel items={carouselItems} />
    </div>
  );
};

export default Featured;
