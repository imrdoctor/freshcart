import React, { useContext, useEffect, useState } from 'react';
import { CartContext } from '../../context/CartContext';
import Loader from "../Loader/Loader";
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';

export default function Cart() {
  const { getCart, removeProduct, updateQuantity } = useContext(CartContext);
  const [cartInfo, setCartInfo] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [cartid, setcartid] = useState(null);

  async function getCartInfo() {
    try {
      const res = await getCart();
      setCartInfo(res);
      setcartid(res.data.data._id);
    } catch (error) {
      console.error('Error fetching cart info:', error);
    } finally {
      setLoading(false);
    }
  }

  async function removeItem(id) {
    try {
      const res = await removeProduct(id);
      if (res.status === 200) {
        toast.success("Product Deleted", {
          style: {
            background: '#22d210',
            color: '#fff',
          },
        });
        getCartInfo(); // Refresh the cart information
      } else {
        console.log("Error deleting product");
      }
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  }

  async function updateProduct(id, count) {
    try {
      const res = await updateQuantity(id, count);
      if (res.status === 200) {
        // Fetch updated cart data after updating quantity
        getCartInfo();
      } else {
        console.error("Error updating quantity");
      }
    } catch (error) {
      console.error('Error updating quantity:', error);
    }
  }

  useEffect(() => {
    getCartInfo();
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  const hasProducts = cartInfo.data?.data?.products.length > 0;

  return (
    <div className="mt-24 flex items-center justify-center">
      <div className="w-full mb-6 bg-gray-100 shadow-2xl rounded-lg overflow-hidden">
        <div className="p-6 bg-green-100 border-b border-green-300">
          <h1 className="text-4xl font-extrabold text-gray-800 text-center">
            Shopping Cart
          </h1>
          <div className="flex justify-between flex-wrap text-center mt-4">
            <h2 className="text-xl font-semibold text-gray-700">
              <i className="fa-solid fa-coins text-green-500"></i> Total Price: <span className='font-bold text-gray-800'>{cartInfo.data?.data.totalCartPrice}</span> EGP
            </h2>
            <h2 className="text-xl font-semibold text-gray-700">
              <i className="fa-solid fa-cart-shopping text-green-500"></i> Cart Items: <span className='font-bold text-gray-800'>{cartInfo.data?.numOfCartItems}</span>
            </h2>
          </div>
        </div>

        <div className="p-6 my-6">
          {hasProducts ? (
            cartInfo.data?.data?.products.map((ele) => (
              <div key={ele.product.id} className="p-2">
                <div className="flex flex-wrap items-center justify-center lg:justify-between bg-white p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <div className="flex flex-wrap items-center justify-center lg:justify-between p-2 items-center space-x-4">
                    <div>
                      <img
                        src={ele.product.imageCover}
                        className="object-cover h-36 w-36 rounded-lg border border-gray-200"
                        alt={ele.title}
                      />
                    </div>
                    <div className="text-center p-2">
                      <h3 className="text-lg font-semibold text-gray-900">{ele.title}</h3>
                      <p className="text-gray-600">{ele.product.title.split(" ").slice(0, 2).join(" ")}</p>
                      <p className="text-lg font-semibold text-green-500">
                        <i className="fa-solid fa-coins text-green-500"></i> {ele.price} EGP
                      </p>
                      <button
                        onClick={() => removeItem(ele.product.id)}
                        className="text-red-800 border border-2 border-red-500 bg-red-300 p-2 rounded-lg hover:text-white hover:bg-red-800 hover:border-red-600 font-medium transition-colors duration-300"
                      >
                        <i className="fa-solid fa-trash"></i> Remove
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center p-2">
                    <div className="flex items-center flex-wrap space-x-2">
                      <button
                        disabled={ele.count === 1}
                        onClick={() => updateProduct(ele.product.id, ele.count - 1)}
                        className="p-2 bg-gray-200 border border-gray-300 rounded-full text-gray-600 hover:bg-gray-300 transition-colors duration-300"
                        type="button"
                      >
                        <svg
                          className="w-4 h-4"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 18 2"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M1 1h16"
                          />
                        </svg>
                      </button>
                      <input
                        type="number"
                        className="bg-gray-50 w-20 text-center border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-2 focus:ring-green-500"
                        value={ele.count}
                        readOnly
                      />
                      <button
                        onClick={() => updateProduct(ele.product.id, ele.count + 1)}
                        className="p-2 bg-gray-200 border border-gray-300 rounded-full text-gray-600 hover:bg-gray-300 transition-colors duration-300"
                        type="button"
                      >
                        <svg
                          className="w-4 h-4"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 18 18"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M9 1v16M1 9h16"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-600 text-red-600">
              <i className="fa-solid fa-x text-sm"></i> You did not add any product to cart
            </p>
          )}
        </div>

        {hasProducts ? (
          <div className="px-12">
            <Link to={`/checkOut/${cartid}`}>
              <button className="text-green-800 w-full my-3 border border-1 border-green-500 bg-green-300 p-2 rounded-lg hover:text-white hover:bg-green-800 hover:border-green-600 font-medium transition-colors duration-300">
                <i className="fa-regular fa-credit-card"></i> Continue to CheckOut
              </button>
            </Link>
          </div>
        ) : null}
      </div>
    </div>
  );
}