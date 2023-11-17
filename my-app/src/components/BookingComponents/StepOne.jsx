import { useFormContext } from 'react-hook-form';
import DatePickerMaterialUI from './DateChooser';

export const StepOne = () => {
  const { register } = useFormContext();

  return (
    <div>
      <DatePickerMaterialUI/>
    </div>
  );
};

