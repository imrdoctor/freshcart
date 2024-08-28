import { lazy, Suspense } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import UserContextProvider from './context/userContext';
import AllOrdersContext from './context/AllOrdersContext';
import CartContextProvider from './context/CartContext';
import WashListContext from './context/WashListContext';
import TokenContextProvider from './context/TokenContext'; 
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import toast, { Toaster } from 'react-hot-toast';

// Lazy load components
const LayOut = lazy(() => import('./components/LayOut/LayOut.jsx'));
const ReturnsExchanges = lazy(() => import('./components/ReturnsExchanges/ReturnsExchanges.jsx'));
const Register = lazy(() => import('./components/Regester/Regester.jsx'));
const Home = lazy(() => import('./components/Home/Home.jsx'));
const Products = lazy(() => import('./components/Products/Products.jsx'));
const Login = lazy(() => import('./components/Login/Login.jsx'));
const Cart = lazy(() => import('./components/Cart/Cart.jsx'));
const Categories = lazy(() => import('./components/Categories/Categories.jsx'));
const Brands = lazy(() => import('./components/Brands/Brands.jsx'));
const NotFound = lazy(() => import('./components/NotFound/NotFound.jsx'));
const ProductDetails = lazy(() => import('./components/ProductDetails/ProductDetails.jsx'));
const ProtectedRoute = lazy(() => import('./components/ProtectedRoutes/ProtectWebRoute.jsx'));
const WshList = lazy(() => import('./components/WshList/WshList.jsx'));
const ProtectLoginnedRoute = lazy(() => import('./components/ProtectedRoutes/ProtectLoginnedRoute.jsx'));
const ResetPassword = lazy(() => import('./components/ResetPassword/ResetPassword.jsx'));
const Allorders = lazy(() => import('./components/Allorders/Allorders.jsx'));
const Checkout = lazy(() => import('./components/Checkout/Checkout.jsx'));
const UserSettings = lazy(() => import('./components/UserSettings/UserSettings.jsx'));

// Create a QueryClient instance
const queryClient = new QueryClient();

// Define routes
const routes = createBrowserRouter([
  {
    path: '/freshcart',
    element: <LayOut />,
    children: [
      { index: true, element: <Suspense fallback={<div>Loading...</div>}><ProtectedRoute><Home /></ProtectedRoute></Suspense> },
      { path: 'regester', element: <Suspense fallback={<div>Loading...</div>}><ProtectLoginnedRoute><Register /></ProtectLoginnedRoute></Suspense> },
      { path: 'resetPassword', element: <Suspense fallback={<div>Loading...</div>}><ProtectLoginnedRoute><ResetPassword /></ProtectLoginnedRoute></Suspense> },
      { path: 'home', element: <Suspense fallback={<div>Loading...</div>}><ProtectedRoute><Home /></ProtectedRoute></Suspense> },
      { path: 'cart', element: <Suspense fallback={<div>Loading...</div>}><ProtectedRoute><Cart /></ProtectedRoute></Suspense> },
      { path: 'wishList', element: <Suspense fallback={<div>Loading...</div>}><ProtectedRoute><WshList /></ProtectedRoute></Suspense> },
      { path: 'products', element: <Suspense fallback={<div>Loading...</div>}><ProtectedRoute><Products /></ProtectedRoute></Suspense> },
      { path: 'login', element: <Suspense fallback={<div>Loading...</div>}><ProtectLoginnedRoute><Login /></ProtectLoginnedRoute></Suspense> },
      { path: 'categories', element: <Suspense fallback={<div>Loading...</div>}><ProtectedRoute><Categories /></ProtectedRoute></Suspense> },
      { path: 'ReturnsExchanges', element: <Suspense fallback={<div>Loading...</div>}><ProtectedRoute><ReturnsExchanges /></ProtectedRoute></Suspense> },
      { path: 'Allorders', element: <Suspense fallback={<div>Loading...</div>}><ProtectedRoute><Allorders /></ProtectedRoute></Suspense> },
      { path: 'productdetails/:productId', element: <Suspense fallback={<div>Loading...</div>}><ProtectedRoute><ProductDetails /></ProtectedRoute></Suspense> },
      { path: 'brands', element: <Suspense fallback={<div>Loading...</div>}><ProtectedRoute><Brands /></ProtectedRoute></Suspense> },
      { path: 'checkOut/:pymintid', element: <Suspense fallback={<div>Loading...</div>}><ProtectedRoute><Checkout /></ProtectedRoute></Suspense> },
      { path: 'usersettings', element: <Suspense fallback={<div>Loading...</div>}><ProtectedRoute><UserSettings /></ProtectedRoute></Suspense> },
      { path: '*', element: <Suspense fallback={<div>Loading...</div>}><NotFound /></Suspense> },
    ],
  },
]);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TokenContextProvider> 
        <UserContextProvider>
          <CartContextProvider>
            <AllOrdersContext>
              <WashListContext>
                <Suspense fallback={<div>Loading...</div>}>
                  <RouterProvider router={routes} />
                </Suspense>
                <Toaster />
                <ReactQueryDevtools initialIsOpen={false} />
              </WashListContext>
            </AllOrdersContext>
          </CartContextProvider>
        </UserContextProvider>
      </TokenContextProvider>
    </QueryClientProvider>
  );
}

export default App;
