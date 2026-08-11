import {
  FormControl,
  FormHelperText,
  InputLabel,
  TextField,
} from "@mui/material";

const InputField = ({
  label,
  name,
  type = "text",
  value = "",
  onChange,
  onBlur,
  error,
  placeholder = "",
  required = false,
  disabled = false,
  readOnly = false,
  helperText = "",
  className = "",
  size = "medium",
  fullWidth = true,
  ...rest
}) => {
  return (
    <FormControl fullWidth={fullWidth} error={!!error} className={className}>
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

      <TextField
        id={name}
        name={name}
        type={type}
        value={value ?? ""}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        disabled={disabled}
        size={size}
        variant="outlined"
        fullWidth={fullWidth}
        InputProps={{
          readOnly,
        }}
        error={!!error}
        sx={{
          "& .MuiOutlinedInput-root": {
            borderRadius: 2,
            backgroundColor: "#fff",

            "& input": {
              py: 1.6,
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
        {...rest}
      />

      <FormHelperText
        sx={{
          minHeight: 22,
          ml: 0,
          mt: 0.8,
        }}
      >
        {error?.message || helperText}
      </FormHelperText>
    </FormControl>
  );
};

export default InputField;
