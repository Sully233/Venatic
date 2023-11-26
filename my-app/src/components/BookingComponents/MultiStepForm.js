import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

// Define the form steps as individual components for cleanliness
const StepOne = ({ register, errors }) => (
  <>
    <div className="mb-4">
      <input
        {...register("firstName", { required: "First Name is required" })}
        placeholder="First Name"
        className="input input-bordered w-full"
      />
      {errors.firstName && <p className="text-red-500 text-xs italic">{errors.firstName.message}</p>}
    </div>
    <div className="mb-4">
      <input
        {...register("lastName", { required: "Last Name is required" })}
        placeholder="Last Name"
        className="input input-bordered w-full"
      />
      {errors.lastName && <p className="text-red-500 text-xs italic">{errors.lastName.message}</p>}
    </div>
  </>
);

const StepTwo = ({ register, errors }) => (
  <>
    <div className="mb-4">
      <input
        type="email"
        {...register("email", { required: "Email is required", pattern: /^\S+@\S+$/i })}
        placeholder="Email"
        className="input input-bordered w-full"
      />
      {errors.email && <p className="text-red-500 text-xs italic">{errors.email.message}</p>}
    </div>
    <div className="mb-4">
      <input
        {...register("phone", { required: "Phone is required" })}
        placeholder="Phone"
        className="input input-bordered w-full"
      />
      {errors.phone && <p className="text-red-500 text-xs italic">{errors.phone.message}</p>}
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
    </div>
  );

  const MultiStepForm = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const { register, handleSubmit, formState: { errors }, trigger, getValues } = useForm();
  
    const onSubmit = (data) => {
      console.log(data);
      // Handle form submission, e.g., sending data to an API
    };
  
    const nextStep = async () => {
      if (currentStep === 3) {
        handleSubmit(onSubmit)(); // If on confirmation step, submit form
        return;
      }
      // Trigger validation for the current step fields
      const result = await trigger(`step${currentStep}`);
      if (result) setCurrentStep((prev) => prev + 1);
    };
  
    const prevStep = () => {
      setCurrentStep((prev) => prev - 1);
    };
  
    const allFields = getValues(); // Retrieve all form field values
  
    return (
      <form onSubmit={handleSubmit(onSubmit)} className="p-4 space-y-4">
        {currentStep === 1 && <StepOne register={register} errors={errors} />}
        {currentStep === 2 && <StepTwo register={register} errors={errors} />}
        {currentStep === 3 && <Confirmation allFields={allFields} />}
  
        <div className="flex justify-between">
          {currentStep > 1 && (
            <button
              type="button"
              className="btn btn-secondary"
              onClick={prevStep}
            >
              Previous
            </button>
          )}
          {currentStep < 3 && (
            <button
              type="button"
              className="btn btn-primary"
              onClick={nextStep}
            >
              {currentStep === 2 ? 'Confirm' : 'Next'}
            </button>
          )}
          {currentStep === 3 && (
            <button
              type="submit"
              className="btn btn-primary"
            >
              Submit
            </button>
          )}
        </div>
      </form>
    );
  };

export default MultiStepForm;
