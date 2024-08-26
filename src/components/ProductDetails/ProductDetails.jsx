import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Loader from "../Loader/Loader";
import { CartContext } from "../../context/CartContext";
import toast from 'react-hot-toast';
import ProductItem from "../ProductItem/ProductItem";
import { useQuery } from "@tanstack/react-query";
import { WishListContext } from '../../context/WashListContext';
import Slider from "react-slick";

export default function ProductDetails() {
  const { productId } = useParams();
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [categoryName, setCategoryName] = useState("");
  const { addProductToCart } = useContext(CartContext);
  const [loading, setLoading] = useState(false);
  const [cruntid, setcruntid] = useState(null);
  const { wishList, removecruntid, removeItem, addtoWashList, addcruntid } = useContext(WishListContext);
  const [isWishList, setIsWishList] = useState(false);

  const getProductDetails = () => axios.get(`https://ecommerce.routemisr.com/api/v1/products/${productId}`);

  useEffect(() => {
    const isInWishList = wishList.some(item => item._id === productId);
    setIsWishList(isInWishList);
  }, [wishList, productId]);

  const { data: productDetails, error, isLoading, refetch } = useQuery({
    queryKey: ['productDetails', productId],
    queryFn: getProductDetails,
    select: (data) => data?.data.data,
  });

  useEffect(() => {
    if (productId) {
      setRelatedProducts([]);
    }
  }, [productId, refetch]);

  useEffect(() => {
    if (productDetails && productDetails.category) {
      getRelatedProducts(productDetails.category._id);
    }
  }, [productDetails]);

  const getRelatedProducts = async (categoryId) => {
    setLoading(true);
    setcruntid(categoryId);

    try {
      const { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/products?category=${categoryId}`);
      const filteredProducts = data.data.filter(product => product._id !== productId);
      setRelatedProducts(filteredProducts);

      if (data.data.length > 0) {
        setCategoryName(data.data[0].category.name);
      }
    } catch (error) {
      console.error("Error fetching related products:", error);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (id) => {
    setLoading(true);
    setcruntid(id);

    try {
      const res = await addProductToCart(id);
      setLoading(true)
      if (res && res.status === 200) {
        toast.success(res.data.message, {
          style: {
            background: '#22d210',
            color: '#fff',
          },
        });
      } else {
        toast.error("Login First To Add Product To Cart", {
          style: {
            background: '#f15757',
            color: '#fff',
          },
        });
      }
    } catch (error) {
      toast.error('An error occurred while adding product to cart. Please try again later.', {
        style: {
          background: '#f15757',
          color: '#fff',
        },
      });
    } finally {
      setLoading(false);
    }
  };

  const AddWishList = (id) => {
    addtoWashList(id);
  };

  const removeFromWishList = (id) => {
    removeItem(id);
  };

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <div className="text-red-500 text-center mt-10">Error loading product details.</div>;
  }

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <>
      <div className="row flex-col justify-center m-auto md:flex-row mt-16 mb-14">
        <div className="w-full md:w-1/4">
          <Slider {...settings}>
            {productDetails?.images.map((src, index) => (
              <img
                className="w-full object-cover"
                src={src}
                key={index}
                alt={productDetails?.title || 'Product image'}
              />
            ))}
          </Slider>
        </div>
        <div className="w-full md:w-2/4 p-4 md:p-6">
          <h1 className="text-xl md:text-lg font-semibold text-gray-950 mb-4">
            {productDetails?.title}
          </h1>
          <p className="text-gray-400 font-light mb-4">
            {productDetails?.description}
          </p>
          <p className="text-green-600 mb-3">{productDetails?.category.name}</p>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mt-1">
            <span className="text-lg">{productDetails?.price} EGP</span>
            <div className="flex">
              {/* Add any additional buttons or actions here */}
            </div>
            <div className="flex gap-2 items-center">
              <span className="flex items-center mt-2 md:mt-0">
                {productDetails?.ratingsAverage}{" "}
                <i className="fa fa-star text-yellow-300 ml-1"></i>
              </span>
              <span className="cursor-pointer">
                {isWishList ? (
                  <button
                    disabled={removecruntid && productDetails._id === removecruntid}
                    onClick={() => removeFromWishList(productDetails._id)}
                    className='text-red-700'
                  >
                    <i className="fa fa-heart text-red-600 hover:text-red-400 fa-xl"></i>
                  </button>
                ) : (
                  <button
                    disabled={addcruntid && productDetails._id === addcruntid}
                    onClick={() => AddWishList(productDetails._id)}
                    className='text-gray-300'
                  >
                    <i className="fa fa-heart text-gray-300 hover:text-red-600 fa-xl"></i>
                  </button>
                )}
              </span>
            </div>

          </div>
          <button
            disabled={loading && productDetails._id === cruntid}
            onClick={() => addToCart(productDetails._id)}
            className="transition-transform transform bg-green-300 hover:bg-green-400 font-bold text-white px-4 py-2 rounded w-full mt-4"
          >
            {loading && productDetails._id === cruntid ? (
              <>
                <i className="fa-solid fa-spinner fa-spin-pulse"></i> <span>loading</span>
              </>
            ) : (
              <span>
                <i className="fa-solid fa-cart-shopping mr-2"></i> Add To Cart
              </span>
            )}
          </button>
        </div>
      </div>
      <h2 className="text-xl font-semibold mb-4 text-center block">
        Related Products Of <p className="text-green-600">{categoryName}</p>
      </h2>
      <div className="related-products mt-8">
        <div className="row">
          {relatedProducts.map((product) => (
            <ProductItem
              key={product._id}
              product={product}
              loading={loading}
              cruntid={cruntid}
              addToCart={addToCart}
              AddWishList={() => AddWishList(product._id)}
              removewashList={() => removeFromWishList(product._id)}
            />
          ))}
        </div>
      </div>
    </>
  );
}
