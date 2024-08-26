import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/userContext';
import axios from 'axios';

export default function ProtectLogin() {
  const { setuserlogin } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    const headers = {
      token: localStorage.getItem('userToken'),
    };

    async function checkLoginStatus() {
      try {
        const res = await axios.get('https://ecommerce.routemisr.com/api/v1/addresses', { headers });
        if(res.data.status == "success"){
          console.log("Your Token Is Real");
          
        }else{
          console.log("Get Out Of Here !");
        }
      } catch (err) {
        navigate('/freshcart/login');  
      }
    }

    checkLoginStatus();
  }, [setuserlogin, navigate]);

  return (
    <div>Protecting Login...</div>
  );
}
