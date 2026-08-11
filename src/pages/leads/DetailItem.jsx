import { Box, Stack, Typography } from "@mui/material";

const DetailItem = ({ label, value }) => (
  <Stack spacing={0.5} sx={{ mb: 2 }}>
    <Typography variant="caption" color="text.secondary" fontWeight={600}>
      {label}
    </Typography>

    <Box>
      {typeof value === "string" || typeof value === "number" ? (
        <Typography variant="body1">{value || "-"}</Typography>
      ) : (
        value
      )}
    </Box>
  </Stack>
);

export default DetailItem;
