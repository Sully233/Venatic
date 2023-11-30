import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRightIcon, ChevronLeftIcon } from '@heroicons/react/20/solid'; // Import the appropriate icon
import '../form.css'



const PreviousButton = ({ onClick }) => (
    <ChevronLeftIcon
        className="h-6 w-6 text-gray-500 hover:text-gray-700 cursor-pointer"
        onClick={onClick}
    />
);


export default PreviousButton;
