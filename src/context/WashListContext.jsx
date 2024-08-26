import axios from "axios";
import React, { createContext, useState, useEffect } from "react";
import toast from 'react-hot-toast';

export const WishListContext = createContext();
function WishListContextProvider({ children }) {
  const [wishList, setWishList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [removecruntid,setremovecruntid] = useState(null)
  const [addcruntid,setaddcruntid] = useState(null)
  const [numitemswahlist,setitemswahlist] = useState(null)
  const headers = {
    token: localStorage.getItem("userToken"),
  };
  const api = "https://ecommerce.routemisr.com/api/v1/wishlist";

  // Function to fetch wishlist
  async function getWishList() {
    try {
      setLoading(true); 
      const response = await axios.get(api, { headers });
      setWishList(response.data.data);
      // console.log(response.data.data);
      setitemswahlist(response.data.count)
    } catch (error) {
      console.error("Failed to fetch wishlist", error);
    } finally {
      setLoading(false); 
    }
  }

  useEffect(() => {
    getWishList();
  }, []);

  async function removeItem(productId) {
    try {
        toast.success("Product Removed successfully!", {
            style: {
              background: '#22d210',
              color: '#fff',
            },
          });
        setremovecruntid(productId)
      console.log("reeemoveeed",productId);
      
      await axios.delete(`${api}/${productId}`, { headers });
      console.log(`Removing product with ID: ${productId}`);
      await getWishList(); 
    } catch (error) {
      console.error("Failed to remove item from wishlist", error);
    }finally{
        setremovecruntid(null)
    }
  }

  //  AddWishList
  async function addtoWashList(productId) {
    setLoading(true);
    setaddcruntid(productId)
    try {
      let res = await axios.post(api, {
        productId: productId
      }, {
        headers
      });
  
      if (res.status === 200) {
        toast.success('Product added to wishlist successfully!', {
          style: {
            background: '#22d210',
            color: '#fff',
          },
        });
      } else {
        toast.error('Failed to add product to wishlist. Please try again.', {
          style: {
            background: '#f15757',
            color: '#fff',
          },
        });
      }
  
      await getWishList(); 
    } catch (error) {
      console.error("Failed to add product to wishlist", error);
      toast.error('Failed to add product to wishlist. Please try again later.', {
        style: {
          background: '#f15757',
          color: '#fff',
        },
      });
    } finally {
      setLoading(false);
      setaddcruntid(null)
    }
  }
  
  // remove FromwashlistBtn
  

  return (
    <WishListContext.Provider value={{ wishList, getWishList, removeItem, addtoWashList, loading, setLoading, setremovecruntid, removecruntid, numitemswahlist , addcruntid}}>
      {children}
    </WishListContext.Provider>
  );
}

export default WishListContextProvider;
