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
import NextButton from '../Buttons/NextButton';




const StepThree = observer(({onNext, onPrev, register, errors }) => {

    const [availableDates, setAvailableDates] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [availableTimes, setAvailableTimes] = useState([]);
    const [clickedDate, setClickedDate] = useState(null)
  
  
  
    useEffect(() => {
  
  
  
      const fetchAvailableDates = async () => {
        
  
        setIsLoading(true); // Start loading
         
        try {
  
          const response = await fetch(`${process.env.REACT_APP_API_SERVER}/api/availabilities/calendar`);
          
          const data = await response.json();
          const dates = data.openDates.map(dateStr => new Date(dateStr));
          setAvailableDates(dates);
          if (dates.length > 0){
            addressStore.setDatesLoaded(true)
          }
  
          const currentDate = new Date();
          
          const soonestAvailableDate = dates
            .filter(date => date >= currentDate)
            .sort((a, b) => a - b)[0];
          setClickedDate(addressStore.date || soonestAvailableDate || null);  
          fetchAvailableTimes(addressStore.date || soonestAvailableDate)
  
        } catch (error) {
          console.error('Error fetching available dates:', error);
          // You can also set an error state here to show an error message
        }
        setIsLoading(false); // Stop loading
      };
  
      fetchAvailableDates();
    }, []);
  
      const fetchAvailableTimes = async (date) => {
  
        setIsLoading(true)
        try {
          const dateString = [
            date.getFullYear(),
            ('0' + (date.getMonth() + 1)).slice(-2), // Ensures two digits for month
            ('0' + date.getDate()).slice(-2)          // Ensures two digits for day
          ].join('-');
          
          const response = await fetch(`${process.env.REACT_APP_API_SERVER}/api/availabilities?date=${dateString}`);
          const times = await response.json();
          setAvailableTimes(times); // Set the available times for the selected date
          addressStore.setavailabilities(times)
  
        } catch (error) {
          console.error('Error fetching available times:', error);
  
        }
        setIsLoading(false)
      };
  
      
  
      // Define styles for available and clicked dates
      const modifiersStyles = {
        available: {
          color: 'black',
          backgroundColor: '#d8e6ff',
        },
        clicked: {
          color: 'white',
          backgroundColor: '#4a90e2',
        }
      };
  
      // Define modifiers based on the state
      const modifiers = {
        available: availableDates,
        clicked: clickedDate,
      };
  
      const isSameDay = (d1, d2) => {
        return d1.getFullYear() === d2.getFullYear() &&
               d1.getMonth() === d2.getMonth() &&
               d1.getDate() === d2.getDate();
      };
  
      const handleDayClick = (day, { selected }) => {
        // Check if the clicked day is in the list of available dates
        const isAvailable = availableDates.some(availableDay => 
          isSameDay(availableDay, day));
        
        // If the day is not available, do nothing
        if (!isAvailable) {
          return;
        }
      
        // If the day is available and not currently selected, update the state
        if (!selected) {
          setClickedDate(day);
          fetchAvailableTimes(day);
          addressStore.setDate(day)
          addressStore.setChosenAvailability(null)
        }  
      };
  
  
  
      const currentDate = new Date();
      const currentYear = new Date().getFullYear();
      const currentMonth = currentDate.getMonth();
  
      const soonestAvailableDate = availableDates
      .filter(date => date >= currentDate)
      .sort((a, b) => a - b)[0]; // Get the earliest date
  
      if (isLoading) {
        return <AnimatedLoader></AnimatedLoader> 
      }
  
  
      return (
  
      <>
        <div className="px-4 sm:px-6 lg:px-8"> {/* Added responsive padding */}
  
      <div className="mb-4">
        <input
          type="email"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[^@\s]+@[^@\s]+\.[^@\s]+$/,
              message: "Entered value does not match email format"
            }
          })}
          placeholder="Email"
          className="input input-bordered w-full"
        />
        {errors.email?.type === "required" && <p className="text-red-500 text-xs italic">{errors.email.message}</p>}
        {errors.email?.type === "pattern" && <p className="text-red-500 text-xs italic">{errors.email.message}</p>}
      </div>
      <div className="mb-4">
        <input
          {...register("phone", { required: "Phone is required" })}
          placeholder="Phone"
          className="input input-bordered w-full"
        />
        {errors.phone && <p className="text-red-500 text-xs italic">{errors.phone.message}</p>}
      </div>
      <div>
        <MyPlacesAutocompletePage/>
      </div>
      
  
      
      <div className='p-6 float-right'>
        <NextButton onClick={onNext}>
          Next
        </NextButton>
      </div>
    </div>
      </>
    )
    
  });

  
export default StepThree;