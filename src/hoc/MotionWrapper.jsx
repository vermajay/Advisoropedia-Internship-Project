import {motion} from 'framer-motion'
import { staggerContainer } from '../utils/motion'

const MotionWrapper = (Component) => {  //this component is used to wrap all those components that use framer-motion

  return function HOC(){
    return (
        <motion.section 
            variants={staggerContainer()}
            initial="hidden" 
            whileInView={"show"}
            viewport={{once:true, amount:0.25}}
        >
          <Component/>
        </motion.section>
    )
  }
}

export default MotionWrapper