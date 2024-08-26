import React, { useState } from 'react';
import { useFormik } from 'formik'
import * as Yup from 'yup'
import axios from 'axios';
import Loader from "../Loader/Loader";
import OTPForm from '../OtpForm/OtpForm';
import toast from 'react-hot-toast';
import { useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

export default function Checkout() {
  const [isLoading, setIsLoading] = useState(false);
  const [showOtp, setShowOtp] = useState(false);
  let { pymintid } = useParams();
  const [isCashOnDelivery, setIsCashOnDelivery] = useState(false);
  const navigate = useNavigate();
  const handleCheckboxChange = (event) => {
    
    setIsCashOnDelivery(event.target.checked);
  };  
  const checkout = async (formValue) => {
    setIsLoading(true);
    try {
      let responseCash, responseOnline; // Separate variables for each response
  
      if (isCashOnDelivery) {
        // API call for cash on delivery
        responseCash = await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/${pymintid}`, formValue, {
          headers: {
            token: localStorage.getItem("userToken"),
          },
        });
  
        if (responseCash.data.status === "success") {
          // Navigate to all orders page for cash on delivery
          navigate("/freshcart/allorders");
          console.log("Cash on delivery order processed successfully", responseCash.data);
        } else {
          // Handle error response for cash on delivery
          toast.error('An error occurred while processing cash on delivery.', {
            style: {
              background: '#f15757',
              color: '#fff',
            },
          });
        }
      } else {
        // API call for online payment
        responseOnline = await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${pymintid}?url=http://https://imrdoctor.github.io/freshcart/`, formValue, {
          headers: {
            token: localStorage.getItem("userToken"),
          },
        });
  
        if (responseOnline.data.status === "success") {
          console.log("Online payment session created successfully");
          // Open window for payment in the same tab
          window.location.href = responseOnline.data.session.url;
        } else {
          // Handle error response for online payment
          toast.error('An error occurred while processing online payment.', {
            style: {
              background: '#f15757',
              color: '#fff',
            },
          });
        }
      }
    } catch (err) {
      toast.error('An error occurred. Please try again.', {
        style: {
          background: '#f15757',
          color: '#fff',
      }});
    } finally {
      setIsLoading(false);
    }
  };
  
  
  
  const validationSchema = Yup.object({
    phone: Yup.string().matches(/^01[0125][0-9]{8}$/, 'Invalid phone number')
  });
  const formik = useFormik({
    initialValues: {
      details: "",
      phone: "",
      city: ""
    },
    onSubmit: checkout,
    validationSchema
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
        <p className='text-center text-2xl font-bold text-blue-800'>Your Address</p>
        {/* Email Input */}
        <div className="w-full">
          <label htmlFor="email" className='block mb-1 text-sm font-medium text-gray-900'>Your City</label>
          <input
            name='city'
            type="text"
            id="city"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.city}
            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
            placeholder="Type Your City"
            required
          />
        </div>

        {/* Email Input */}
        <div className="w-full">
          <label htmlFor="phone" className='block mb-1 text-sm font-medium text-gray-900'>Your phone</label>
          <input
            name='phone'
            type="tel"
            id="phone"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.phone}
            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
            placeholder="Type Your Phone "
            required
          />
          {formik.touched.phone && formik.errors.phone ? (
            <div className="mb-2 mb-0 text-sm text-red-800" >
              <span className="font-medium">Error:</span> {formik.errors.phone}
            </div>
          ) : null}
        </div>


        {/* Email Input */}
        <div className="w-full">
          <label htmlFor="details" className='block mb-1 text-sm font-medium text-gray-900'>Your details</label>
          <input
            name='details'
            type="text"
            id="details"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.details}
            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
            placeholder="Type Any details you want "
            required
          />
        </div>
        {/* visa or no */}

        <div className="flex w-full px-2">
          <input id="default-checkbox" type="checkbox" value="" checked={isCashOnDelivery} onChange={handleCheckboxChange} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" /> <label htmlFor="default-checkbox" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
            Cash on delivery?
          </label>
        </div>


        {/* Submit Button */}
        <button
          disabled={!(formik.isValid && formik.dirty)}
          type="submit"
          className={`w-full h-12 bg-blue-700 text-white font-medium rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 text-sm px-5 py-2.5 ${!(formik.isValid && formik.dirty) ? 'opacity-50 cursor-not-allowed' : ''
            }`}
        >
          <i className="fa-regular fa-credit-card"></i> Pay
        </button>

      </form>
    </div>
  );
}
