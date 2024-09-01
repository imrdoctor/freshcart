import React, { useContext, useState } from 'react';
import { NavLink, useLocation, Link } from 'react-router-dom';
import logo from '../../assets/images/freshcart-logo.svg';
import Dropdown from '../Dropdown/Dropdown';
import { UserContext } from '../../context/userContext';
import { CartContext } from '../../context/CartContext';
import { WishListContext } from '../../context/WashListContext';

// مكون القائمة الجانبية للموبايل
function MobileMenu({ isOpen, toggleMenu, userlogin, isHomeActive }) {
  return (
    <div
      className={`fixed top-[-7px] backdrop-blur-sm  bg-glass left-0 p-6  right-0 shadow-lg transform ${isOpen ? 'translate-y-[87px]' : '-translate-y-full'
        } transition-transform duration-300 ease-in-out lg:hidden z-40`}
    >
      <ul className="flex flex-col items-center text-lg  text-gray-600 gap-6 mt-4">
        {userlogin ? (
          <>
            <li>
              <NavLink
                to={'/freshcart/home'}
                className={({ isActive }) =>
                  `p-2 rounded-lg border border-transparent ${isActive || isHomeActive
                    ? 'text-gray-600 font-medium bg-green-200 border-green-400'
                    : ''
                  }`
                }
                onClick={toggleMenu}
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to={'products'}
                className={({ isActive }) =>
                  `p-2 rounded-lg border border-transparent ${isActive ? 'text-gray-600 font-medium bg-green-200 border-green-400' : ''
                  }`
                }
                onClick={toggleMenu}
              >
                Products
              </NavLink>
            </li>
            <li>
              <NavLink
                to={'categories'}
                className={({ isActive }) =>
                  `p-2 rounded-lg border border-transparent ${isActive ? 'text-gray-600 font-medium bg-green-200 border border-green-400' : ''
                  }`
                }
                onClick={toggleMenu}
              >
                Categories
              </NavLink>
            </li>
            <li>
              <NavLink
                to={'brands'}
                className={({ isActive }) =>
                  `p-2 rounded-lg border border-transparent ${isActive ? 'text-gray-600 font-medium bg-green-200 border-green-400' : ''
                  }`
                }
                onClick={toggleMenu}
              >
                Brands
              </NavLink>
            </li>

          </>
        ) : (
          <>
            <li>
              <NavLink
                to={'regester'}
                className={({ isActive }) =>
                  `p-2 rounded-lg border border-transparent ${isActive ? 'bg-blue-400 border-blue-600 text-gray-100' : ''
                  }`
                }
                onClick={toggleMenu}
              >
                <i className="fa-solid fa-plus"></i> regester
              </NavLink>
            </li>
            <li>
              <NavLink
                to={'login'}
                className={({ isActive }) =>
                  `p-2 rounded-lg border border-transparent ${isActive ? 'bg-blue-400 border-blue-600 text-gray-100' : ''
                  }`
                }
                onClick={toggleMenu}
              >
                <i className="fa-solid fa-right-to-bracket"></i> Login
              </NavLink>
            </li>
          </>
        )}
      </ul>
    </div>
  );
}

export default function Nav() {
  const { userlogin } = useContext(UserContext);
  const { cartInfo } = useContext(CartContext);
  const { numitemswahlist } = useContext(WishListContext);
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isHomeActive = location.pathname === '/' || location.pathname === '/home';

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <nav className="bg-zinc-100 backdrop-blur-sm py-4 fixed top-0 left-0 right-0 z-50 text-center  bg-glass">
      <div className="container flex mx-auto items-center justify-between lg:justify-center">
        {/* الشعار */}
        <div className="flex-shrink-0">
          <img width={160} src={logo} alt="logo" className="mb-4 lg:mb-0" />
        </div>

        {/* الأيقونات والقائمة الجانبية */}
        <div className="flex items-center gap-4 lg:hidden">
          {/* زر القائمة الجانبية للموبايل */}

          {userlogin && (
            <div className="flex items-center gap-4">

              {/* أيقونات الـ Wishlist والسلة */}
              {numitemswahlist > 0 && (
                <Link to="wishList" className="relative">
                  <div className="relative">
                    <i className="fa fa-heart text-red-600 fa-xl"></i>
                    <span className="absolute bottom-5 left-3 rounded-full bg-red-50 px-2 py-1 text-xs font-medium text-red-600">
                      {numitemswahlist}
                    </span>
                  </div>
                </Link>
              )}

              {cartInfo?.numOfCartItems > 0 && (
                <Link to="cart" className="relative">
                  <div className="relative">
                    <i className="fa-solid fa-cart-shopping text-green-700"></i>
                    <span className="absolute bottom-5 left-3 rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700">
                      {cartInfo.numOfCartItems}
                    </span>
                  </div>
                </Link>
              )}

              {/* Dropdown للحساب */}
            </div>
          )}
          <button onClick={toggleMenu}>
            <i className={`fa ${isMenuOpen ? 'fa-times' : 'fa-bars'} text-2xl`}></i>
          </button>
        </div>

        {/* قائمة سطح المكتب */}
        <ul className="hidden lg:flex lg:items-center lg:gap-4 mx-auto lg:mr-auto text-lg text-gray-600">
          {userlogin && (
            <>
              <li>
                <NavLink
                  to={'/freshcart/home'}
                  className={({ isActive }) =>
                    `p-2 rounded-lg border border-transparent ${isActive || isHomeActive ? 'text-gray-600 font-medium bg-green-200 border-green-400' : ''
                    }`
                  }
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={'products'}
                  className={({ isActive }) =>
                    `p-2 rounded-lg border border-transparent ${isActive ? 'text-gray-600 font-medium bg-green-200 border-green-400' : ''}`
                  }
                >
                  Products
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={'categories'}
                  className={({ isActive }) =>
                    `p-2 rounded-lg border border-transparent ${isActive ? 'text-gray-600 font-medium bg-green-200 border border-green-400' : ''}`
                  }
                >
                  Categories
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={'brands'}
                  className={({ isActive }) =>
                    `p-2 rounded-lg border border-transparent ${isActive ? 'text-gray-600 font-medium bg-green-200 border-green-400' : ''}`
                  }
                >
                  Brands
                </NavLink>
              </li>
            </>
          )}
        </ul>

        {/* أيقونات الجانب الأيمن على سطح المكتب */}
        <div className="hidden lg:flex items-center gap-4 ">
          {userlogin && (

            <>

              {numitemswahlist > 0 && (
                <Link to="wishList" className="relative">
                  <div className="relative">
                    <i className="fa fa-heart text-red-600 fa-xl"></i>
                    <span className="absolute bottom-5 left-3 rounded-full bg-red-50 px-2 py-1 text-xs font-medium text-red-600">
                      {numitemswahlist}
                    </span>
                  </div>
                </Link>
              )}

              {cartInfo?.numOfCartItems > 0 && (
                <Link to="cart" className="relative">
                  <div className="relative">
                    <i className="fa-solid fa-cart-shopping text-green-700"></i>
                    <span className="absolute bottom-5 left-3 rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700">
                      {cartInfo.numOfCartItems}
                    </span>
                  </div>
                </Link>
              )}
              <Dropdown />

            </>
          )}
        </div>

        {userlogin ? (
          null) : (
          <>
            <div className=' hidden lg:flex list-none	 '>
              <li>
                <NavLink
                  to={"regester"}
                  className={({ isActive }) =>
                    `p-2 rounded-lg border border-transparent ${isActive
                      ? "bg-blue-400 border-blue-600 text-gray-100"
                      : ""
                    }`
                  }
                >
                  <i className="fa-solid fa-plus"></i> regester
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={"login"}
                  className={({ isActive }) =>
                    `p-2 rounded-lg border border-transparent ${isActive
                      ? "bg-blue-400 border-blue-600 text-gray-100"
                      : ""
                    }`
                  }
                >
                  <i className="fa-solid fa-right-to-bracket"></i> Login
                </NavLink>
              </li>
            </div>

          </>
        )}
      </div>

      {/* قائمة الموبايل */}
      <MobileMenu isOpen={isMenuOpen} toggleMenu={toggleMenu} userlogin={userlogin} isHomeActive={isHomeActive} />
    </nav>
  );
}
