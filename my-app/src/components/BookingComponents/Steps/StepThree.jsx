import React, { useState } from "react";
import { observer } from "mobx-react";
import MyPlacesAutocompletePage from "../../addressSearchComponents/searchOptions";
import { formStore } from "../../../stores/FormStore";
import AnimatedLoader from "../AnimatedLoader";
import NextButton from "../Buttons/NextButton";
import { XCircleIcon, CheckCircleIcon } from "@heroicons/react/24/solid";
import { customerDetailsStore } from "../../../stores/CustomerDetailsStore";

const StepThree = observer(({ onNext }) => {
  const [isLoading, setIsLoading] = useState(false);

  if (isLoading) {
    return <AnimatedLoader />;
  }

  const eligibilityMessage = () => {
    switch (formStore.postcodeEligible) {
      case "Eligible":
        return (
          <div className="text-center py-2">
            <CheckCircleIcon className="h-10 w-10 mx-auto text-green-600" />
            <span className="block text-green-500">Great, your address is eligible.</span>
          </div>
        );
      case "Not Eligible":
        return (
          <div className="text-center py-2">
            <XCircleIcon className="h-10 w-10 mx-auto text-red-500" />
            <span className="block text-red-500">Sorry, we don't currently service this location, but we're always expanding our reach. Check back soon.</span>
          </div>
        );
      default:
        return null;
    }
  };

  const customerDetailsForm = () => (
    <div>

      <div className="text-lg font-semibold text-gray-700 mb-4 ">
        <p>Please enter your details:</p>
      </div>
    
    <div className="space-y-4">
      <input
        type="text"
        placeholder="First Name"
        className="w-full p-2 border border-gray-300 rounded"
      />
      <input
        type="text"
        placeholder="Last Name"
        className="w-full p-2 border border-gray-300 rounded"
      />
      <input
        type="email"
        placeholder="Email"
        className="w-full p-2 border border-gray-300 rounded"
      />
      <input
        type="tel"
        placeholder="Phone Number"
        className="w-full p-2 border border-gray-300 rounded"
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
          <NextButton onClick={onNext}>Review</NextButton>
        </div>
      )}
    </div>
  );
});

export default StepThree;
