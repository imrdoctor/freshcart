// ProductDetails.js
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Slider from "react-slick";
import Loader from "../Loader/Loader";
import RelatedProducts from "./RelatedProducts";

export default function ProductDetails() {
  let { productId } = useParams();
  const [productDetails, setProductDetails] = useState(null);

  const getProductDetails = async () => {
    try {
      const { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${productId}`);
      setProductDetails(data.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getProductDetails();
  }, [productId]);

  if (!productDetails) {
    return <Loader />;
  }

  return (
    <>
      <div className="row flex-col justify-center m-auto md:flex-row mt-8 mb-14  " >
        <div className="w-full md:w-1/4">
          <Slider {...settings}>
            {productDetails?.images.map((src) => (
              <img className="w-full object-cover" src={src} alt={productDetails?.title} />
            ))}
          </Slider>
        </div>
        <div className="w-full md:w-2/4 p-4 md:p-6  ">
          <h1 className="text-xl md:text-lg font-semibold text-gray-950 mb-4">
            {productDetails?.title}
          </h1>
          <p className="text-gray-400 font-light mb-4">
            {productDetails?.description}
          </p>
          <p className="text-green-600 mb-3">{productDetails?.category.name}</p>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mt-1">
            <span className="text-lg">{productDetails?.price} EGP</span>
            <span className="flex items-center mt-2 md:mt-0">
              {productDetails?.ratingsAverage}{" "}
              <i className="fa fa-star text-yellow-300 ml-1"></i>
            </span>
          </div>
          <button className="transition-transform transform bg-green-300 hover:bg-green-400 font-bold text-white px-4 py-2 rounded w-full mt-4">
            <i className="fa-solid fa-cart-shopping"></i>{" "}
            <span>Add To Cart</span>
          </button>
        </div>
      </div>
      <RelatedProducts categoryId={productDetails.category._id} />
    </>
  );
}
