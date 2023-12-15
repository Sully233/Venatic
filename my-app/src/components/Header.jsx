import React, { useEffect, useState } from "react";
import { CheckCircleIcon } from "@heroicons/react/24/solid";
import { motion } from "framer-motion";
import { useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {Helmet} from "react-helmet";

const Header = () => {

  const headerVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: { opacity: 1, y: 0 }
  };
  
  return (
    <motion.header
      initial="hidden"
      animate="visible"
      variants={headerVariants}
      transition={{ duration: 0.5 }}
      className="bg-gray-100 shadow-md flex justify-between items-center p-4"
    >
      {/* Your content here, like a logo or navigation links */}
      <div className="text-lg font-bold">Your Brand</div>
      <nav>
        {/* Navigation items */}
      </nav>
    </motion.header>
  );


};

export default Header;
