import { ToggleButton, ToggleButtonGroup, Typography } from "@mui/material";
import { Link, useLocation } from "react-router-dom";

import { APP_NAME } from "../constants/app";

const PublicHeader = () => {
  const location = useLocation();

  const value = location.pathname === "/register" ? "register" : "login";

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--mui-palette-divider)] bg-[var(--mui-palette-background-paper)] shadow-sm">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link to="/" className="flex items-center gap-2 no-underline">
          <Typography variant="h5" color="primary" fontWeight={700}>
            {APP_NAME}
          </Typography>
        </Link>

        <ToggleButtonGroup
          exclusive
          size="small"
          value={value}
          sx={{
            "& .MuiToggleButton-root": {
              textTransform: "none",
              px: 3,
              fontWeight: 600,
              color: "text.primary",
              borderColor: "divider",
            },
            "& .Mui-selected": {
              bgcolor: "primary.main",
              color: "#fff",
              "&:hover": {
                bgcolor: "primary.dark",
              },
            },
          }}
        >
          <ToggleButton value="login" component={Link} to="/login">
            Login
          </ToggleButton>

          <ToggleButton value="register" component={Link} to="/register">
            Register
          </ToggleButton>
        </ToggleButtonGroup>
      </div>
    </header>
  );
};

export default PublicHeader;
