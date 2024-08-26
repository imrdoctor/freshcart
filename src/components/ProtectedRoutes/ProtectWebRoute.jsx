import React, { useContext, useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/userContext';
import axios from 'axios';

export default function ProtectedRoute(props) {
  const { setuserlogin } = useContext(UserContext);
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(null); 

  useEffect(() => {
    const headers = {
      token: localStorage.getItem('userToken'),
    };

    async function checkLoginStatus() {
      try {
        const res = await axios.get('https://ecommerce.routemisr.com/api/v1/addresses', { headers });
        if (res.data.status === "success") {
          console.log("Your Token Is Real");
          setIsAuthenticated(true); // التوكن صحيح
        } else {
          console.log("Invalid Token, redirecting to login");
          setIsAuthenticated(false);
          navigate('/freshcart/login');
        }
      } catch (err) {
        setIsAuthenticated(false);
        navigate('/freshcart/login');
        localStorage.removeItem("userToken");
        setuserlogin(null);
      }
    }

    checkLoginStatus();
  }, [navigate]);

  if (isAuthenticated === null) {
    return null; 
  }

  if (isAuthenticated) {
    return props.children; 
  } else {
    return <Navigate to={'/freshcart/login'} />; 
  }
}