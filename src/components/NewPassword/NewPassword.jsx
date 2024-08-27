import React, { useContext, useState } from 'react';
import { useFormik } from 'formik';
import axios from 'axios';
import Loader from '../Loader/Loader'; 
import { UserContext } from '../../context/userContext';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export default function ResetPassword() {
  const [isLoading, setIsLoading] = useState(false);
  const { setuserlogin } = useContext(UserContext);
  const navigate = useNavigate();

  const resetSubmit = async (formValue) => {
    // setIsLoading(true);
    try {
      const { data } = await axios.put(
        'https://ecommerce.routemisr.com/api/v1/auth/resetPassword',
        formValue, 
      );
      if(data){
        setuserlogin(data.token);
        toast.success("Password changed successfully",{
          style: {
            background: '#22d210',
            color: '#fff',
          },
        });
        navigate('/freshcart/login');
      }
      if (data.statusMsg === "success") {
        console.log("Password reset successful");
      } else {
        console.log();
      }
    } catch (err) {
      toast.error(err.response.data.message,{
          style: {
            background: '#f15757',
            color: '#fff',
          },
      });
    } finally {
      // setIsLoading(false);
    }
  };

  const formik = useFormik({
    initialValues: {
      email: '',
      newPassword: '',
    },    
    onSubmit: resetSubmit,
  });
  
  if (isLoading) {
    return <Loader />;
  }
  return (
    <div className="flex justify-center items-center">
      <form onSubmit={formik.handleSubmit} className="bg-glass p-8 shadow-lg rounded-lg w-full max-w-md flex flex-col items-center gap-6">
        <p className='text-center text-2xl font-bold text-blue-800'>New Password</p>
        <div className="w-full mb-5">
          <label htmlFor="email" className='block mb-2 text-sm font-medium text-gray-900'>Your email</label>
          <input
            name='email'
            type="email"
            id="email"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.email}
            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
            placeholder="name@mail.com"
          />
        </div>
        <div className="w-full mb-5">
          <label htmlFor="newPassword" className='block mb-2 text-sm font-medium text-gray-900'>Your New Password</label>
          <input
            name='newPassword'
            type="password"
            id="newPassword"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.newPassword}
            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
            placeholder="Your new password"
          />
        </div>
        <button type="submit" className='w-full h-12 bg-blue-700 text-white font-medium rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 text-sm px-5 py-2.5'>
          Submit
        </button>
      </form>
    </div>
  );
}
