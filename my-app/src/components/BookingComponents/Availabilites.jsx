import React, { useState } from "react";
import { observer } from "mobx-react";
import { motion, AnimatePresence } from "framer-motion";
import { formStore } from "../../stores/FormStore";
import AnimatedLoader from "./AnimatedLoader";

const Availabilities = observer(() => {
  const allTimeSlots = [
    "08:00",
    "09:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
    "18:00",
    "19:00",
    "20:00",
  ];

  const addHoursAndFormat = (time, hours) => {
    let [hrs, mins] = time.split(":").map(Number);
    const date = new Date();
    date.setHours(hrs, mins);
    date.setHours(date.getHours() + hours);
    return date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  };

  const formatTimeSlot = (time) => {
    const duration = formStore.duration || 1;
    const endTime = addHoursAndFormat(time, duration);
    return `${time} - ${endTime}`;
  };

  const isTimeSlotAvailable = (startTime, duration) => {
    const startTimeIndex = allTimeSlots.indexOf(startTime);
    if (startTimeIndex === -1) return false;

    const endTimeIndex = startTimeIndex + duration - 1;
    if (endTimeIndex >= allTimeSlots.length) return false;

    for (let i = startTimeIndex; i <= endTimeIndex; i++) {
      if (!formStore.availabilities.includes(allTimeSlots[i])) {
        return false;
      }
    }
    return true;
  };

  // Exclude time slots that end after the last time slot in allTimeSlots
  const validTimeSlots = allTimeSlots.slice(
    0,
    allTimeSlots.length - (formStore.duration - 1)
  );

  const handleTimeClick = (time) => {
    formStore.setChosenAvailability(time);
  };

  const variants = {
    hidden: { opacity: 0, y: 20 },
    visible: (index) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: index * 0.05,
      },
    }),
  };

  const listStyles = {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)", // Two columns of equal width
    gridGap: "10px", // Adjust gap between items as needed
  };

  return (
    <AnimatePresence>
      <ul style={listStyles} className="">
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
              onClick={() =>
                isTimeSlotAvailable(time, formStore.duration) &&
                handleTimeClick(time)
              }
              disabled={!isTimeSlotAvailable(time, formStore.duration)}
              className={`w-full px-4 py-2 text-white rounded-lg shadow transform transition duration-150 ${
                isTimeSlotAvailable(time, formStore.duration)
                  ? formStore.chosenAvailibility === time
                    ? "bg-green-500 hover:bg-green-600"
                    : "bg-blue-500 hover:bg-blue-600 hover:scale-105"
                  : "bg-gray-300 cursor-not-allowed text-sm"
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
