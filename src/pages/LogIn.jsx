import React, { useState } from 'react'
import {AiOutlineEyeInvisible, AiOutlineEye} from 'react-icons/ai'
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from 'react-router-dom';

import { login } from "../services/operations/authApi"

import {motion} from 'framer-motion'
import { fadeIn, textVariant } from "../utils/motion";
import MotionWrapper from "../hoc/MotionWrapper";

const LogIn = () => {

  const authLoading = useSelector((state) => state.auth.loading);

  const navigate = useNavigate();
  const dispatch = useDispatch()
  
  const [formData, setFormData] = useState({
      email : '',
      password : ''
  });
  const [showPassword, setShowPassword] = useState(false);

  function changeHandler(event){  //to handle form updation
      event.preventDefault();
      setFormData(prev=>(
          {
              ...prev,
              [event.target.name] : event.target.value
          }
      ))
  }

  function submitHandler(event){
    event.preventDefault();
    dispatch(login(formData.email, formData.password, navigate))
  }

  if(authLoading) return <div className="flex justify-center items-center w-full h-screen"><div className="spinner"></div></div>

  return (
    <div className="flex gap-12 h-screen justify-center items-center w-full">
        <motion.p variants={textVariant()} className="leading-[4.5rem] max-w-[20rem] font-extrabold text-6xl bg-gradient-to-tr from-blue-600 via-green-500 to-indigo-400 text-transparent bg-clip-text hidden sm:block">
          Login and browse millions of exciting posts!
        </motion.p>

        <motion.form variants={fadeIn("left", "spring", 0.3, 0.75)}
         onSubmit={submitHandler} className='flex flex-col w-full gap-y-4 px-4 sm:px-0 mt-6 max-w-sm'>

          <label className='w-full'>
              <p className='text-[1.2rem] mb-1 leading-[1.375rem]'>Email Address
              <sup className='text-red-700 font-bold text-[17px]'>*</sup>
              </p>
              <input className='w-full bg-gray-200 rounded-[0.5rem] p-[12px] drop-shadow-[0_2px_rgba(255,255,255,0.25)]'
              required type='email' name='email' value={formData.email} placeholder='Enter email address' onChange={changeHandler}/>
          </label>

          <label className='w-full relative'>
              <p className='text-[1.2rem] mb-1 leading-[1.375rem]'>Password
              <sup className='text-red-700 font-bold text-[17px]'>*</sup>
              </p>
              <input className='w-full bg-gray-200 rounded-[0.5rem] p-[12px] drop-shadow-[0_2px_rgba(255,255,255,0.25)]'
              required type={showPassword?"text":"password"} name='password' value={formData.password} placeholder='Enter Password' onChange={changeHandler}/>
              
              <span className='absolute right-3 top-[38px] cursor-pointer'
              onClick={()=>setShowPassword(prev=>!prev)}>
                  {showPassword ? 
                  <AiOutlineEyeInvisible fontSize={24}/> : 
                  <AiOutlineEye fontSize={24}/>}
              </span>
              <Link to="/forgot-password">
                  <p className='mt-1 text-red-600 font-semibold absolute right-0 hover:scale-95 transition-all duration-200'>Forgot Password</p>
              </Link>
          </label>

          <button className='bg-blue-500 rounded-[8px] font-medium text-white px-[12px] py-[8px] mt-10 hover:scale-[0.98] transition-all duration-150'>
              Log In
          </button>

          <div className="text-center w-full text-gray-800 -mt-2">
            Don't have an account?{" "}
            <Link to={"/signup"}>
              <span className="text-blue-600">Signup</span>
            </Link>
          </div>

        </motion.form>
    </div>
  );
};

export default MotionWrapper(LogIn);