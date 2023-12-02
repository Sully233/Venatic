import React, { useState } from "react";
import { observer } from "mobx-react";
import MyPlacesAutocompletePage from "../../addressSearchComponents/searchOptions";
import { formStore } from "../../../stores/FormStore";
import AnimatedLoader from "../AnimatedLoader";
import NextButton from "../Buttons/NextButton";
import { XCircleIcon, CheckCircleIcon } from "@heroicons/react/24/solid";
import { customerDetailsStore } from "../../../stores/CustomerDetailsStore";
import { z } from "zod";
import TextField from '@mui/material/TextField';


const StepThree = observer(({ onNext }) => {
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    firstName: customerDetailsStore.firstName,
    lastName: customerDetailsStore.lastName,
    email: customerDetailsStore.email,
    phoneNumber: customerDetailsStore.phoneNumber,
  });
  const [formErrors, setFormErrors] = useState({});

  const customerDetailsSchema = z.object({
    firstName: z.string().min(1, "First Name is required"),
    lastName: z.string().min(1, "Last Name is required"),
    email: z.string().email("Invalid email address"),
    phoneNumber: z
      .string()
      .regex(/^04\d{8}$/, "Phone Number should start with '04' and be exactly 10 digits long"),
  });

  const handleInputChange = (e) => {
    const updatedValue = e.target.value;
    setFormData({ ...formData, [e.target.name]: updatedValue });

    if (e.target.name === "firstName") {
        customerDetailsStore.setFirstName(updatedValue);
    } else if (e.target.name === "lastName") {
        customerDetailsStore.setLastName(updatedValue);
    } else if (e.target.name === "email") {
        customerDetailsStore.setEmail(updatedValue);
    } else if (e.target.name === "phoneNumber") {
        customerDetailsStore.setPhoneNumber(updatedValue);
    }

  };

  const handleNextClick = () => {
    try {
      customerDetailsSchema.parse(formData);
      setFormErrors({});
      customerDetailsStore.setFirstName(formData.firstName)
      customerDetailsStore.setLastName(formData.lastName)
      customerDetailsStore.setEmail(formData.email)
      customerDetailsStore.setPhoneNumber(formData.phoneNumber)


      onNext(); // Proceed if validation is successful
    } catch (error) {
      if (error instanceof z.ZodError) {
        setFormErrors(error.flatten().fieldErrors);
      }
    }
  };

  if (isLoading) {
    return <AnimatedLoader />;
  }

  const eligibilityMessage = () => {
    switch (formStore.postcodeEligible) {
      case "Eligible":
        return (
          <div className="text-center py-2">
            <CheckCircleIcon className="h-10 w-10 mx-auto text-green-600" />
            <span className="block text-green-500">
              Great, your address is eligible.
            </span>
          </div>
        );
      case "Not Eligible":
        return (
          <div className="text-center py-2">
            <XCircleIcon className="h-10 w-10 mx-auto text-red-500" />
            <span className="block text-red-500">
              Sorry, we don't currently service this location, but we're always
              expanding our reach. Check back soon.
            </span>
          </div>
        );
      default:
        return null;
    }
  };

  const customerDetailsForm = () => (
    <div>
      <div className="text-lg font-semibold text-gray-700 mb-4">
        <p>Please enter your details:</p>
      </div>
  
      <div className="space-y-4">
        <TextField
          label="First Name"
          variant="outlined"
          name="firstName"
          value={customerDetailsStore.firstName}
          onChange={handleInputChange}
          error={!!formErrors.firstName}
          helperText={formErrors.firstName}
          fullWidth
        />
  
        <TextField
          label="Last Name"
          variant="outlined"
          name="lastName"
          value={customerDetailsStore.lastName}
          onChange={handleInputChange}
          error={!!formErrors.lastName}
          helperText={formErrors.lastName}
          fullWidth
        />
  
        <TextField
          label="Email"
          variant="outlined"
          type="email"
          name="email"
          value={customerDetailsStore.email}
          onChange={handleInputChange}
          error={!!formErrors.email}
          helperText={formErrors.email}
          fullWidth
        />
  
        <TextField
          label="Phone Number"
          variant="outlined"
          type="tel"
          name="phoneNumber"
          value={customerDetailsStore.phoneNumber}
          onChange={handleInputChange}
          error={!!formErrors.phoneNumber}
          helperText={formErrors.phoneNumber}
          fullWidth
        />
      </div>
    </div>
  );

  return (
    <div>
      <div className="text-lg font-semibold text-gray-700 mb-4">
        <p>Please enter your address:</p>
      </div>
      <div>
        <MyPlacesAutocompletePage />
      </div>
      {eligibilityMessage()}

      <div className="py-4">
        {formStore.postcodeEligible === "Eligible" && customerDetailsForm()}
      </div>
      {formStore.postcodeEligible === "Eligible" && (
        <div className="py-4">
          <NextButton onClick={handleNextClick}>Review</NextButton>
        </div>
      )}
    </div>
  );
});

export default StepThree;
