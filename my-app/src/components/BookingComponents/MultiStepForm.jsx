import React, { useState, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { observer } from "mobx-react";
import MyPlacesAutocompletePage from "../DatepickerComponents/searchOptions";
import {addressStore} from "../../stores/AddressStore"
import { motion, AnimatePresence } from 'framer-motion';
import { CubeIcon, InformationCircleIcon } from '@heroicons/react/24/outline'; // Importing a single cube icon
import { ChevronRightIcon, ChevronLeftIcon } from '@heroicons/react/20/solid'; // Import the appropriate icon
import './form.css'
import { DayPicker } from 'react-day-picker';
import Availabilities from './Availabilites';
import AnimatedLoader from './AnimatedLoader';
import StepTwo from './Steps/StepTwo';
import StepOne from './Steps/StepOne';
import StepThree from './Steps/StepThree';
import Confirmation from './Steps/Confirmation';
import PreviousButton from './Buttons/PreviousButton';







  const MultiStepForm = observer(() => {
    const [currentStep, setCurrentStep] = useState(1);
    const { register, handleSubmit, setValue, formState: { errors }, trigger, getValues } = useForm();
  

    useEffect(() => {
        register("address", { required: "Address is required" });
      }, [register]);
    
  // Register the address field in the form
        useEffect(() => {
            register("eligibilityAddress", { required: "Address is required" });
        }, [register]);

        // Sync the address from the store to the form
        useEffect(() => {
            setValue("eligibilityAddress", addressStore.address);
        }, [addressStore.address, setValue]);


    const onSubmit = (data) => {
      console.log(data);
      // Handle form submission, e.g., sending data to an API
    };
  
    const nextStep = async () => {

        if (currentStep === 1) {
            // If we're on the first step, only proceed if the postcode is eligible
            console.log(addressStore.postcodeEligible)

        }
      
        // Determine which fields to validate based on the current step
        let fieldNames;
        if (currentStep === 1) {
          fieldNames = ['firstName', 'lastName'];
        } else if (currentStep === 2) {
          fieldNames = ['email', 'phone'];
        }
        else if (currentStep==3){
          fieldNames = ['']
        }
      
        const result = await trigger(fieldNames);
      
        if (result) {
          console.log('fired')
          setCurrentStep((prev) => prev + 1);
        }
      };
  
    const prevStep = () => {
      setCurrentStep((prev) => prev - 1);
    };
  
    const allFields = getValues(); // Retrieve all form field values
  
    const totalSteps = 4;
    const progressBarWidth = (currentStep / totalSteps) * 100 + '%';
  
  

    return (
      <>

<div className="flex items-center space-x-4">
        {currentStep > 1 && (
          <PreviousButton onClick={prevStep}>
            Previous
          </PreviousButton>
        )}

        <div className="progress-bar-container flex-1">
          <div className="progress-bar" style={{ width: progressBarWidth }} />
        </div>
  </div>

      <form onSubmit={handleSubmit(onSubmit)} className="p-4 space-y-4">
        {currentStep === 1 && <StepOne onNext={nextStep} register={register} errors={errors} initialSize={addressStore.selectedSize} initialDuration={addressStore.duration} />}
        {currentStep === 2 && <StepTwo onNext={nextStep} onPrev={prevStep} register={register} errors={errors} />}
        {currentStep === 3 && <StepThree onNext={nextStep} onPrev={prevStep} register={register} errors={errors} />}
        {currentStep === 4 && <Confirmation allFields={allFields} onPrev={prevStep} />}
      </form>
      </>
    );
  });

export default MultiStepForm;
