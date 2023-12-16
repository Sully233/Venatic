import React, { useState } from "react";
import { Link } from "react-router-dom";
import logoImage from "../../images/logo0.png";
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { motion, AnimatePresence } from 'framer-motion';

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Define the variants for the menu animation
  const menuVariants = {
    open: { opacity: 1, x: 0 },
    closed: { opacity: 0, x: "-100%" }
  };

  return (
    <nav className="flex flex-col md:flex-row justify-between items-center p-4 bg-white ">
      <div className="flex justify-between items-center w-full md:w-auto">
        <div className="logo flex items-center">
          <img src={logoImage} alt="Venatic Logo" className="w-12 h-12 md:w-16 md:h-16" />
          <Link to="/" className="text-xl font-bold px-1">Venatic</Link>
        </div>
        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <XMarkIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6" />}
        </button>
      </div>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="nav-links-container md:flex mt-4 md:mt-0"
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
            transition={{ duration: 0.2 }}
          >
            <div className="nav-links flex flex-col md:flex-row gap-4">
              <Link to="/" className="hover:text-blue-500 transition duration-300">About Us</Link>
              <Link to="/" className="hover:text-blue-500 transition duration-300">Services</Link>
              <Link to="/" className="hover:text-blue-500 transition duration-300">Contact</Link>
              <Link to="/" className="hover:text-blue-500 transition duration-300">Booking</Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default NavBar;
