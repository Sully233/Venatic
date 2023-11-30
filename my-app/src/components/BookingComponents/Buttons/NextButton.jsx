import React, { useState, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { observer } from "mobx-react";
import MyPlacesAutocompletePage from "../../DatepickerComponents/searchOptions"
import {addressStore} from "../../../stores/AddressStore"

import { motion, AnimatePresence } from 'framer-motion';
import { CubeIcon, InformationCircleIcon } from '@heroicons/react/24/outline'; // Importing a single cube icon
import { ChevronRightIcon, ChevronLeftIcon } from '@heroicons/react/20/solid'; // Import the appropriate icon
import '../form.css'
import { DayPicker } from 'react-day-picker';
import Availabilities from '../Availabilites';
import AnimatedLoader from '../AnimatedLoader';


const NextButton = ({ onClick, children }) => (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="inline-flex items-center px-4 py-2 bg-blue-500 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-blue-600 active:bg-blue-700 focus:outline-none focus:border-blue-700 focus:ring focus:ring-blue-200 disabled:opacity-25 transition ease-in-out duration-150"
      onClick={onClick}
    >
      {children}
      <ChevronRightIcon className="ml-2 -mr-1 h-4 w-4" />
    </motion.button>
  );

export default NextButton;