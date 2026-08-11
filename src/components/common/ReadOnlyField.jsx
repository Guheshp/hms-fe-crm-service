import { Stack, TextField, Typography } from "@mui/material";

const ReadOnlyField = ({ label, value, multiline = false, rows = 1 }) => {
  return (
    <Stack spacing={1}>
      <Typography
        variant="body2"
        sx={{
          fontWeight: 600,
          color: "text.secondary",
        }}
      >
        {label}
      </Typography>

      <TextField
        fullWidth
        value={value || "-"}
        multiline={multiline}
        minRows={multiline ? rows : undefined}
        variant="outlined"
        InputProps={{
          readOnly: true,
        }}
        sx={{
          "& .MuiOutlinedInput-root": {
            borderRadius: 2,
            bgcolor: "#FAFAFA",

            "& fieldset": {
              borderColor: "#E5E7EB",
            },

            "&:hover fieldset": {
              borderColor: "#CBD5E1",
            },

            "&.Mui-focused fieldset": {
              borderColor: "#1976D2",
            },
          },

          "& .MuiInputBase-input": {
            fontWeight: 500,
            color: "#111827",
            cursor: "default",
            py: 1.5,
          },

          "& .MuiInputBase-inputMultiline": {
            fontWeight: 500,
            color: "#111827",
            lineHeight: 1.7,
          },
        }}
      />
    </Stack>
  );
};

export default ReadOnlyField;
