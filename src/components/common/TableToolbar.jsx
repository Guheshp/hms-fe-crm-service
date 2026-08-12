import SearchIcon from "@mui/icons-material/Search";
import { Box, InputAdornment, TextField } from "@mui/material";

const TableToolbar = ({ search = "", onSearch, placeholder = "Search..." }) => {
  return (
    <Box
      sx={{
        // px: 2,
        py: 2,
        display: "flex",
        justifyContent: "flex-end",
      }}
    >
      <TextField
        size="small"
        value={search}
        onChange={(e) => onSearch(e.target.value)}
        placeholder={placeholder}
        sx={{
          width: 320,
          "& .MuiOutlinedInput-root": {
            borderRadius: 2,
          },
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon
                sx={{
                  color: "text.secondary",
                  fontSize: 20,
                }}
              />
            </InputAdornment>
          ),
        }}
      />
    </Box>
  );
};

export default TableToolbar;
