import React, { useContext } from "react";
import { useFormik } from "formik";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { TokenContext } from "../../context/TokenContext";
import * as Yup from 'yup';

export default function UserSettings() {
  const { decodedToken } = useContext(TokenContext);
  const navigate = useNavigate();
  const headers = {
    token: localStorage.getItem("userToken"),
  };
  const validationSchema = Yup.object({
    currentPassword: Yup.string().required("Old password is required"),
    password: Yup.string()
      .matches(
        /^[A-Z][a-z0-9]{3,8}$/,
        "Password must start with an uppercase letter and contain 3 to 8 lowercase letters or digits"
      )
      .required("New password is required"),
    rePassword: Yup.string()
      .oneOf([Yup.ref('password')], 'Passwords must match')
      .required("Confirm password is required"),
  });

  const updatePassword = async (formValues) => {
    try {
      const { data } = await axios.put(
        "https://ecommerce.routemisr.com/api/v1/users/changeMyPassword",
        formValues,
        { headers }
      );
      
      if (data) {
        localStorage.setItem('userToken', data.token);
        toast.success("Password changed successfully", {
          style: {
            background: '#22d210',
            color: '#fff',
          },
        });
        navigate('/freshcart/login');
      } else {
        toast.error("Failed to change password", {
          style: {
            background: '#f15757',
            color: '#fff',
          },
        });
      }
    } catch (err) {
      console.log(err);
      toast.error(err.response?.data?.errors.msg || "An error occurred", {
        style: {
          background: '#f15757',
          color: '#fff',
        },
      });
    }
  };

  const formik = useFormik({
    initialValues: {
      currentPassword: '',
      password: '',
      rePassword: '',
    },
    onSubmit: updatePassword,
    validationSchema,
  });

  return (
    <div className="mt-24 flex items-center justify-center">
      <div className="w-full mb-6 bg-gray-100 shadow-2xl rounded-lg overflow-hidden">
        <div className="p-6 bg-indigo-100 border-b border-indigo-300">
          <h1 className="text-4xl font-extrabold text-gray-800 text-center">
            User Settings
          </h1>
          <h2 className="text-xl font-bold text-gray-800">
            <i className="fa-solid fa-user"></i> Hi {decodedToken.name}
          </h2>
        </div>
        <div className="p-6 my-6">
          <div className="flex justify-center items-center flex-col max-w-xl m-auto">
            <div className="w-full p-6 bg-indigo-100 border-b border-indigo-300">
              <h1 className="text-4xl font-extrabold text-gray-800 text-center">
                Change Password
              </h1>
            </div>
            <form
              onSubmit={formik.handleSubmit}
              className="bg-gray-20 p-8 shadow-xl rounded-lg w-full max-w-xl flex flex-col items-center"
            >
              {/* Current Password Input */}
              <div className="w-full mb-5">
                <label
                  htmlFor="currentPassword"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Current  Password
                </label>
                <input
                  name="currentPassword"
                  type="password"
                  id="currentPassword"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.currentPassword}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5"
                  placeholder="Current Password"
                />
                {formik.touched.currentPassword && formik.errors.currentPassword ? (
                  <div className="text-sm text-red-800">
                    <span className="font-medium">Error:</span> {formik.errors.currentPassword}
                  </div>
                ) : null}
              </div>

              {/* New Password Input */}
              <div className="w-full mb-5">
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  New Password
                </label>
                <input
                  name="password"
                  type="password"
                  id="password"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.password}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5"
                  placeholder="New Password"
                />
                {formik.touched.password && formik.errors.password ? (
                  <div className="text-sm text-red-800">
                    <span className="font-medium">Error:</span> {formik.errors.password}
                  </div>
                ) : null}
              </div>

              {/* Confirm Password Input */}
              <div className="w-full mb-5">
                <label
                  htmlFor="rePassword"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Confirm Password
                </label>
                <input
                  name="rePassword"
                  type="password"
                  id="rePassword"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.rePassword}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5"
                  placeholder="Confirm Password"
                />
                {formik.touched.rePassword && formik.errors.rePassword ? (
                  <div className="text-sm text-red-800">
                    <span className="font-medium">Error:</span> {formik.errors.rePassword}
                  </div>
                ) : null}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full h-12 bg-indigo-400 text-white font-medium rounded-lg hover:bg-indigo-500 focus:ring-4 focus:outline-none focus:ring-indigo-300 text-sm px-5 py-2.5"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
