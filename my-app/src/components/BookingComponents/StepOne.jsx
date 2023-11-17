import React from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import DatePickerMaterialUI from './DateChooser';

export const StepOne = () => {
  const { control } = useFormContext();

  return (
    <div>
      <Controller
        name="date"
        control={control}
        defaultValue={null}
        rules={{ required: 'Date is required' }} 
        render={({ field: { onChange, value } }) => (
          <DatePickerMaterialUI
            selectedDate={value}
            handleDateChange={onChange}
          />
        )}
      />
    </div>
  );
};

