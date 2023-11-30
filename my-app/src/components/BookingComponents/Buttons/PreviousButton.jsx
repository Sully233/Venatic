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



const PreviousButton = ({ onClick }) => (
    <ChevronLeftIcon 
      className="h-6 w-6 text-gray-500 hover:text-gray-700 cursor-pointer"
      onClick={onClick} 
    />
  );

  export default PreviousButton;
