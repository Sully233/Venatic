import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";

const DateChooser = () => {
  const [startDate, setStartDate] = useState(new Date());
  const unavailableDates = ["2023-12-25", "2023-01-01"]; // Example unavailable dates. Import from backend in the future.

  // Function to check if a date is available
  const isAvailable = (date) => {
    const formattedDate = moment(date).format("YYYY-MM-DD");
    return !unavailableDates.includes(formattedDate); // Return false if date is unavailable
  };

  // Function to handle date change
  const handleDateChange = (date) => {
    setStartDate(date);
    // Process the date as needed
    console.log("Selected Date: ", moment(date).format("YYYY-MM-DD"));
  };

  return (
    <div>
      <div className="ml-5 mt-5">
        <DatePicker
          selected={startDate}
          onChange={handleDateChange}
          filterDate={isAvailable}
          className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
        />
      </div>
    </div>
  );
};

export default DateChooser;
