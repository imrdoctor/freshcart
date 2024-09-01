import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import Loader from "../Loader/Loader";
import { CartContext } from "../../context/CartContext";
import toast from 'react-hot-toast';
import ProductItem from "../ProductItem/ProductItem";
import { WishListContext } from '../../context/WashListContext';

export default function allProducts() {
  const { wishList, removeItem, addtoWashList } = useContext(WishListContext);

  const { addProductToCart } = useContext(CartContext);
  const [loading, setLoading] = useState(false);
  const [cruntid, setcruntid] = useState(null)
  const {washlistdata,setwashlistdata} = useState(wishList)
  // useQuery(queryKey:['allProducts'])
  function getallProducts() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/products");
  }
  const { data, isError, error, isLoading, isFetching } = useQuery({
    queryKey: ["allProducts"],
    queryFn: getallProducts,

    // staleTime:5000,
    // retry: Infinity,
  });
  // Display Loader
  if (isLoading) {
    return <Loader />;
  }
  // Display Error
  if (isError) {
    return (
      <div className="text-center text-red-500 text-2xl mt-10">
        <p>Something went wrong</p>
      </div>
    );
  }
  async function addToCart(id) {
    setLoading(true);
    setcruntid(id)
    try {
      let res = await addProductToCart(id);
      // console.log(res);
      if (res && res.status === 200) {
        toast.success(res.data.message, {

          style: {
            background: '#22d210',
            color: '#fff',
          },
        });
      } else {
        // console.log("error");
        if (res.response.data.message == "Invalid Token. please login again") {
          toast.error("Login First To Add Product To Cart", {
            style: {
              background: '#f15757',
              color: '#fff',
            },
          });
        }

      }
    } catch {
      console.log("error", "=", err.data);
      toast.error('An error occurred while adding product to cart. Please try again later.', {
        style: {
          background: '#f15757',
          color: '#fff',
        },
      });
    } finally {
      setLoading(false);
    }

  }
  function AddWishList(productId) {
    console.log(productId);
    addtoWashList(productId);
  }
  function removewashList(productId) {
    console.log(productId);
    removeItem(productId);
  }
  // Display Date

  return (
    <>

      <div className="row mt-10 mt-16">
      {data?.data.data.map((product) => (
        <ProductItem
          key={product.id}
          product={product}
          loading={loading}
          cruntid={cruntid}
          addToCart={addToCart}
          AddWishList={() => AddWishList(product.id)}
          removewashList={() => removewashList(product.id)}
        />
      ))}
    </div>
    </>

  );
}