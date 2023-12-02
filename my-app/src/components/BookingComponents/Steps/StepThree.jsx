import React, { useState, useEffect, useRef } from "react";
import { observer } from "mobx-react";
import MyPlacesAutocompletePage from "../../addressSearchComponents/searchOptions";
import { formStore } from "../../../stores/FormStore";
import { motion, AnimatePresence } from "framer-motion";
import "../form.css";
import AnimatedLoader from "../AnimatedLoader";
import NextButton from "../Buttons/NextButton";

const StepThree = observer(({ onNext, onPrev, register, errors }) => {
  const [isLoading, setIsLoading] = useState(false);

  if (isLoading) {
    return <AnimatedLoader></AnimatedLoader>;
  }

  return (
    <div>
      <div className="text-lg font-semibold text-gray-700 mb-4">
        <p>Please enter your address:</p>
      </div>
      <div>
        <MyPlacesAutocompletePage />
      </div>

      {formStore.postcodeEligible === "Eligible" && (
        <div className="py-4 ">
          <NextButton classname="" onClick={onNext}>
            Review
          </NextButton>
        </div>
      )}
    </div>
  );
});

export default StepThree;
