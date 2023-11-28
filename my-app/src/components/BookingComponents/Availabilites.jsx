import React, { useState, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { observer } from "mobx-react";
import MyPlacesAutocompletePage from "../DatepickerComponents/searchOptions";
import {addressStore} from "../../stores/AddressStore"
import { motion, AnimatePresence } from 'framer-motion';
import { CubeIcon, InformationCircleIcon } from '@heroicons/react/24/outline'; // Importing a single cube icon
import { ChevronRightIcon, ChevronLeftIcon } from '@heroicons/react/20/solid'; // Import the appropriate icon
import './form.css'
import { DayPicker } from 'react-day-picker';



const Availabilities = observer(() => {



    return (
        <ul>
        {addressStore.availabilties.map((time, index) => (
            <li key={index}>{time}</li>
        ))}
        </ul>
    );
    

  });




export default Availabilities;
