import React, { useContext, useEffect, useState } from 'react'
import styles from './ProductItem.module.css'
import { Link } from 'react-router-dom'
import { WishListContext } from '../../context/WashListContext';

export default function ProductItem({ product, loading, cruntid, addToCart, AddWishList, removewashList }) {
  const { wishList, removecruntid, addcruntid } = useContext(WishListContext);
  const [isWishList, setIsWishList] = useState(false)
  useEffect(() => {
    const isInWishList = wishList.some(item => item.id === product.id);
    setIsWishList(isInWishList);
  }, [wishList, product.id]);

  return (
    <div
      key={product.id}
      className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/6 p-1 mb-6 relative  group "
    >

      <div className="product py-2 relative border-transparent rounded-xl border-4 hover:border-green-400 hover:bg-green-50 transition-all duration-700 p-2">
        {/* add to wishList */}
        {/* <button title="Save" className="relative mx-auto mb-2 cursor-pointer flex items-center gap-2 bg-gray-800 hover:bg-gray-700 text-white rounded-md duration-100 p-2">
          <i className="fa fa-heart text-gray-300 hover:text-red-500"></i>
          <span className="text-sm font-bold pr-1">add to wishList</span>
        </button> */}
        <figure className="relative overflow-hidden">
          <img
            className="w-full"
            src={product.imageCover}
            alt={product.name}
          />
          <figcaption className="mt-2 ">
            <p className="text-green-600">{product.category.name}</p>
            <p className="text-lg font-semibold text-gray-800 mb-4">
              {product.title.split(" ").slice(0, 2).join(" ")}
            </p>
            <div className="flex justify-between items-center mb-4">
              <span className="text-gray-700 font-semibold">
                {product.price} EGP
              </span>
              <div className="flex flex-wrap justify-center items-center gap-4">
                <span className="text-yellow-300 font-semibold d-flex flex-row">
                  {product.ratingsAverage} <i className="fa fa-star"></i>
                </span>

                <span className="cursor-pointer">
                  {isWishList ? (
                    <button disabled={removecruntid && product.id == removecruntid} onClick={removewashList} className='text-red-700'>
                      <i className="fa fa-heart text-red-600 hover:text-red-400 fa-xl"></i>


                    </button>
                  ) : (
                    <button disabled={addcruntid && product.id == addcruntid} onClick={AddWishList} className='text-gray-300'>
                      <i className="fa fa-heart text-gray-300 hover:text-red-600 fa-xl"></i>
                    </button>
                  )}
                </span>




              </div>

            </div>
            <div className="flex flex-col gap-2 justify-center items-center transition-transform transform group-hover:translate-y-0 translate-y-full">
              <button disabled={loading && product.id == cruntid} onClick={() => addToCart(product.id)} className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg transition-transform transform">
                {loading && product.id === cruntid ? (<><i className="fa-solid fa-spinner fa-spin-pulse"></i> <span>loading</span></>) : (<span> <i className="fa-solid fa-cart-shopping mr-2"></i> {" "} Add To Cart</span>)}
              </button>
              <Link to={`/productdetails/${product.id}`}>
                <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg transition-transform transform">
                  <i className="fa-solid fa-info-circle mr-2"></i>{" "}
                  <span>Product Details</span>
                </button>

              </Link>
            </div>
          </figcaption>
        </figure>

      </div>
    </div>
  )
}
