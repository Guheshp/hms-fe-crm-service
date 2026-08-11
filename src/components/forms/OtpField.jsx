import { useRef } from "react";
import {
  Box,
  FormControl,
  FormHelperText,
  InputLabel,
  TextField,
} from "@mui/material";

const OtpField = ({
  label,
  value = "",
  onChange,
  error,
  length = 6,
  disabled = false,
  required = false,
  className = "",
}) => {
  const inputRefs = useRef([]);

  const otp = value.padEnd(length, "").split("");

  const handleChange = (index, e) => {
    const input = e.target.value.replace(/\D/g, "");

    const newOtp = [...otp];

    if (!input) {
      newOtp[index] = "";
      onChange(newOtp.join("").trim());
      return;
    }

    newOtp[index] = input[0];
    onChange(newOtp.join(""));

    if (index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();

    const pasted = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, length);

    onChange(pasted);

    inputRefs.current[Math.min(pasted.length, length - 1)]?.focus();
  };

  return (
    <FormControl fullWidth error={!!error} className={className}>
      {label && (
        <InputLabel
          shrink
          sx={{
            position: "static",
            transform: "none",
            mb: 1,
            fontWeight: 600,
            fontSize: "0.95rem",
            color: "#334155",
          }}
        >
          {label}
          {required && <span style={{ color: "#ef4444" }}> *</span>}
        </InputLabel>
      )}

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          gap: 1.5,
        }}
      >
        {Array.from({ length }).map((_, index) => (
          <TextField
            key={index}
            inputRef={(el) => (inputRefs.current[index] = el)}
            value={otp[index] || ""}
            onChange={(e) => handleChange(index, e)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            onPaste={handlePaste}
            disabled={disabled}
            error={!!error}
            variant="outlined"
            inputProps={{
              maxLength: 1,
              inputMode: "numeric",
              style: {
                textAlign: "center",
                fontSize: 20,
                fontWeight: 600,
              },
            }}
            sx={{
              width: 58,

              "& .MuiOutlinedInput-root": {
                height: 58,
                borderRadius: 2,

                "& fieldset": {
                  borderColor: "#cbd5e1",
                },

                "&:hover fieldset": {
                  borderColor: "#2563eb",
                },

                "&.Mui-focused fieldset": {
                  borderColor: "#2563eb",
                  borderWidth: 2,
                },
              },
            }}
          />
        ))}
      </Box>

      <FormHelperText sx={{ ml: 0, mt: 1 }}>{error?.message}</FormHelperText>
    </FormControl>
  );
};

export default OtpField;
