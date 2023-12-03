import { React, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { observer } from "mobx-react";
import { customerDetailsStore } from "../../../stores/CustomerDetailsStore";
import { formStore } from "../../../stores/FormStore";
import "../form.css";
import NextButton from "../Buttons/NextButton";
import AnimatedLoader from "../AnimatedLoader";

const detailVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const formatTimeSlot = (startTime, duration) => {
  const [hours, minutes] = startTime.split(":").map(Number);
  const startDate = new Date();
  startDate.setHours(hours, minutes, 0, 0);

  const endDate = new Date(startDate);
  endDate.setHours(endDate.getHours() + duration);

  const formattedStartTime = startDate.toTimeString().substring(0, 5);
  const formattedEndTime = endDate.toTimeString().substring(0, 5);

  return `${formattedStartTime} - ${formattedEndTime}`;
};

const formatDate = (date) => {
  if (!(date instanceof Date)) return "Date not set";

  const day = date.getDate();
  const month = date.toLocaleString("default", { month: "long" });
  const year = date.getFullYear();

  return `${day}${getDaySuffix(day)} of ${month} ${year}`;
};

const getDaySuffix = (day) => {
  if (day > 3 && day < 21) return "th";
  switch (day % 10) {
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

const Confirmation = observer(() => {
  const formattedDate = formatDate(formStore.date);
  const [isLoading, setIsLoading] = useState(false);

  const formattedTime = formatTimeSlot(
    formStore.chosenAvailibility,
    formStore.duration
  );

  const [checkoutUrl, setCheckoutUrl] = useState("");

  const formatDateForAPI = (date, time, durationHours) => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    const monthPadded = month.toString().padStart(2, "0");
    const dayPadded = day.toString().padStart(2, "0");

    // Construct a UTC date string
    const startTimeString = `${year}-${monthPadded}-${dayPadded}T${time}:00.000Z`;

    const startDateUTC = new Date(startTimeString);

    if (isNaN(startDateUTC.getTime())) {
      throw new Error("Invalid date constructed");
    }

    const endDateUTC = new Date(
      startDateUTC.getTime() + durationHours * 60 * 60 * 1000
    );

    return {
      bookingStartTime: startDateUTC.toISOString(),
      bookingEndTime: endDateUTC.toISOString(),
    };
  };

  const { bookingStartTime, bookingEndTime } = formatDateForAPI(
    formStore.date,
    formStore.chosenAvailibility,
    formStore.duration
  );

  useEffect(() => {
    const postBookingDetails = async () => {
      if (formStore.checkoutURL === null) {
        try {
          setIsLoading(true);
          const response = await fetch(
            `${process.env.REACT_APP_API_SERVER}/api/booking`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                firstName: customerDetailsStore.firstName,
                lastName: customerDetailsStore.lastName,
                contactNumber: customerDetailsStore.phoneNumber,
                email: customerDetailsStore.email,
                bookingStartTime,
                bookingEndTime,
                duration: formStore.duration,
                description: "Service description",
                notes: "Any additional notes",
                selection: formStore.selectedSize,
              }),
            }
          );

          const data = await response.json();
          setCheckoutUrl(data.url);
          formStore.setCheckoutURL(data.url)
          
          setIsLoading(false);
        } catch (error) {
          console.error("Error posting booking details:", error);
        }
      }
      else {
        setCheckoutUrl(formStore.checkoutURL)
      }
    };

    postBookingDetails();
  }, []);

  const handleProceedToPayment = () => {
    console.log(checkoutUrl);
    if (checkoutUrl) {
      window.location.href = checkoutUrl;
    } else {
      console.error("Checkout URL not available");
    }
  };

  if (isLoading) {
    return <AnimatedLoader />;
  }

  return (
    <div>
      <motion.div
        className="space-y-4 p-4   "
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

      <NextButton onClick={handleProceedToPayment} className="py-4">
        Checkout
      </NextButton>
    </div>
  );
});

export default Confirmation;
