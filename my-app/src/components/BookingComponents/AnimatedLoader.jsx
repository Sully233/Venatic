import { motion } from "framer-motion";



const variants = {
  initial: {
    scaleY: 0.5,
    opacity: 0,
  },
  animate: {
    scaleY: 1,
    opacity: 1,
    transition: {
      repeat: Infinity,
      repeatType: "mirror",
      duration: 0.4,
      ease: "circIn",
    },
  },
};

const AnimatedLoader = () => {
  return (
    <div className="grid place-content-center px-4 py-24">

    <motion.div
      transition={{
        staggerChildren: 0.1,
      }}
      initial="initial"
      animate="animate"
      className="flex gap-1"
    >
      <motion.div variants={variants} className="h-12 w-2 bg-blue-400" />
      <motion.div variants={variants} className="h-12 w-2 bg-blue-400" />
      <motion.div variants={variants} className="h-12 w-2 bg-blue-400" />
      <motion.div variants={variants} className="h-12 w-2 bg-blue-400" />
      <motion.div variants={variants} className="h-12 w-2 bg-blue-400" />
    </motion.div>
    </div>

  );
};

export default AnimatedLoader;