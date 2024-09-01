import React, { useContext, useEffect, useState } from "react";
import RecentProducts from "../RecentProducts/RecentProducts";
import AllProducts from "../AllProducts/AllProducts";
export default function Products() {
  const [showmoree, setshowmore] = useState(null)
  const [showall, setshowall] = useState(false)
  // seemore function
  const seemore = () => {
    setshowmore(true)
  }
  const showlees = () => {
    setshowmore(null)
  }
  return (
    <>
      <AllProducts />

      {showmoree ? <RecentProducts /> :
        <div className="text-center">

          <button onClick={() => seemore()} type="button" className="bg-white text-center w-56 rounded-2xl h-14 relative font-sans text-black text-xl font-semibold group">
            <div className="bg-indigo-600 rounded-xl h-12 w-1/4 flex items-center justify-center absolute left-1 top-[4px] group-hover:w-[184px] z-10 duration-500">
              <i class="fa-solid fa-eye text-white"></i>
            </div>

            <p className="translate-x-2">Show More</p>
          </button>
        </div>
      }
      {showmoree ?
        <div className="text-center">
          <button onClick={() => showlees()} type="button" className="bg-white text-center w-56 rounded-2xl h-14 relative font-sans text-black text-xl font-semibold group">
            <div className="bg-indigo-600 rounded-xl h-12 w-1/4 flex items-center justify-center absolute left-1 top-[4px] group-hover:w-[184px] z-10 duration-500">
              <i class="fa-solid fa-eye text-white"></i>
            </div>
            <p className="translate-x-2">Show Lees</p>
          </button>
        </div>

        : null}

    </>
  );
}
