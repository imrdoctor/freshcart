import axios from "axios";
import React, { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

const headers = {
  token: localStorage.getItem("userToken"),
};
const cartApi = "https://ecommerce.routemisr.com/api/v1/cart/";

function CartContextProvider({ children }) {
  const [cartInfo, setCartInfo] = useState({});

  const getCart = async () => {
    try {
      const res = await axios.get(cartApi, { headers });
      setCartInfo(res.data);
      return res;
    } catch (err) {
      console.error(err);
      return err;
    }
  };

  const addProductToCart = async (productId) => {
    try {
      const res = await axios.post(cartApi, { productId }, { headers });
      await getCart();
      return res;
    } catch (err) {
      return err;
    }
  };

  const removeProduct = async (itemId) => {
    try {
      const res = await axios.delete(`${cartApi}${itemId}`, { headers });
      await getCart(); 
      return res;
    } catch (err) {
      return err;
    }
  };

  const updateQuantity = async (itemId, count) => {
    try {
      const res = await axios.put(`${cartApi}${itemId}`, { count }, { headers });
      await getCart(); 
      return res;
    } catch (err) {
      return err;
    }
  };

  useEffect(() => {
    getCart();
  }, []);

  return (
    <CartContext.Provider value={{ cartInfo, addProductToCart, getCart, removeProduct, updateQuantity }}>
      {children}
    </CartContext.Provider>
  );
}

export default CartContextProvider;
