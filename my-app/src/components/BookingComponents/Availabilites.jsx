import React, { useState } from 'react';
import { observer } from "mobx-react";
import { motion, AnimatePresence } from 'framer-motion';
import { addressStore } from "../../stores/AddressStore";

const Availabilities = observer(() => {


  const [selectedTime, setSelectedTime] = useState(() => {

    return addressStore.chosenAvailibility || null;

    });
  
  

  const allTimeSlots = [
    "08:00", "09:00", "10:00", "11:00", "12:00",
    "13:00", "14:00", "15:00", "16:00", "17:00",
    "18:00", "19:00", "20:00"
  ];

  const addHoursAndFormat = (time, hours) => {
    let [hrs, mins] = time.split(':').map(Number);
    const date = new Date();
    date.setHours(hrs, mins);
    date.setHours(date.getHours() + hours);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
  };

  const formatTimeSlot = (time) => {
    const duration = addressStore.duration || 1;
    const endTime = addHoursAndFormat(time, duration);
    return `${time} - ${endTime}`;
  };

  const isTimeSlotAvailable = (startTime, duration) => {
    const startTimeIndex = allTimeSlots.indexOf(startTime);
    if (startTimeIndex === -1) return false;

    const endTimeIndex = startTimeIndex + duration - 1;
    if (endTimeIndex >= allTimeSlots.length) return false;

    for (let i = startTimeIndex; i <= endTimeIndex; i++) {
      if (!addressStore.availabilities.includes(allTimeSlots[i])) {
        return false;
      }
    }
    return true;
  };

  // Exclude time slots that end after the last time slot in allTimeSlots
  const validTimeSlots = allTimeSlots.slice(0, allTimeSlots.length - (addressStore.duration - 1));

  const handleTimeClick = (time) => {
    setSelectedTime(time);
    addressStore.setChosenAvailability(time)
  };

  const variants = {
    hidden: { opacity: 0, y: 20 },
    visible: (index) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: index * 0.05
      }
    }),
  };

  return (
    <AnimatePresence>
      <ul className="space-y-2">
        {validTimeSlots.map((time, index) => (
          <motion.li
            key={time}
            custom={index}
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={variants}
            className="list-none"
          >
            <button
              onClick={() => isTimeSlotAvailable(time, addressStore.duration) && handleTimeClick(time)}
              disabled={!isTimeSlotAvailable(time, addressStore.duration)}
              className={`w-full px-4 py-2 text-white rounded-lg shadow transform transition duration-150 ${
                isTimeSlotAvailable(time, addressStore.duration) ?
                (selectedTime === time
                  ? 'bg-green-500 hover:bg-green-600' // Selected time slot
                  : 'bg-blue-500 hover:bg-blue-600 hover:scale-105') // Available time slot
                  : 'bg-gray-300 cursor-not-allowed' // Unavailable time slot
              }`}
            >
              {formatTimeSlot(time)}
            </button>
          </motion.li>
        ))}
      </ul>
    </AnimatePresence>
  );
});

export default Availabilities;
