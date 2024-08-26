import React, { useContext, useEffect, useState } from 'react';
import { useFormik } from 'formik';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/userContext';
import toast from 'react-hot-toast';

export default function Login() {
  const { setuserlogin } = useContext(UserContext);
  const navigate = useNavigate();
  const [isLoading, setisLoading] = useState(false);
  
  const loginSubmit = async (formValue) => {
    try {
      const { data } = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signin', formValue);
      console.log(data);
  
      if (data.message === 'success') {
        localStorage.setItem('userToken', data.token);
        // حل مبدئي للخطأ الى بيظهر
        window.location.reload();
        // طريقة بردو عشان اجيب الإيميل
        localStorage.setItem('userEmail', data.user.email);
        localStorage.setItem('UserName', data.user.name);
        toast.success("Login successful!",{
          style: {
            background: '#22d210',
            color: '#fff',
          },
        });
        setisLoading(true)
          setuserlogin(data.user);
          navigate('/home');
      } else {
        toast.error(error.response.data.message || 'Login failed.');
      }
    } catch (error) {
      console.error('Error during login:', error);
      if (error.response.data.message == "fail"){
        toast.error('Fill in all the fields',{
          style: {
            background: '#f15757',
            color: '#fff',
          },
        });
      }
      else{
        toast.error(error.response.data.message,{
          style: {
            background: '#f15757',
            color: '#fff',
          },
        });
      }
    }
  };  
  useEffect(() => {
    // timeout notfiction
    let timer;
    if ( isLoading) {
      timer = setTimeout(() => {
        setisLoading(false)
      }, 4000);
    }
    return () => clearTimeout(timer);
  }, [isLoading]);
  
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: loginSubmit,
  });

  return (
    <div className="flex justify-center items-center">
      <form onSubmit={formik.handleSubmit} className="bg-glass p-8 shadow-lg rounded-lg w-full max-w-md">
      <p className='text-center font-bold text-blue-800'>Login</p>
        {/* Email Input */}
        <div className="mb-5">
          <label htmlFor="email" className='block mb-2 text-sm font-medium text-gray-900'>Your email</label>
          <input
            name='email'
            type="email"
            id="email"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.email}
            className='bg-gray-50 border w-full border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5'
            placeholder="name@flowbite.com"
          />
        </div>

        {/* Password Input */}
        <div className="mb-5">
          <label htmlFor="password" className='block mb-2 text-sm font-medium text-gray-900'>Your password</label>
          <input
            name='password'
            type="password"
            id="password"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.password}
            className='bg-gray-50 border w-full border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5'
            placeholder="password"
          />
          {formik.touched.password && formik.errors.password ? (
            <div className="mb-4 text-sm text-red-800">
              <span className="font-medium">Error:</span> {formik.errors.password}
            </div>
          ) : null}
        </div>

        {/* Submit Button */}
        <button disabled={isLoading} type="submit" className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5'>
          {isLoading ? <i className='fa fa-spinner fa-spin'></i> : null} Login
        </button>
        {/* Make go to reset pass  */}
        <div className="resetPass">
          <Link to="/ResetPassword" className="text-blue-600 hover:text-blue-800 transition ">
          <p>Forget Password ? Reset Now</p> 
          </Link>
        </div>
      </form>
    </div>
  );
}