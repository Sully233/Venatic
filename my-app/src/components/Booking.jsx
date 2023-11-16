import React, { useState } from "react";
import {
  TextField,
  Button,
  Container,
  MenuItem,
  Select,
  InputLabel,
} from "@mui/material";
import DateChooser from "./BookingComponents/DateChooser";

const Booking = () => {
  const [formData, setFormData] = useState({
    bookingDate: new Date(),
    startTime: "",
    endTime: "",
    customer: {
      firstName: "",
      lastName: "",
      contactNumber: "",
      email: "",
    },
    notes: "",
  });

  // Function to handle changes in text fields and select dropdowns
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "startTime" || name === "endTime") {
      setFormData({ ...formData, [name]: value });
    } else if (
      ["firstName", "lastName", "contactNumber", "email"].includes(name)
    ) {
      setFormData({
        ...formData,
        customer: {
          ...formData.customer,
          [name]: value,
        },
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // Function to send data to backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(JSON.stringify(formData, null, 2));
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_SERVER}/api/booking/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    }
  };

  // TEMPORARY Generate time options for the dropdown (e.g., 9:00, 10:00, ..., 17:00) TEMPORARY
  const timeOptions = Array.from({ length: 9 }, (_, i) => `${9 + i}:00`);

  return (
    <Container>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-4">
          {/* Date Picker */}
          <div>
            <DateChooser />
          </div>
          {/* Time Selectors */}
          <div>
            <InputLabel>Start Time</InputLabel>
            <Select
              name="startTime"
              value={formData.startTime}
              onChange={handleChange}
              fullWidth
            >
              {timeOptions.map((time) => (
                <MenuItem key={time} value={time}>
                  {time}
                </MenuItem>
              ))}
            </Select>
          </div>
          <div>
            <InputLabel>End Time</InputLabel>
            <Select
              name="endTime"
              value={formData.endTime}
              onChange={handleChange}
              fullWidth
            >
              {timeOptions.map((time) => (
                <MenuItem key={time} value={time}>
                  {time}
                </MenuItem>
              ))}
            </Select>
          </div>
          {/* Customer Details */}
          {/* Customer First Name */}
          <div>
            <TextField
              label="First Name"
              name="firstName"
              value={formData.customer.firstName}
              onChange={handleChange}
              fullWidth
            />
          </div>
          {/* Customer Last Name */}
          <div>
            <TextField
              label="Last Name"
              name="lastName"
              value={formData.customer.lastName}
              onChange={handleChange}
              fullWidth
            />
          </div>
          {/* Contact Number */}
          <div>
            <TextField
              label="Contact Number"
              name="contactNumber"
              value={formData.customer.contactNumber}
              onChange={handleChange}
              fullWidth
            />
          </div>
          {/* Email */}
          <div>
            <TextField
              label="Email"
              name="email"
              value={formData.customer.email}
              onChange={handleChange}
              fullWidth
            />
          </div>
          {/* Notes */}
          <div>
            <TextField
              label="Notes"
              name="notes"
              multiline
              rows={4}
              value={formData.notes}
              onChange={handleChange}
              fullWidth
            />
          </div>
          {/* Submit Button */}
          <div>
            <Button variant="contained" color="primary" type="submit">
              Submit Booking
            </Button>
          </div>
        </div>
      </form>
    </Container>
  );
};

export default Booking;
