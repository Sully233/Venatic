import { motion } from 'framer-motion';

const AnimatedLoader = () => {
  const spinTransition = {
    loop: Infinity,
    ease: "linear",
    duration: 1,
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <motion.span
        className="inline-block w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full"
        animate={{ rotate: 360 }}
        transition={spinTransition}
      />
    </div>
  );
};

export default AnimatedLoader;