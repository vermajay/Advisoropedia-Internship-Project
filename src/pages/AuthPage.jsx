import React from "react";
import { Link } from "react-router-dom";

import {motion} from 'framer-motion'
import { fadeIn, textVariant } from "../utils/motion";
import MotionWrapper from '../hoc/MotionWrapper'

const AuthPage = () => {
  return (
    <div className="flex flex-col gap-4 items-center justify-center h-screen -mt-20">
    
      <motion.p variants={textVariant()} className="leading-10 sm:leading-[5.5rem] text-center font-medium sm:font-bold text-4xl sm:text-7xl bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 text-transparent bg-clip-text max-w-3xl mt-10">
        Welcome! <br/>
        Authenticate yourself and enjoy the posts
      </motion.p>

      <div className="flex flex-wrap gap-4 sm:gap-10 mt-5 justify-center">
        <motion.div variants={fadeIn("right", "spring", 0.3, 0.75)}>
          <Link to="/signup" className="relative inline-flex items-center justify-center p-1 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800">
            <span className="relative px-8 py-4 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0 text-2xl sm:text-4xl">
              SignUp
            </span>
          </Link>
        </motion.div>
        
        <motion.div variants={fadeIn("left", "spring", 0.3, 0.75)}>
          <Link to="/login" className="relative inline-flex items-center justify-center p-1 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800">
            <span className="relative px-8 py-4 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0 text-2xl sm:text-4xl">
              LogIn
            </span>
          </Link>
        </motion.div>
      </div>

    </div>
  );
};

export default MotionWrapper(AuthPage);
