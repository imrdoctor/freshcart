import React, { useState } from 'react';
import { useFormik } from 'formik';
import axios from 'axios';
import NewPassword from '../NewPassword/NewPassword'; 
import ResetPassword from '../ResetPassword/ResetPassword';
import toast, { Toaster } from 'react-hot-toast';

export default function OtpForm() {
  const [otpValue, setOtpValue] = useState('');
  const [NewPass, setNewPass] = useState(null);
  const [resetPass, setResetPass] = useState(null);
  const vefysubmit = async (formValue) => {
    try {
      const { data } = await axios.post(
        'https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode',
        JSON.stringify({ resetCode: formValue.resetCode }),
        { headers: { 'Content-Type': 'application/json' } }
      );
      if(data.status == "Success"){
        toast.success("Type the email then the new password",{
          style: {
            background: '#22d210',
            color: '#fff',
          },
        });
        setNewPass(true)
      } else {
        console.error('Failed to reset password:', data);
      }
    } catch (err) {
      console.error('An error occurred. Please try again.', err);
      
      toast.error(err.response.data.message,{
        style: {
          background: '#f15757',
          color: '#fff',
        },
      });
    }
    finally{

    }
  };

  const formik = useFormik({
    initialValues: {
      resetCode: '',
    },
    onSubmit: vefysubmit,
  });

  // Handle OTP input changes
  const handleChange = (index, event) => {
    const { value } = event.target;
    if (!/^\d$/.test(value) && value !== '') {
      return;
    }
    
    const newOtpValue = otpValue.substring(0, index) + value + otpValue.substring(index + 1);
    setOtpValue(newOtpValue);
    
    // Update Formik values
    formik.setFieldValue('resetCode', newOtpValue);

    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-input${index + 1}`);
      if (nextInput) {
        nextInput.focus();
      }
    }
  };

  // Handle backspace key down
  const handleKeyDown = (index, event) => {
    if (event.key === 'Backspace') {
      if (!event.target.value && index > 0) {
        const prevInput = document.getElementById(`otp-input${index - 1}`);
        if (prevInput) {
          const newOtpValue = otpValue.substring(0, index - 1) + otpValue.substring(index);
          setOtpValue(newOtpValue);
          formik.setFieldValue('resetCode', newOtpValue);

          prevInput.focus();
        }
      }
    }
  };
  if(NewPass){
    return <NewPassword />
  }
  function returntoresetpass(){
    setResetPass(true)
  }
  if(resetPass){
    return <ResetPassword />
  }
  return (
    <div className="flex justify-center items-center p-4">
      <div className="bg-glass p-8 shadow-lg rounded-lg w-full max-w-md flex flex-col items-center gap-6 relative">
        <span className="text-xl font-bold text-black">Enter verification code</span>
        <p className="text-sm text-black text-center leading-5">
          We have sent a verification code to your Email
        </p>
        <form onSubmit={formik.handleSubmit}>
          <div className="w-full flex flex-row gap-2 items-center justify-center ">
            {[...Array(6)].map((_, i) => (
              <input
                key={i}
                id={`otp-input${i}`}
                value={otpValue[i] || ''}
                maxLength="1"
                type="text"
                onChange={(e) => handleChange(i, e)}
                onKeyDown={(e) => handleKeyDown(i, e)}
                className="bg-glass w-12 h-12 text-center border-none rounded-md caret-indigo-500 text-gray-800 outline-none font-semibold focus:bg-indigo-100 transition duration-300"
              />
            ))}
          </div>
          <button
            type="submit"
            className="w-full h-12 mt-4 bg-indigo-500 text-white font-semibold rounded-md hover:bg-indigo-400 transition duration-200"
          >
            Verify
          </button>
        </form>
        <button onClick={returntoresetpass} className="absolute  top-4 right-4 bg-red-700 text-white text-black text-lg rounded-full w-8 h-8 border-none shadow-md flex items-center justify-center cursor-pointer">
          ×
        </button>
        <p className="text-sm text-black w-full flex flex-col items-center justify-center gap-1">
          Not Your Email ?
          <button onClick={returntoresetpass} className="bg-transparent border-none text-indigo-500 text-lg font-semibold cursor-pointer">
            Change Email
          </button>
        </p>
      </div>
    </div>
  );
}
