import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom";
import { logout } from "../services/operations/authApi"

import {motion} from 'framer-motion'                   
import { fadeIn, textVariant } from "../utils/motion";
import MotionWrapper from "../hoc/MotionWrapper";

const Navbar = () => {

    const {user} = useSelector((state) => state.profile)  //get user data from profileSlice in redux store
    const dispatch = useDispatch();
    const navigate = useNavigate();

  return (
    <div className="flex flex-col md:flex-row justify-center items-center border-b h-auto md:h-[9rem] pb-2">

      <motion.div variants={textVariant()} className="flex flex-col p-4">
        <p className="text-2xl md:text-4xl font-semibold mb-2">Welcome <span className="text-[2rem] md:text-[3rem] font-bold bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 text-transparent bg-clip-text">{user.firstName} {user.lastName}</span></p>
        <p className="text-gray-600"><span className="text-gray-800">Username:</span> {user.username}</p>
        <p className="text-gray-600"><span className="text-gray-800">Email:</span> {user.email}</p>  
      </motion.div>

      <div className="p-4 hidden md:block">
        <img src={user.image} className="rounded-full h-20 md:h-32 w-20 md:w-32 object-cover" alt="User Profile" />
      </div>
      
      <motion.button variants={fadeIn("left", "spring", 0.3, 0.5)}
        onClick={() => dispatch(logout(navigate))} 
        className="bg-blue-500 rounded-[8px] font-medium text-white px-4 md:px-[12px] py-2 md:py-[8px] mt-2 md:mt-0 hover:scale-[0.98] transition-all duration-150 md:ml-20">
        Logout
      </motion.button>

    </div>

  )
}

export default MotionWrapper(Navbar)