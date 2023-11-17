import { useFormContext } from "react-hook-form";
import {
  MenuItem,
  Select,
  InputLabel,
} from "@mui/material";

export const StepTwo = () => {
  const { register } = useFormContext();

  // TEMPORARY Generate time options for the dropdown (e.g., 9:00, 10:00, ..., 17:00) TEMPORARY
  const timeOptions = Array.from({ length: 9 }, (_, i) => `${9 + i}:00`);

  return (
    <div>
     <InputLabel htmlFor="startTime">Start Time</InputLabel>
      <Select
        {...register("startTime")}
        defaultValue=""
        fullWidth
      >
        {timeOptions.map((time) => (
          <MenuItem key={time} value={time}>
            {time}
          </MenuItem>
        ))}
      </Select>
    </div>
  );
};
