import React from 'react';
import { CheckCircleIcon } from '@heroicons/react/24/solid';
import { motion } from 'framer-motion';
import { useSearchParams } from 'react-router-dom'; 

const PaymentSuccess = () => {


  const [searchParams] = useSearchParams();

  console.log(searchParams.get('sessionId'))


  const iconVariants = {
    hidden: { scale: 0 },
    visible: { scale: 1, transition: { type: 'spring', stiffness: 260, damping: 20 } },
  };

  const textVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.8 } },
  };

  const containerVariants = {
    hidden: { backgroundColor: '#e5e7eb' },
    visible: { backgroundColor: '#ecfdf5', transition: { delay: 0.2, duration: 0.5 } },
  };

  return (
    <motion.div
      className="flex flex-col justify-center items-center min-h-screen px-4 sm:px-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div className="text-green-500" variants={iconVariants}>
        <CheckCircleIcon className="w-16 h-16 sm:w-24 sm:h-24" />
      </motion.div>
      <motion.h1
        className="text-3xl sm:text-4xl font-bold leading-tight text-gray-900 mt-5"
        variants={textVariants}
      >
        Payment Successful!
      </motion.h1>
      <motion.p
        className="text-base sm:text-lg text-gray-600 text-center mt-3"
        variants={textVariants}
      >
        We've received your booking - further confirmation will be sent to you very shortly.
      </motion.p>
    </motion.div>
  );
};

export default PaymentSuccess;
