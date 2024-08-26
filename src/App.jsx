import { useState } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import Contact from './components/Contact/Contact.jsx';
import LayOut from './components/LayOut/LayOut.jsx';
import Regester from './components/Regester/Regester.jsx';
import Home from './components/Home/Home.jsx';
import Products from './components/Products/Products.jsx';
import Login from './components/Login/Login.jsx';
import Cart from './components/Cart/Cart.jsx';
import Categories from './components/Categories/Categories.jsx';
import Brands from './components/Brands/Brands.jsx';
import NotFound from './components/NotFound/NotFound.jsx';
import ProductDetails from './components/ProductDetails/ProductDetails.jsx';
import ProtectedRoute from './components/ProtectedRoutes/ProtectWebRoute.jsx';
import WshList from './components/WshList/WshList.jsx';
import ProtectLoginnedRoute from './components/ProtectedRoutes/ProtectLoginnedRoute.jsx';
import ResetPassword from './components/ResetPassword/ResetPassword.jsx';
import Allorders from './components/Allorders/Allorders.jsx';
import Checkout from './components/Checkout/Checkout.jsx';
import '@fortawesome/fontawesome-free/css/all.min.css';
import UserContextProvider from './context/userContext';
import AllOrdersContext from './context/AllOrdersContext';
import CartContextProvider from './context/CartContext';
import WashListContext from './context/WashListContext';
import TokenContextProvider from './context/TokenContext'; // Import TokenContextProvider
import { QueryClient } from '@tanstack/react-query';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import toast, { Toaster } from 'react-hot-toast';

let query = new QueryClient();

const routes = createBrowserRouter([
  {
    path: '/freshcart',
    element: <LayOut />,
    children: [
      { index: true, element: <ProtectedRoute><Home /></ProtectedRoute> },
      { path: 'regester', element: <ProtectLoginnedRoute><Regester /></ProtectLoginnedRoute> },
      { path: 'resetPassword', element: <ProtectLoginnedRoute><ResetPassword /></ProtectLoginnedRoute> },
      { path: 'home', element: <ProtectedRoute><Home /></ProtectedRoute> },
      { path: 'cart', element: <ProtectedRoute><Cart /></ProtectedRoute> },
      { path: 'wishList', element: <ProtectedRoute><WshList /></ProtectedRoute> },
      { path: 'products', element: <ProtectedRoute><Products /></ProtectedRoute> },
      { path: 'login', element: <ProtectLoginnedRoute><Login /></ProtectLoginnedRoute> },
      { path: 'categories', element: <ProtectedRoute><Categories /></ProtectedRoute> },
      { path: 'Allorders', element: <ProtectedRoute><Allorders /></ProtectedRoute> },
      { path: 'productdetails/:productId', element: <ProtectedRoute><ProductDetails /></ProtectedRoute> },
      { path: 'brands', element: <ProtectedRoute><Brands /></ProtectedRoute> },
      { path: 'checkOut/:pymintid', element: <ProtectedRoute><Checkout /></ProtectedRoute> },
      { path: '*', element: <NotFound /> },
    ],
  },
]);

function App() {
  return (
    <>
      <QueryClientProvider client={query}>
        <TokenContextProvider> 
          <UserContextProvider>
            <CartContextProvider>
            <AllOrdersContext>
              <WashListContext>
                <RouterProvider router={routes} />
              </WashListContext>
            </AllOrdersContext>
            </CartContextProvider>
          </UserContextProvider>
        </TokenContextProvider>
        <Toaster />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </>
  );
}

export default App;