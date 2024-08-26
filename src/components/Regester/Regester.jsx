import React, { useContext, useEffect, useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
export default function Register() {
  const [isLoading, setisLoading] = useState(false);
  const navigate = useNavigate(); 

  const registerSubmit = async (formValue) => {
    try {
      const { data } = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup', formValue);
      console.log(data);
      if (data.message === 'success') {
        // setuserlogin(data.token);
        // localStorage.setItem('userToken', data.token);
        toast.success("Registration successful",{
          style: {
            background: '#22d210',
            color: '#fff',
          },
        });
        setisLoading(true)
        navigate('/freshcart/login');
      } else {
        toast.error('Registration failed. Please try again.',{
          style: {
            background: '#f15757',
            color: '#fff',
          },
        });
      }
    } catch (error) {
      toast.error(error.response.data.message,{
        style: {
          background: '#f15757',
          color: '#fff',
        },
      });
      setisLoading(true)
    } 
  }

  const validationSchema = Yup.object({
    name: Yup.string().min(3, "Not less than 3").max(15, 'Max is 15').required("Required"),
    email: Yup.string().email('Invalid email').required("Required"),
    password: Yup.string().matches(/^[A-Z][a-z0-9]{3,8}$/, 'Password must start with an uppercase letter and contain 3 to 8 lowercase letters or digits').required("Required"),
    rePassword: Yup.string().oneOf([Yup.ref('password')], 'Passwords must match').required("Required"),
    phone: Yup.string().matches(/^01[0125][0-9]{8}$/, 'Invalid phone number').required("Required"),
  });
  useEffect(() => {
    // timeout notfiction
    let timer;
    if (isLoading) {
      timer = setTimeout(() => {
        setisLoading(null)
      }, 2000);
    }
    return () => clearTimeout(timer);
  }, [isLoading]);
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      rePassword: '',
      phone: '',
    },
    onSubmit: registerSubmit,
    validationSchema,
  });

  return (
    <div className="flex justify-center items-center">
    <form onSubmit={formik.handleSubmit} className="bg-glass p-8 shadow-lg rounded-lg w-full max-w-md mx-auto">
      <p className='text-center font-bold text-blue-800'>Create Account</p>
      {/* Start Input */}
      <div className="mb-5 w-full">
        <label htmlFor="email" className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>Your email</label>
        <input
          name='email'
          type="email"
          id="email"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          value={formik.values.email}
          className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
          placeholder="name@flowbite.com"
        />
        {formik.touched.email && formik.errors.email ? (
          <div className="mb-2 mb-0 text-sm text-red-800" >
            <span className="font-medium">Error:</span> {formik.errors.email}
          </div>
        ) : null}
      </div>
      {/* End Input */}

      {/* Start Input */}
      <div className="mb-5 w-full">
        <label htmlFor="name" className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>Your name</label>
        <input
          name='name'
          type="text"
          id="name"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          value={formik.values.name}
          className='bg-gray-50   border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
          placeholder="name"
        />
        {formik.touched.name && formik.errors.name ? (
          <div className="mb-2 mb-0 text-sm text-red-800" >
            <span className="font-medium">Error:</span> {formik.errors.name}
          </div>
        ) : null}
      </div>
      {/* End Input */}

      {/* Start Input */}
      <div className="mb-5 w-full">
        <label htmlFor="password" className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>Your password</label>
        <input
          name='password'
          type="password"
          id="password"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          value={formik.values.password}
          className='bg-gray-50  border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
          placeholder="password"
        />
        {formik.touched.password && formik.errors.password ? (
          <div className="mb-2 mb-0 text-sm text-red-800" >
            <span className="font-medium">Error:</span> {formik.errors.password}
          </div>
        ) : null}
      </div>
      {/* End Input */}

      {/* Start Input */}
      <div className="mb-5 w-full">
        <label htmlFor="rePassword" className='block mb-2 text-sm font-medium text-gray-900 dark:text-white d-flex justify-center content-center'>Confirm password</label>
        <input
          name='rePassword'
          type="password"
          id="rePassword"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          value={formik.values.rePassword}
          className='bg-gray-50 border  border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
          placeholder="Confirm password"
        />
        {formik.touched.rePassword && formik.errors.rePassword ? (
          <div className="mb-2 mb-0 text-sm text-red-800" >
            <span className="font-medium">Error:</span> {formik.errors.rePassword}
          </div>
        ) : null}
      </div>
      {/* End Input */}

      {/* Start Input */}
      <div className="mb-5 w-full">
        <label htmlFor="phone" className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>Your phone </label>
        <input
          name='phone'
          type="tel"
          id="phone"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          value={formik.values.phone}
          className='bg-gray-50 border  border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
          placeholder="phone"
        />
        {formik.touched.phone && formik.errors.phone ? (
          <div className="mb-2 mb-0 text-sm text-red-800" >
            <span className="font-medium">Error:</span> {formik.errors.phone}
          </div>
        ) : null}
      </div>
      {/* End Input */}
      <button disabled={isLoading} type="submit" className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5'>
      {/* انا عايز سابمت تبقا ظاهرة حتي وهو بيعمل لود */}
      {isLoading ? <i className='fa fa-spinner fa-spin'></i> : null }  Submit
      </button>
    </form>
    </div>
  );
}
