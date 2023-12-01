import React, { useState, useEffect, useRef } from "react";
import { observer } from "mobx-react";
import { formStore } from "../../../stores/FormStore";
import { motion, AnimatePresence } from "framer-motion";
import "../form.css";
import { DayPicker } from "react-day-picker";
import Availabilities from "../Availabilites";
import AnimatedLoader from "../AnimatedLoader";
import NextButton from "../Buttons/NextButton";

const StepTwo = ({
  register,
  errors,
  onNext,
  initialSize = "small",
  initialDuration = 1,
}) => {
  const [availableDates, setAvailableDates] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [availableTimes, setAvailableTimes] = useState([]);
  const [clickedDate, setClickedDate] = useState(null);

  useEffect(() => {
    const fetchAvailableDates = async () => {
      setIsLoading(true); // Start loading

      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_SERVER}/api/availabilities/calendar?duration=${formStore.duration}`
        );

        const data = await response.json();
        const dates = data.openDates.map((dateStr) => new Date(dateStr));
        setAvailableDates(dates);
        if (dates.length > 0) {
          formStore.setDatesLoaded(true);
        }

        const currentDate = new Date();

        const soonestAvailableDate = dates
          .filter((date) => date >= currentDate)
          .sort((a, b) => a - b)[0];
        setClickedDate(formStore.date || soonestAvailableDate || null);
        fetchAvailableTimes(formStore.date || soonestAvailableDate);
      } catch (error) {
        console.error("Error fetching available dates:", error);
      }
      setIsLoading(false);
    };

    fetchAvailableDates();
  }, []);

  const fetchAvailableTimes = async (date) => {
    setIsLoading(true);
    try {
      const dateString = [
        date.getFullYear(),
        ("0" + (date.getMonth() + 1)).slice(-2), // Ensures two digits for month
        ("0" + date.getDate()).slice(-2), // Ensures two digits for day
      ].join("-");

      const response = await fetch(
        `${process.env.REACT_APP_API_SERVER}/api/availabilities?date=${dateString}`
      );
      const times = await response.json();
      setAvailableTimes(times); // Set the available times for the selected date
      formStore.setavailabilities(times);
    } catch (error) {
      console.error("Error fetching available times:", error);
    }
    setIsLoading(false);
  };

  // Define styles for available and clicked dates
  const modifiersStyles = {
    available: {
      color: "black",
      backgroundColor: "#d8e6ff",
    },
    clicked: {
      color: "white",
      backgroundColor: "#4a90e2",
    },
  };

  // Define modifiers based on the state
  const modifiers = {
    available: availableDates,
    clicked: clickedDate,
  };

  const isSameDay = (d1, d2) => {
    return (
      d1.getFullYear() === d2.getFullYear() &&
      d1.getMonth() === d2.getMonth() &&
      d1.getDate() === d2.getDate()
    );
  };

  const handleDayClick = (day, { selected }) => {
    // Check if the clicked day is in the list of available dates
    const isAvailable = availableDates.some((availableDay) =>
      isSameDay(availableDay, day)
    );

    // If the day is not available, do nothing
    if (!isAvailable) {
      return;
    }

    // If the day is available and not currently selected, update the state
    if (!selected) {
      setClickedDate(day);
      fetchAvailableTimes(day);
      formStore.setDate(day);
      formStore.setChosenAvailability(null);
    }
  };

  const currentDate = new Date();
  const currentYear = new Date().getFullYear();
  const currentMonth = currentDate.getMonth();

  const soonestAvailableDate = availableDates
    .filter((date) => date >= currentDate)
    .sort((a, b) => a - b)[0]; // Get the earliest date

  if (isLoading) {
    return <AnimatedLoader></AnimatedLoader>;
  }

  const formatDate = (date) => {
    if (!date) return null;
    const dayNames = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const dayName = dayNames[date.getDay()];
    const dateNumber = date.getDate();
    const monthName = monthNames[date.getMonth()];
    const year = date.getFullYear();
    const suffix = numberSuffix(dateNumber);

    return (
      <div>
        Choose a timeslot:
        <br />
        Availabilties for {dayName} the {dateNumber}
        <span className="date-suffix">{suffix}</span> of {monthName} {year}
      </div>
    );
  };

  // Function to get the correct suffix for the date number
  const numberSuffix = (dateNumber) => {
    if (dateNumber > 3 && dateNumber < 21) return "th"; // handles 4th to 20th
    switch (dateNumber % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  };

  return (
    <div>
      <h2 className="text-lg font-semibold text-gray-700 mb-4">
        Choose a Date
      </h2>
      <DayPicker
        mode="single"
        selected={clickedDate}
        onDayClick={handleDayClick}
        modifiers={modifiers}
        modifiersStyles={modifiersStyles}
        fromYear={currentYear}
        toYear={currentYear + 1}
        defaultMonth={
          clickedDate ||
          soonestAvailableDate ||
          new Date(currentYear, currentMonth)
        }
        numberOfMonths={1}
        fromMonth={soonestAvailableDate}
        className="mb-4"
      />
      <h2 className="text-lg font-semibold text-gray-700 mb-4">
        {formatDate(clickedDate)}
      </h2>
      <Availabilities />

      <div className="p-6 float-right">
        <NextButton onClick={onNext}>Next</NextButton>
      </div>
    </div>
  );
};

export default StepTwo;
