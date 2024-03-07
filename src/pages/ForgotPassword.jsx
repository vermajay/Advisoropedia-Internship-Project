import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {HiOutlineArrowNarrowLeft} from 'react-icons/hi'
import { Link } from 'react-router-dom'
import { getPasswordResetToken } from '../services/operations/authApi'

import {motion} from 'framer-motion'
import { textVariant } from "../utils/motion";
import MotionWrapper from "../hoc/MotionWrapper";

const ForgotPassword = () => {

    const {loading} = useSelector((state) => state.auth)

    const [emailSent, setEmailSent] = useState(false)
    const [email, setEmail] = useState("")

    const dispatch = useDispatch()

    const submitHandler = (event) => {
        event.preventDefault()
        dispatch(getPasswordResetToken(email, setEmailSent))
    }

    return (
        <motion.div variants={textVariant()} className='grid place-items-center min-h-[calc(100vh-6rem)] px-4 sm:px-0'>
            {
                loading ? (<div className="spinner"></div>)
                :
                (
                    <div className='flex flex-col gap-4 max-w-md'>
                        
                        <p className='font-semibold text-3xl bg-gradient-to-tr from-blue-600 via-green-500 to-indigo-400 text-transparent bg-clip-text'>
                            {
                                !emailSent ? "Reset your password" : "Check email"
                            }
                        </p>

                        <p className='sm:text-lg leading-[26px]'>
                            {
                                !emailSent ? "Have no fear. We'll email you instructions to reset your password."
                                :
                                `We have sent the reset email to ${email}.`
                            }
                        </p>

                        <form onSubmit={submitHandler}>

                            {
                                !emailSent && (
                                    <label className='w-full'>
                                        <p className='text-[1rem] sm:text-[1.2rem] mb-1 leading-[1.375rem]'>Email Address
                                        <sup className='text-red-700 font-bold text-[17px]'>*</sup>
                                        </p>
                                        <input className='w-full bg-gray-200 rounded-[0.5rem] p-[12px] drop-shadow-[0_2px_rgba(255,255,255,0.25)]'
                                        required type='email' name='email' value={email} placeholder='Enter email address' 
                                        onChange={(e)=>setEmail(e.target.value)}/>
                                    </label>
                                )
                            }
                            
                            <button type='submit'
                                    className='bg-blue-500 text-white w-full mt-2
                                    text-center text-[16px] px-6 py-3 rounded-md font-bold hover:scale-[0.98] transition-all duration-200'>
                                {
                                    !emailSent ? "Reset Password" : "Resend Email"
                                }
                            </button>

                        </form>

                        <div className='flex justify-start'>

                            <Link to="/login" className='font-medium text-base hover:scale-95 transition-all duration-200'>
                                <div className='flex items-center gap-2'>
                                    <HiOutlineArrowNarrowLeft size={20}/>
                                    <p>Back to login</p>
                                </div>
                            </Link>

                        </div>
                    </div>
                )
            }
        </motion.div>
    )
}

export default MotionWrapper(ForgotPassword)