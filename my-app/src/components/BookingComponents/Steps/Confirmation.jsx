
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




const Confirmation = observer((allFields) => {


    return (

      <div className="space-y-2">
      <h3 className="text-lg font-semibold">Please confirm your details:</h3>
      <p><strong>First Name:</strong> {allFields.firstName}</p>
      <p><strong>Last Name:</strong> {allFields.lastName}</p>
      <p><strong>Email:</strong> {allFields.email}</p>
      <p><strong>Phone:</strong> {allFields.phone}</p>
      <p><strong>Address:</strong> {addressStore.address}</p>
    </div>    

    );
  });

export default Confirmation;