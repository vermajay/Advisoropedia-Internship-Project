import React, { useState } from "react";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import { toast } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { setSignUpData } from "../redux/slices/authSlice";
import ProfilePicture from "../components/ProfilePicture";
import { apiConnector } from "../services/apiConnector";
import { UPLOAD_PROFILE_PIC_API } from "../services/apis";
import { sendOtp } from "../services/operations/authApi"

import {motion} from 'framer-motion'
import { fadeIn, textVariant } from "../utils/motion";
import MotionWrapper from "../hoc/MotionWrapper";

const SignUp = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const authLoading = useSelector((state) => state.auth.loading);

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    username: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    imageFile: null,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  function changeHandler(event) {   //to handle form updation
    setFormData((prev) => {
      return {
        ...prev,
        [event.target.name]: event.target.value,
      };
    });
  }

  const uploadImage = async(data) => {   //this uploads profile pic to cloudinary and return the image url
    let result = null;
    try{
      const response = await apiConnector("PUT", UPLOAD_PROFILE_PIC_API, data)
      console.log("UPLOAD_PROFILE_PIC_API RESPONSE............", response)
      if (!response?.data?.success) {
        throw new Error(response.data.message)
      }
      result = response?.data?.data
    }
    catch(error){
      console.log("UPLOAD_PROFILE_PIC_API ERROR............", error)
    }
    return result
  }

  async function submitHandler(event) {
    event.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords Do Not Match");
      return;
    }

    console.log("Inside signup printing formdata-> ", formData);

    //upload profilePic to cloudinary and get the url
    setLoading(true);
    const imgData = new FormData();
    imgData.append("imageFile", formData?.imageFile)
    const img = await uploadImage(imgData);
    setLoading(false);
    console.log("Inside signup printing url-> ", img?.secure_url);

    const newData = new FormData();
    newData.append("username", formData.username);
    newData.append("email", formData.email);
    newData.append("password", formData.password);
    newData.append("confirmPassword", formData.confirmPassword);
    newData.append("firstName", formData?.firstName);
    newData.append("lastName", formData?.lastName);
    newData.append("image", img?.secure_url ? img?.secure_url : "");

    let data = Object.fromEntries(newData.entries())

    console.log("Data-> ", data);

    // Setting signup data to state
    // To be used after otp verification
    dispatch(setSignUpData(data))

    // Send OTP to user for verification
    dispatch(sendOtp(formData.email, navigate))

    //RESET
    setFormData({
      username: "",
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      imageFile: null,
    });
  }

  if(authLoading) return <div className="flex justify-center items-center w-full h-screen"><div className="spinner"></div></div>

  return (
    <div className="flex justify-center items-center h-screen overflow-auto">
      <div className="w-full max-w-4xl flex items-center justify-center gap-16 h-screen">

        <motion.p variants={textVariant()}
        className="leading-[5rem] max-w-[19rem] font-extrabold text-7xl bg-gradient-to-tr from-blue-600 via-green-500 to-indigo-400 text-transparent bg-clip-text hidden md:block">
          Join the millions enjyoing this website!
        </motion.p>

        <motion.div variants={fadeIn("left", "spring", 0.3, 0.75)}>
          <ProfilePicture setFormData={setFormData}/>

          <form
            onSubmit={submitHandler}
            className="flex flex-col w-full gap-y-4 mt-6"
          >
            <div className="flex w-full gap-4">
              <label className="w-full">
                <p className="text-[1rem] mb-1 leading-[1.375rem]">
                  First Name
                </p>
                <input
                  className="w-full bg-gray-200 rounded-[0.5rem]  p-[12px] drop-shadow-[0_2px_rgba(255,255,255,0.25)]"
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  placeholder="Enter first name"
                  onChange={changeHandler}
                />
              </label>
              <label className="w-full">
                <p className="text-[1rem] mb-1 leading-[1.375rem]">Last Name</p>
                <input
                  className="w-full bg-gray-200 rounded-[0.5rem]  p-[12px] drop-shadow-[0_2px_rgba(255,255,255,0.25)]"
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  placeholder="Enter last name"
                  onChange={changeHandler}
                />
              </label>
            </div>

            <label>
              <p className="text-[1rem] mb-1 leading-[1.375rem]">
                Username
                <sup className="text-red-700 font-bold text-[17px]">*</sup>
              </p>
              <input
                className="w-full bg-gray-200 rounded-[0.5rem] p-[12px] drop-shadow-[0_2px_rgba(255,255,255,0.25)]"
                required
                type="username"
                name="username"
                value={formData.username}
                placeholder="Enter username"
                onChange={changeHandler}
              />
            </label>

            <label>
              <p className="text-[1rem] mb-1 leading-[1.375rem]">
                Email Address
                <sup className="text-red-700 font-bold text-[17px]">*</sup>
              </p>
              <input
                className="w-full bg-gray-200 rounded-[0.5rem] p-[12px] drop-shadow-[0_2px_rgba(255,255,255,0.25)]"
                required
                type="email"
                name="email"
                value={formData.email}
                placeholder="Enter email address"
                onChange={changeHandler}
              />
            </label>

            <div className="flex flex-wrap sm:flex-nowrap w-full gap-4">
              <label className="relative w-full">
                <p className="text-[1rem]  mb-1 leading-[1.375rem]">
                  Create Password
                  <sup className="text-red-700 font-bold text-[17px]">*</sup>
                </p>
                <input
                  className="w-full bg-gray-200 rounded-[0.5rem] p-[12px] drop-shadow-[0_2px_rgba(255,255,255,0.25)]"
                  required
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  placeholder="Enter Password"
                  onChange={changeHandler}
                />
                <span
                  className="absolute right-3 top-[38px] cursor-pointer"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  {showPassword ? (
                    <AiOutlineEyeInvisible fontSize={24} />
                  ) : (
                    <AiOutlineEye fontSize={24} />
                  )}
                </span>
              </label>
              <label className="relative w-full">
                <p className="text-[1rem]  mb-1 leading-[1.375rem]">
                  Confirm Password
                  <sup className="text-red-700 font-bold text-[17px]">*</sup>
                </p>
                <input
                  className="w-full bg-gray-200 rounded-[0.5rem] p-[12px] drop-shadow-[0_2px_rgba(255,255,255,0.25)]"
                  required
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  placeholder="Confirm Password"
                  onChange={changeHandler}
                />
                <span
                  className="absolute right-3 top-[38px] cursor-pointer"
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                >
                  {showConfirmPassword ? (
                    <AiOutlineEyeInvisible fontSize={24} />
                  ) : (
                    <AiOutlineEye fontSize={24} />
                  )}
                </span>
              </label>
            </div>

            <div className="flex w-full gap-2">
              <input type="checkbox" id="terms" required />
              <label htmlFor="terms">I agree to the terms and conditions</label>
            </div>

            <button className="bg-blue-500 rounded-[8px] font-medium text-white px-[12px] py-[8px] mt-2 hover:scale-[0.98] transition-all duration-150" disabled={loading}>
              {loading ? "Creating..." : "Create Account"}
            </button>
          </form>

          <div className="text-center w-full mt-1 text-gray-800">
            Already have an account?{" "}
            <Link to={"/login"}>
              <span className="text-blue-600">Login</span>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default MotionWrapper(SignUp);
