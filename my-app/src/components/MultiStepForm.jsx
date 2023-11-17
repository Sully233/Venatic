import React, { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { StepOne } from "./BookingComponents/StepOne";
import { StepTwo } from "./BookingComponents/StepTwo";
import { StepThree } from "./BookingComponents/StepThree";

import "../index.css";

export default function MultiStepForm() {
  const methods = useForm();
  const {
    formState: { isValid },
  } = methods;
  const [step, setStep] = useState(1);

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const renderStep = () => {
    switch (step) {
      case 1:
        return <StepOne />;
      case 2:
        return <StepTwo />;
      case 3:
        return <StepThree />;
      default:
        return null;
    }
  };

  const onSubmit = async (data) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_SERVER}/api/booking/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      if (response.ok) {
        console.log("Form submitted successfully");
      }
    } catch (error) {
      console.error("Submission error:", error);
    }
  };

  return (
    <FormProvider {...methods}>
      <div className="form-container">
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          {renderStep()}
          {step > 1 && (
            <button type="button" onClick={prevStep}>
              Back
            </button>
          )}
          {step < 3 && isValid && (
            <button type="button" onClick={nextStep}>
              Next
            </button>
          )}
          {step === 3 && isValid && <button type="submit">Submit</button>}
        </form>
      </div>
    </FormProvider>
  );
}
