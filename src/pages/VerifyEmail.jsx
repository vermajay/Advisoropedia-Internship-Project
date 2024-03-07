import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import OtpInput from 'react-otp-input'
import { Link, useNavigate } from 'react-router-dom'
import {sendOtp, signUp} from "../services/operations/authApi"

import {HiOutlineArrowNarrowLeft} from 'react-icons/hi'
import {GiBackwardTime} from 'react-icons/gi'

import {motion} from 'framer-motion'
import { textVariant } from "../utils/motion";
import MotionWrapper from "../hoc/MotionWrapper";

const VerifyEmail = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const {loading, signUpData} = useSelector((state) => state.auth)

    const [otp, setOtp] = useState()

    useEffect(()=>{
        if(!signUpData){
            navigate("/signup")
        }
    }, [signUpData, navigate])

    const submitHandler = (event) => {
        event.preventDefault();

        const{
            username,
            firstName,
            lastName,
            email,
            password,
            confirmPassword,
            image
        } = signUpData;

        dispatch(signUp(username, firstName, lastName, email, password, confirmPassword, image, otp, navigate))
    }

    return (
        <motion.div variants={textVariant()} className='grid place-items-center min-h-[calc(100vh-6rem)] px-4 sm:px-0'>
            {
                loading ? (<div className="spinner"></div>)
                :
                (
                    <div className='flex flex-col gap-4 max-w-md'>
                        <p className='font-semibold text-3xl bg-gradient-to-tr from-blue-600 via-green-500 to-indigo-400 text-transparent bg-clip-text'>Verify Email</p>
                        <p className='sm:text-lg leading-[26px]'>A verification code has been sent to you. Enter the code below</p>

                        <form onSubmit={submitHandler}>

                            <OtpInput
                                value={otp}
                                onChange={setOtp}
                                numInputs={6}
                                renderInput={(props) => (
                                    <input
                                    {...props}
                                    placeholder="-"
                                    style={{
                                        boxShadow: "inset 0px -1px 0px rgba(10, 10, 20, 0.18)",
                                    }}
                                    className="w-[34px] sm:w-[48px] lg:w-[60px] border-0 bg-blue-100 rounded-[0.5rem] aspect-square text-center focus:border-0 focus:outline-2 focus:outline-blue-400"
                                    />
                                )}
                                containerStyle={{
                                    justifyContent: "space-between",
                                    gap: "0 6px",
                                }}
                            />
                            <button type='submit'
                                    className='bg-blue-500 text-white w-full mt-6
                                    text-center text-[16px] px-6 py-3 rounded-md font-bold hover:scale-[0.98] transition-all duration-200'>
                                Verify Email
                            </button>

                        </form>

                        <div className='flex justify-between'>

                            <Link to="/signup" className='font-medium text-base hover:scale-95 transition-all duration-200'>
                                <div className='flex items-center gap-2'>
                                    <HiOutlineArrowNarrowLeft size={20}/>
                                    <p>Back to signup</p>
                                </div>
                            </Link>

                            <button onClick={()=>dispatch(sendOtp(signUpData.email, navigate))}
                             className='flex items-center sm:gap-1 text-red-600 font-medium text-base hover:scale-95 transition-all duration-200'>
                                <GiBackwardTime size={26}/>
                                <p>Resend otp</p>
                            </button>

                        </div>
                        
                    </div>
                )
            }
        </motion.div>
    )
}

export default MotionWrapper(VerifyEmail)