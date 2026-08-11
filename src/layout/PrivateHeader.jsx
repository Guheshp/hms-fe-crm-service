import {
  AppBar,
  Avatar,
  Box,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import { Logout, LockReset, Person } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

import { APP_NAME } from "../constants/app";
import { useUser } from "../context/UserContext";

const PrivateHeader = () => {
  const navigate = useNavigate();

  const { user, logout } = useUser();
  console.log(user);
  const [anchorEl, setAnchorEl] = useState(null);

  const open = Boolean(anchorEl);

  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    try {
      await logout();

      handleCloseMenu();

      navigate("/login", {
        replace: true,
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        bgcolor: "#fff",
        color: "#1e293b",
        borderBottom: "1px solid",
        borderColor: "divider",
      }}
    >
      <Toolbar className="mx-auto flex h-16 w-full max-w-screen-2xl justify-end px-6">
        <Box>
          <IconButton onClick={handleOpenMenu}>
            <Avatar
              sx={{
                bgcolor: "primary.main",
                width: 42,
                height: 42,
                fontWeight: 600,
              }}
            >
              {user?.firstname?.charAt(0)?.toUpperCase() || "U"}
            </Avatar>
          </IconButton>

          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleCloseMenu}
            PaperProps={{
              sx: {
                mt: 1,
                width: 240,
                borderRadius: 3,
              },
            }}
          >
            <Box
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                py: 1,
              }}
            >
              <Typography variant="subtitle1" fontWeight={600} align="center">
                {user?.firstname ?? ""} {user?.lastname ?? ""}
              </Typography>
            </Box>

            <Divider />

            <MenuItem onClick={handleCloseMenu}>
              <Person fontSize="small" sx={{ mr: 1.5 }} />
              My Profile
            </MenuItem>

            <MenuItem onClick={handleCloseMenu}>
              <LockReset fontSize="small" sx={{ mr: 1.5 }} />
              Change Password
            </MenuItem>

            <Divider />

            <MenuItem onClick={handleLogout} sx={{ color: "error.main" }}>
              <Logout fontSize="small" sx={{ mr: 1.5 }} />
              Logout
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default PrivateHeader;
