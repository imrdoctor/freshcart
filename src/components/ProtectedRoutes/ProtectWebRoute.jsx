import React, { useContext, useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/userContext';
import axios from 'axios';

export default function ProtectedRoute(props) {
  const { setuserlogin } = useContext(UserContext);
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(null); 
  const [loading, setLoading] = useState(true); // حالة لتحميل التحقق

  useEffect(() => {
    const token = localStorage.getItem('userToken');

    async function checkLoginStatus() {
      if (!token) {
        setIsAuthenticated(false);
        setLoading(false);
        navigate('/freshcart/login');
        return;
      }

      const headers = { token };

      try {
        const res = await axios.get('https://ecommerce.routemisr.com/api/v1/auth/verifyToken', { headers });
        if (res.data.message === "verified") {
          console.log("Your Token Is Real");
          setIsAuthenticated(true); 
        } else {
          console.log("Invalid Token, redirecting to login");
          setIsAuthenticated(false);
          navigate('/freshcart/login');
        }
      } catch (err) {
        console.error("Error verifying token:", err.response?.data || err.message); // عرض تفاصيل الخطأ
        setIsAuthenticated(false);
        localStorage.removeItem("userToken");
        setuserlogin(null);
        navigate('/freshcart/login');
      } finally {
        setLoading(false); 
      }
    }

    checkLoginStatus();
  }, [navigate, setuserlogin]);

  if (loading) {
    return <div>Loading...</div>; 
  }

  if (isAuthenticated) {
    return props.children; 
  } else {
    return <Navigate to='/freshcart/login' />;
  }
}
