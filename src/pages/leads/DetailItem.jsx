import { Box, Stack, Typography } from "@mui/material";

const DetailItem = ({ label, value }) => {
  return (
    <Stack spacing={0.75}>
      <Typography
        sx={{
          fontSize: 12,
          fontWeight: 600,
          color: "#64748B",
          textTransform: "uppercase",
          letterSpacing: "0.5px",
        }}
      >
        {label}
      </Typography>

      <Box sx={{ minHeight: 24 }}>
        {typeof value === "string" || typeof value === "number" ? (
          <Typography
            sx={{
              fontSize: 14,
              fontWeight: 500,
              color: "#0F172A",
              lineHeight: 1.5,
            }}
          >
            {value || "-"}
          </Typography>
        ) : (
          value
        )}
      </Box>
    </Stack>
  );
};

export default DetailItem;
