import { Box } from "@mui/material";

const CellContent = ({ children }) => (
  <Box
    sx={{
      height: "100%",
      width: "100%",
      display: "flex",
      alignItems: "center",
    }}
  >
    {children}
  </Box>
);

export default CellContent;
