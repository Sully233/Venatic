import React from 'react';
import { XCircleIcon } from '@heroicons/react/24/solid';
import { motion } from 'framer-motion';
import { useNavigate, useSearchParams } from 'react-router-dom'; 

const PaymentFailure = () => {

    
const [searchParams] = useSearchParams();
console.log(searchParams.get('sessionId'))


  const navigate = useNavigate();

  const navigateHome = () => {
    navigate('/'); 
  };



  const iconVariants = {
    hidden: { rotate: -15 },
    visible: {
      rotate: 0,
      transition: { type: 'spring', stiffness: 260, damping: 20 },
    },
    shake: {
      rotate: [0, -15, 15, -15, 15, 0],
      transition: { type: 'spring', stiffness: 260, damping: 20, times: [0, 0.2, 0.4, 0.6, 0.8, 1] },
    },
  };

  const textVariants = {
    hidden: { y: -30, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.8, delay: 0.1 } },
  };

  const containerVariants = {
    hidden: { backgroundColor: '#f9fafb' },
    visible: { backgroundColor: '#fee2e2', transition: { duration: 0.5 } },
  };

  return (
    <motion.div
      className="flex flex-col justify-center items-center min-h-screen px-4 sm:px-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div className="text-red-500" variants={iconVariants} initial="hidden" animate="visible" whileHover="shake">
        <XCircleIcon className="w-16 h-16 sm:w-24 sm:h-24" />
      </motion.div>
      <motion.h1
        className="text-3xl sm:text-4xl font-bold leading-tight text-gray-900 mt-5"
        variants={textVariants}
      >
        Payment Unsuccessful
      </motion.h1>
      <motion.p
        className="text-base sm:text-lg text-gray-600 text-center mt-3"
        variants={textVariants}
      >
        Unfortunately, there was an issue with your payment. Please try again or contact support.
      </motion.p>

      <motion.button
        className="mt-6 bg-gray-900 text-white py-2 px-4 rounded-lg shadow-lg text-sm sm:text-base hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-opacity-50"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={navigateHome}
      >
        Try Again
      </motion.button>

    </motion.div>
  );
};

export default PaymentFailure;
