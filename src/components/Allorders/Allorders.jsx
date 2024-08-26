import React, { useContext, useEffect, useState } from 'react';
import { AllOrders } from '../../context/AllOrdersContext';
import Loader from "../Loader/Loader";

export default function Allorders() {
  const { getAllOrders, orders = { data: [] }, loading } = useContext(AllOrders);
  const [numofitems, setnumofitems] = useState(0);

  useEffect(() => {
    if (getAllOrders) {
      getAllOrders(); // Call the context function to fetch orders
    }
  }, [getAllOrders]);

  useEffect(() => {
    if (orders.data) {
      setnumofitems(orders.data.length);
    }
  }, [orders.data]);

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <div className="mt-24 flex items-center justify-center">
        <div className="w-full mb-6 bg-gray-100 shadow-2xl rounded-lg overflow-hidden">
          <div className="p-6 bg-green-100 border-b border-green-300">
            <h1 className="text-4xl font-extrabold text-gray-800 text-center">
              Your All Orders
            </h1>
            <div className="flex justify-between flex-wrap text-center mt-4">
              <h2 className="text-xl font-semibold text-gray-700">
                <i className="fa-solid fa-bag-shopping text-green-700"></i> Your Orders: <span className='font-bold text-gray-800'>{numofitems}</span>
              </h2>
            </div>
          </div>
          <div className="p-6 my-6">
            {orders.data.length > 0 ? (
              orders.data.map((order) => (
                <div key={order.id} className="p-2">
                  <div className="flex flex-wrap items-center justify-center lg:justify-between bg-white p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <div className="flex flex-wrap items-center justify-center lg:justify-between p-2 space-x-4">
                      <div className="text-center p-2">
                        <h3 className="text-lg font-semibold text-gray-900">
                          Order ID: {order.id}
                        </h3>
                        <p className="text-sm text-gray-600">Created At: {new Date(order.createdAt).toLocaleDateString()}</p>
                        <p className="text-sm text-gray-600">Paid At: {order.paidAt ? new Date(order.paidAt).toLocaleDateString() : 'Not Paid'}</p>
                        <p className="text-sm text-gray-600">Payment Method: {order.paymentMethodType === "card" ? order.paymentMethodType : "Cash on delivery"}</p>
                        <p className="text-lg font-semibold text-green-500">
                          <i className="fa-solid fa-coins text-green-500"></i> {order.totalOrderPrice} EGP
                        </p>
                      </div>
                    </div>
                    <div className="w-full mt-4">
                      {order.cartItems && order.cartItems.length > 0 ? (
                        order.cartItems.map((item) => (
                          <div key={item._id} className="flex items-center justify-between p-2 border-b border-gray-300">
                            <div className="flex items-center space-x-4">
                              <img
                                src={item.product.imageCover} 
                                className="w-16 h-16 object-cover rounded-lg"
                                alt={item.product.imageCover}
                              />
                              <div>
                                <h4 className="text-lg font-semibold text-gray-900">{item.title}</h4>
                                <p className="text-sm text-gray-600">Price: {item.price} EGP</p>
                                <p className="text-sm text-gray-600">Name: {item.product.title.split(" ").slice(0,2).join(" ")}</p>
                              </div>
                            </div>
                          </div>
                        ))
                      ) : (
                        <p className="text-center text-red-600">No items in cart.</p>
                      )}
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
        </div>
      </div>
    </>
  );
}