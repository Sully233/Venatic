import React, { useState, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { observer } from "mobx-react";
import MyPlacesAutocompletePage from "../DatepickerComponents/searchOptions";
import {addressStore} from "../../stores/AddressStore"
import { motion, AnimatePresence } from 'framer-motion';
import { CubeIcon, InformationCircleIcon } from '@heroicons/react/24/outline'; // Importing a single cube icon
import { ChevronRightIcon, ChevronLeftIcon } from '@heroicons/react/20/solid'; // Import the appropriate icon
import './form.css'

const StepOne = ({ register, errors, onNext, initialSize = 'small', initialDuration = 1 }) => {
    const [selectedSize, setSelectedSize] = useState(addressStore.selectedSize);
    const [duration, setDuration] = useState(addressStore.duration);
    const [popover, setPopover] = useState({ show: false, content: '', position: {} });
    const containerRef = useRef(null);
    
  
    const sizes = [
      { key: 'small', name: 'Small', description: 'Perfect for individual projects.' },
      { key: 'medium', name: 'Medium', description: 'Great for small teams.' },
      { key: 'large', name: 'Large', description: 'Ideal for larger projects.' },
      { key: 'extraLarge', name: 'Extra Large', description: 'Best for enterprise-scale solutions.' },
    ];
  
    const calculatePrice = (sizeKey, dur) => {
      const basePrice = { small: 50, medium: 75, large: 100, extraLarge: 150 };
      return basePrice[sizeKey] * dur;
    };

    const [price, setPrice] = useState(calculatePrice(initialSize, initialDuration));

  
    const selectSize = (sizeKey) => {
      setSelectedSize(sizeKey);
      setPrice(calculatePrice(sizeKey, duration));
      addressStore.setSelectedSize(sizeKey)
      console.log(addressStore)
    };
  
    const handleSelectDuration = (newDuration) => {
      setDuration(newDuration);
      setPrice(calculatePrice(selectedSize, newDuration));
      addressStore.setDuration(newDuration)
    };
  
    const handleShowPopover = (size, event) => {
      const buttonRect = event.target.getBoundingClientRect();
      setPopover({
        show: true,
        content: size.description,
        position: {
          top: buttonRect.bottom + window.scrollY,
          left: buttonRect.left + buttonRect.width / 2 + window.scrollX
        }
      });
    };
  

  

  
    return (
      <div className="space-y-6 relative" ref={containerRef}>
        {popover.show && (
          <div
            className="absolute z-10 p-4 bg-white rounded shadow"
            style={{ top: popover.position.top, left: popover.position.left, transform: 'translateX(-50%)' }}
          >
            <p>{popover.content}</p>
          </div>
        )}
  
        <div className="grid grid-cols-2 gap-4">
          {sizes.map((size) => (
            <div key={size.key}
              className={`p-4 border rounded-lg flex flex-col items-center justify-center cursor-pointer relative ${selectedSize === size.key ? 'border-blue-500' : 'border-gray-300'}`}
              onClick={() => selectSize(size.key)}
            >
              <CubeIcon className="w-10 h-10 mb-2" />
              <span className="text-gray-700">{size.name}</span>

            </div>
          ))}
        </div>
  
        <div className="flex justify-center space-x-2">
          {Array.from({ length: 6 }, (_, i) => i + 1).map((dur) => (
            <button
              key={dur}
              className={`px-4 py-2 rounded-lg text-sm font-medium border-2 ${duration === dur ? 'border-blue-500 bg-blue-500 text-white' : 'border-gray-300 text-gray-700'}`}
              onClick={() => handleSelectDuration(dur)}
            >
              {dur} hr{dur > 1 ? 's' : ''}
            </button>
          ))}
        </div>
  
        <div className="flex justify-center">
          <div className="p-6 border border-gray-200 shadow rounded-lg bg-white">
            <h2 className="text-4xl font-semibold text-gray-800">
              ${price.toFixed(2)}
            </h2>
          </div>
        </div>
  
        {errors.duration && (
          <p className="text-red-500 text-xs italic">{errors.duration.message}</p>
        )}
  
        {/* Right-aligned Next Button */}
        <div className="flex justify-end mt-4">
        <NextButton onClick={onNext}>
          Next
        </NextButton>
        </div>
      </div>
    );
  };
  



const StepTwo = ({onNext, onPrev, register, errors }) => (
    <>
      {/* ... other fields ... */}
      <div className="mb-4">
        <input
          type="email"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[^@\s]+@[^@\s]+\.[^@\s]+$/,
              message: "Entered value does not match email format"
            }
          })}
          placeholder="Email"
          className="input input-bordered w-full"
        />
        {errors.email?.type === "required" && <p className="text-red-500 text-xs italic">{errors.email.message}</p>}
        {errors.email?.type === "pattern" && <p className="text-red-500 text-xs italic">{errors.email.message}</p>}
      </div>
      <div className="mb-4">
      <input
        {...register("phone", { required: "Phone is required" })}
        placeholder="Phone"
        className="input input-bordered w-full"
      />

      {errors.phone && <p className="text-red-500 text-xs italic">{errors.phone.message}</p>}
    </div>
    <button
          type="button"
          className="btn btn-secondary"
          onClick={onPrev}
        >
          Previous
        </button>
    <div>
    <MyPlacesAutocompletePage/>
    </div>
    <div>
    <NextButton onClick={onNext}>
          Next
        </NextButton>
    </div>
    </>
  );


const Confirmation = ({ allFields }) => (
    <div className="space-y-2">
      <h3 className="text-lg font-semibold">Please confirm your details:</h3>
      <p><strong>First Name:</strong> {allFields.firstName}</p>
      <p><strong>Last Name:</strong> {allFields.lastName}</p>
      <p><strong>Email:</strong> {allFields.email}</p>
      <p><strong>Phone:</strong> {allFields.phone}</p>
      <p><strong>Address:</strong> {allFields.eligibilityAddress}</p>
    </div>
  );




  const NextButton = ({ onClick, children }) => (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="inline-flex items-center px-4 py-2 bg-blue-500 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-blue-600 active:bg-blue-700 focus:outline-none focus:border-blue-700 focus:ring focus:ring-blue-200 disabled:opacity-25 transition ease-in-out duration-150"
      onClick={onClick}
    >
      {children}
      <ChevronRightIcon className="ml-2 -mr-1 h-4 w-4" />
    </motion.button>
  );

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

        if (currentStep === 3) {
          handleSubmit(onSubmit)();
          return;
        }
      
        // Determine which fields to validate based on the current step
        let fieldNames;
        if (currentStep === 1) {
          fieldNames = ['firstName', 'lastName'];
        } else if (currentStep === 2) {
          fieldNames = ['email', 'phone'];
        }
      
        // Trigger validation for the current step fields
        const result = await trigger(fieldNames);
      
        if (result) {
          setCurrentStep((prev) => prev + 1);
        }
      };
  
    const prevStep = () => {
      setCurrentStep((prev) => prev - 1);
    };
  
    const allFields = getValues(); // Retrieve all form field values
  
    const totalSteps = 3;
    const progressBarWidth = (currentStep / totalSteps) * 100 + '%';
  
  

    return (
      <>

      <div className="progress-bar-container">
        <div className="progress-bar" style={{ width: progressBarWidth }} />
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="p-4 space-y-4">
        {currentStep === 1 && <StepOne onNext={nextStep} register={register} errors={errors} initialSize={addressStore.selectedSize} initialDuration={addressStore.duration} />}
        {currentStep === 2 && <StepTwo onNext={nextStep} onPrev={prevStep} register={register} errors={errors} />}
        {currentStep === 3 && <Confirmation allFields={allFields} onPrev={prevStep} />}
      </form>
      </>
    );
  });

export default MultiStepForm;