import React, { useContext, useEffect } from 'react';
import { NavLink, useNavigate, useLocation, Link } from 'react-router-dom';
import logo from '../../assets/images/freshcart-logo.svg';
import UserSetting from '../UserSetting/UserSetting';
import { UserContext } from '../../context/userContext';
import toast from 'react-hot-toast';
import { CartContext } from '../../context/CartContext';
import { WishListContext } from '../../context/WashListContext';
export default function Nav() {
  const navigate = useNavigate();
  const { userlogin, setuserlogin } = useContext(UserContext);
  const { cartInfo } = useContext(CartContext);
  const { numitemswahlist } = useContext(WishListContext);
  const location = useLocation();

  const isHomeActive = location.pathname === '/' || location.pathname === '/home';


  return (
    <nav className="bg-zinc-100 py-4 fixed top-0 left-0 right-0 z-50 text-center opacity-100 z-50">
      <div className="container flex mx-auto items-center flex-col lg:flex-row justify-between">
        <div>
          <img width={160} src={logo} alt="logo" className='mb-4 lg:mb-0' />
        </div>
        <ul className='flex flex-col lg:flex-row text-lg text-gray-600 gap-2 items-center'>
          {userlogin ? (
            <>
              <li><NavLink to={'/freshcart/home'} className={({ isActive }) => `p-2 rounded-lg border  border-transparent${isActive || isHomeActive ? "text-gray-600 font-medium bg-green-200   border-green-400" : ""}`}>Home</NavLink></li>
              {/* <li><NavLink to={'cart'} className={({ isActive }) => `p-2 rounded-lg border  border-transparent${isActive ? "text-gray-600 font-medium bg-green-200  border-green-400" : ""}`}>Cart</NavLink> </li>  */}
              {/* <li><NavLink to={'wishList'} className={({ isActive }) => `p-2 rounded-lg border  border-transparent${isActive ? "text-gray-600 font-medium bg-green-200   border-green-400" : ""}`}>WishList</NavLink></li> */}
              <li><NavLink to={'products'} className={({ isActive }) => `p-2 rounded-lg border border-transparent${isActive ? "text-gray-600 font-medium bg-green-200   border-green-400" : ""}`}>Products</NavLink></li>
              <li><NavLink to={'categories'} className={({ isActive }) => `p-2 rounded-lg border border-transparent${isActive ? "text-gray-600 font-medium bg-green-200  border border-green-400" : ""}`}>Categories</NavLink></li>
              <li><NavLink to={'brands'} className={({ isActive }) => `p-2 rounded-lg border border-transparent${isActive ? "text-gray-600 font-medium bg-green-200   border-green-400" : ""}`}>Brands</NavLink></li>
            </>
          ) : null}
        </ul>

        <div className="flex flex-col lg:flex-row items-center">
          <ul className='flex flex-col lg:flex-row gap-4 text-xl text-gray-600 items-center'>
            {/* <li className='text-gray-900 p-2 flex flex-row gap-2'>
              <div className="group relative">
                <a target='_blank' href="#"><i className='fa-brands fa-facebook text-2xl hover:scale-125 duration-200 hover:text-blue-700'></i></a>
                <span className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 z-20 origin-bottom scale-0 px-3 rounded-lg border border-gray-300 bg-white py-2 text-sm font-bold shadow-md transition-all duration-300 ease-in-out group-hover:scale-100">Facebook</span>
              </div>
              <div className="group relative">
                <a target='_blank' href="#"><i className='fa-brands fa-tiktok text-2xl hover:scale-125 rounded duration-200 hover:text-blue-700'></i></a>
                <span className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 z-20 origin-bottom scale-0 px-3 rounded-lg border border-gray-300 bg-white py-2 text-sm font-bold shadow-md transition-all duration-300 ease-in-out group-hover:scale-100">Tiktok</span>
              </div>
              <div className="group relative">
                <a target='_blank' href="#"><i className='fa-brands fa-square-x-twitter text-2xl hover:scale-125 duration-200 hover:text-gray-700'></i></a>
                <span className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 z-20 origin-bottom scale-0 px-3 rounded-lg border border-gray-300 bg-white py-2 text-sm font-bold shadow-md transition-all duration-300 ease-in-out group-hover:scale-100">Twitter</span>
              </div>
              <div className="group relative">
                <a target='_blank' href="#"><i className='fa-brands fa-linkedin text-2xl hover:scale-125 duration-200 hover:text-blue-700'></i></a>
                <span className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 z-20 origin-bottom scale-0 px-3 rounded-lg border border-gray-300 bg-white py-2 text-sm font-bold shadow-md transition-all duration-300 ease-in-out group-hover:scale-100">Linkedin</span>
              </div>
              <div className="group relative">
                <a target='_blank' href="#"><i className='fa-brands fa-youtube text-2xl hover:scale-125 duration-200 hover:text-red-700'></i></a>
                <span className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 z-20 origin-bottom scale-0 px-3 rounded-lg border border-gray-300 bg-white py-2 text-sm font-bold shadow-md transition-all duration-300 ease-in-out group-hover:scale-100">Youtube</span>
              </div>
            </li> */}
{userlogin && (
  <div className='mt-2 flex items-center space-x-4'>
{cartInfo?.numOfCartItems > 0 && (
  <Link to="cart" className='relative'>
    <div className="cart relative">
      <li>
        <i className="fa-solid fa-cart-shopping font-bold text-green-700"></i>
      </li>
      <span
        id="cart-badge" // Unique id for cart
        className="absolute bottom-5 left-3 rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700"
      >
        {cartInfo.numOfCartItems}
      </span>
    </div>
  </Link>
)}

    {numitemswahlist > 0 && (
  <Link to="wishList" className='relative'>
    <div className="cart relative">
      <li>
        <i className="fa fa-heart text-red-600 fa-xl"></i>
      </li>
      <span
        id="wishList-badge" // Unique id for wishList
        className="absolute bottom-5 left-3 rounded-full bg-red-50 px-2 py-1 text-xs font-medium text-red-600"
      >
        {numitemswahlist}
      </span>
    </div>
  </Link>
)}

  </div>
)}



            {userlogin ? (
              <UserSetting />


            ) : (
              <>

                <li><NavLink to={'regester'} className={({ isActive }) => `p-2 rounded-lg border border-transparent ${isActive ? "bg-blue-400 border-blue-600 text-gray-100" : ""}`}><i className="fa-solid fa-plus"></i> Register</NavLink></li>
                <li><NavLink to={'login'} className={({ isActive }) => `p-2 rounded-lg border border-transparent ${isActive ? "bg-blue-400 border-blue-600 text-gray-100" : ""}`}><i className="fa-solid fa-right-to-bracket"></i> Login</NavLink></li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
