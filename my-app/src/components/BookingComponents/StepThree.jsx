import { useFormContext } from "react-hook-form";
import { TextField } from "@mui/material";

export const StepThree = () => {
  const { register } = useFormContext();

  return (
    <div>
      {/* Customer First Name */}
      <div>
        <TextField
          label="First Name"
          name="firstName"
          {...register('customer.firstName', { required: true })}
          fullWidth
        />
      </div>
      {/* Customer Last Name */}
      <div>
        <TextField
          label="Last Name"
          name="lastName"
          {...register('customer.lastName', { required: true })}
          fullWidth
        />
      </div>
      {/* Contact Number */}
      <div>
        <TextField
          label="Contact Number"
          name="contactNumber"
          {...register('customer.contactNumber', { required: true })}
          fullWidth
        />
      </div>
      {/* Email */}
      <div>
        <TextField
          label="Email"
          name="email"
          {...register('customer.email')}
          fullWidth
        />
      </div>
      {/* Notes */}
      <div>
        <TextField
          label="Notes"
          name="notes"
          multiline
          rows={4}
          {...register('customer.notes')}
          fullWidth
        />
      </div>
    </div>
  );
};
