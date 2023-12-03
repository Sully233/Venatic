import { React, useState} from "react";
import { motion } from "framer-motion";
import { observer } from "mobx-react";
import { customerDetailsStore } from "../../../stores/CustomerDetailsStore";
import { formStore } from "../../../stores/FormStore";
import "../form.css";

const detailVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const formatTimeSlot = (startTime, duration) => {

  console.log(startTime)
  console.log(duration)

  const [hours, minutes] = startTime.split(':').map(Number);
  const startDate = new Date();
  startDate.setHours(hours, minutes, 0, 0);

  const endDate = new Date(startDate);
  endDate.setHours(endDate.getHours() + duration);


  const formattedStartTime = startDate.toTimeString().substring(0, 5);
  const formattedEndTime = endDate.toTimeString().substring(0, 5);

  return `${formattedStartTime} - ${formattedEndTime}`;
};

const formatDate = (date) => {
  if (!(date instanceof Date)) return 'Date not set';

  const day = date.getDate();
  const month = date.toLocaleString('default', { month: 'long' });
  const year = date.getFullYear();

  return `${day}${getDaySuffix(day)} of ${month} ${year}`;
};

const getDaySuffix = (day) => {
  if (day > 3 && day < 21) return 'th';
  switch (day % 10) {
    case 1:  return "st";
    case 2:  return "nd";
    case 3:  return "rd";
    default: return "th";
  }
}

const Confirmation = observer(() => {


  const formattedDate = formatDate(formStore.date);

  const formattedTime = formatTimeSlot(formStore.chosenAvailibility, formStore.duration);

    

  

  return (
    <motion.div
      className="space-y-4 p-4 border border-gray-300 rounded-lg shadow-md bg-white"
      initial="hidden"
      animate="visible"
      variants={detailVariant}
      transition={{ duration: 0.5 }}
    >
      <h3 className="text-lg font-semibold text-gray-800">
        Please review your details:
      </h3>
      <p className="text-gray-700">
        <strong>Date:</strong> {formattedDate}
      </p>
      <p className="text-gray-700">
        <strong>Time:</strong> {formattedTime}
      </p>
      <p className="text-gray-700">
        <strong>First Name:</strong> {customerDetailsStore.firstName}
      </p>
      <p className="text-gray-700">
        <strong>Last Name:</strong> {customerDetailsStore.lastName}
      </p>
      <p className="text-gray-700">
        <strong>Email:</strong> {customerDetailsStore.email}
      </p>
      <p className="text-gray-700">
        <strong>Phone:</strong> {customerDetailsStore.phoneNumber}
      </p>
      <p className="text-gray-700">
        <strong>Address:</strong> {formStore.address}
      </p>
      <p className="text-gray-700">
        <strong>Price:</strong> ${formStore.price.toFixed(2)}
      </p>
    </motion.div>
  );
});

export default Confirmation;
