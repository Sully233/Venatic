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
      <div>
        <MyPlacesAutocompletePage />
      </div>

      <div className="">
        <div className="mb-4">
          <input
            type="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[^@\s]+@[^@\s]+\.[^@\s]+$/,
                message: "Entered value does not match email format",
              },
            })}
            placeholder="Email"
            className="input input-bordered w-full"
          />
          {errors.email?.type === "required" && (
            <p className="text-red-500 text-xs italic">
              {errors.email.message}
            </p>
          )}
          {errors.email?.type === "pattern" && (
            <p className="text-red-500 text-xs italic">
              {errors.email.message}
            </p>
          )}
        </div>
        <div className="mb-4">
          <input
            {...register("phone", { required: "Phone is required" })}
            placeholder="Phone"
            className="input input-bordered w-full"
          />
          {errors.phone && (
            <p className="text-red-500 text-xs italic">
              {errors.phone.message}
            </p>
          )}
        </div>
        <div className="">
          <NextButton onClick={onNext}>Next</NextButton>
        </div>
      </div>
    </div>
  );
});

export default StepThree;
