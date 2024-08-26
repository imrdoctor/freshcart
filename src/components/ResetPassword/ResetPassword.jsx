import React, { useState } from 'react';
import { useFormik } from 'formik';
import axios from 'axios';
import Loader from "../Loader/Loader";
import OTPForm from '../OtpForm/OtpForm';
import toast from 'react-hot-toast';

export default function ResetPassword() {
  const [isLoading, setIsLoading] = useState(false);
  const [showOtp, setShowOtp] = useState(false);

  const resetSubmit = async (formValue) => {
    setIsLoading(true);
    try {
      const { data } = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords', formValue);
      if (data.statusMsg === "success") {
        setShowOtp(true);
        toast.success(data.message,{
            style: {
              background: '#22d210',
              color: '#fff',
            },
        });
      } else {
      }
    } catch (err) {
      toast.error('An error occurred. Please try again.',{
        style: {
          background: '#f15757',
          color: '#fff',
        },
      });
    } finally {
      setIsLoading(false);
    }
  };

  const formik = useFormik({
    initialValues: {
      email: '',
    },
    onSubmit: resetSubmit,
  });

  if (isLoading) {
    return <Loader />;
  }

  if (showOtp) {
    return <OTPForm />;
  }

  return (
    <div className="flex justify-center items-center">
      <form onSubmit={formik.handleSubmit} className="bg-glass p-8 shadow-lg rounded-lg w-full max-w-md flex flex-col items-center gap-6">
        <p className='text-center text-2xl font-bold text-blue-800'>Reset Password</p>
        {/* Email Input */}
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
            placeholder="Email@mail.com"
          />
        </div>

        {/* Submit Button */}
        <button type="submit" className='w-full h-12 bg-blue-700 text-white font-medium rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 text-sm px-5 py-2.5'>
          Submit
        </button>
      </form>
    </div>
  );
}
