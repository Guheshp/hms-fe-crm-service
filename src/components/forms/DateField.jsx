import dayjs from "dayjs";
import { FormControl, FormHelperText, InputLabel } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

const DateField = ({
  label,
  name,
  value,
  onChange,
  error,
  required = false,
  disabled = false,
  helperText = "",
  minDate,
  maxDate,
}) => {
  return (
    <FormControl
      fullWidth
      error={!!error}
      sx={{
        m: 0,
      }}
    >
      {label && (
        <InputLabel
          shrink
          htmlFor={name}
          sx={{
            position: "static",
            transform: "none",
            mb: 1,
            fontWeight: 600,
            fontSize: "0.95rem",
            color: "#334155",

            "& .required": {
              color: "#ef4444",
            },
          }}
        >
          {label}
          {required && <span className="required"> *</span>}
        </InputLabel>
      )}

      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          format="DD/MM/YYYY"
          value={value ? dayjs(value) : null}
          onChange={(date) => onChange(date ? date.format("YYYY-MM-DD") : "")}
          disabled={disabled}
          minDate={minDate ? dayjs(minDate) : undefined}
          maxDate={maxDate ? dayjs(maxDate) : undefined}
          slotProps={{
            textField: {
              id: name,
              fullWidth: true,
              error: !!error,
              placeholder: "Select Date",
              variant: "outlined",
            },
          }}
          sx={{
            width: "100%",

            "& .MuiOutlinedInput-root": {
              borderRadius: 2,
              backgroundColor: "#fff",

              "& input": {
                py: 1.6,
                fontWeight: 500,
              },

              "&:hover fieldset": {
                borderColor: "#2563eb",
              },

              "&.Mui-focused fieldset": {
                borderWidth: "2px",
                borderColor: "#2563eb",
              },

              "&.Mui-disabled": {
                backgroundColor: "#f8fafc",
              },
            },
          }}
        />
      </LocalizationProvider>

      <FormHelperText
        sx={{
          minHeight: 10,
          ml: 0,
          mt: 0.8,
        }}
      >
        {error?.message || helperText}
      </FormHelperText>
    </FormControl>
  );
};

export default DateField;
