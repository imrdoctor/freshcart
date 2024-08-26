import React, { useContext, useState } from 'react';
import { WishListContext } from '../../context/WashListContext'; 
import { CartContext } from '../../context/CartContext';
import Loader from '../Loader/Loader';
import toast from 'react-hot-toast';

export default function WishList() {
  const { wishList, removeItem, loading , removecruntid , numitemswahlist } = useContext(WishListContext);
  const { addProductToCart } = useContext(CartContext);
  const [cruntid,setcruntid] = useState(null)
  const handleAddToCart = async (productId) => {
    setcruntid(productId)
    try {
      await addProductToCart(productId);
      toast.success('Product added to cart', {
        style: {
          background: '#22d210',
          color: '#fff',
        },
      });
    } catch (error) {
      console.error("Failed to add product to cart", error);
      toast.error('Failed to add product to cart');
    } finally {
      setcruntid(null)
    }
  };
  function HandelremoveItem(itemid){
    removeItem(itemid)
    removecruntid(itemid)
  }
  if (loading) {
    return <Loader />;
}

  return (
    <div className="mt-24 flex items-center justify-center">
      <div className="w-full mb-6 bg-gray-100 shadow-2xl rounded-lg overflow-hidden">
        <div className="p-6 bg-green-100 border-b border-green-300">
          <h1 className="text-4xl font-extrabold text-gray-800 text-center">
            WishList
          </h1>
          {wishList.length == 0 ? (
            <p className="text-center text-gray-600">You Don't Have Products in WishList  </p>
          ) :<p className="text-center text-gray-600">You Have <span className='text-green-800 font-extrabold'> {numitemswahlist} </span> Product in WishList </p>}
        </div>
        <div className="p-6 my-6">
          {wishList.length == 0 ? (
            <p className="text-center text-gray-600">Your wishlist is empty.</p>
          ) : (
            wishList.map((product) => (
              <div key={product._id} className="p-2">
                <div className="flex flex-wrap items-center justify-center lg:justify-between bg-white p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <div className="flex flex-wrap items-center justify-center lg:justify-between p-2 items-center space-x-4">
                    <div>
                      <img
                        src={product.imageCover}
                        className="object-cover h-36 w-36 rounded-lg border border-gray-200"
                        alt={product.title}
                      />
                    </div>
                    <div className="text-center lg:text-start p-2">
                      <h3 className="text-lg font-semibold text-gray-900">{product.title.split(" ").slice(0,3).join(" ")}</h3>
                      <p className="text-lg font-semibold text-green-500">
                        <i className="fa-solid fa-coins text-green-500"></i> {product.price} EGP
                      </p>
                      <button
                        onClick={() => HandelremoveItem(product._id)}
                        disabled={removecruntid && product.id === removecruntid}
                        className="text-red-800 border border-2 border-red-500 bg-red-300 p-2 rounded-lg hover:text-white hover:bg-red-800 hover:border-red-600 font-medium transition-colors duration-300"
                      >                      
                      {cruntid && product.id === removecruntid ? (<><i className="fa-solid fa-spinner fa-spin-pulse"></i> <span>Removing..</span></>) : (<span> <i className="fa-solid fa-cart-shopping mr-2"></i> Remove</span>)}
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center p-2">
                    <div className="flex items-center flex-wrap space-x-2">
                      <button
                        onClick={() => handleAddToCart(product._id)}
                        disabled={cruntid && product.id == cruntid}
                        className="text-green-800 border border-2 border-green-500 bg-green-300 p-2 rounded-lg hover:text-white hover:bg-green-800 hover:border-green-600 font-medium transition-colors duration-300"
                      >
                      {cruntid && product.id === cruntid ? (<><i className="fa-solid fa-spinner fa-spin-pulse"></i> <span>Added..</span></>) : (<span> <i className="fa-solid fa-cart-shopping mr-2"></i> Add To Cart</span>)}

                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
