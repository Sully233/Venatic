import React from "react";
import DateChooser from "./BookingComponents/DateChooser"; 

const Booking = () => {
  return ( 
    <div>
      <h1 className="text-4xl font-bold leading-tight text-gray-900 ml-5 mt-5">
        Booking Page
      </h1>
      <DateChooser /> 
    </div>
  );
};

export default Booking;
