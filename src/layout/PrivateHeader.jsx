import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Add,
  LockReset,
  Logout,
  NotificationsNone,
  Person,
  Search,
  CalendarMonth,
  Settings,
} from "@mui/icons-material";

import {
  AppBar,
  Avatar,
  Badge,
  Box,
  Button,
  Divider,
  IconButton,
  InputBase,
  Menu,
  MenuItem,
  Paper,
  Stack,
  Typography,
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";

import { APP_NAME } from "../constants/app";
import { COLORS } from "../constants/theme";
import { useUser } from "../context/UserContext";

const PrivateHeader = ({ collapsed, setCollapsed }) => {
  const navigate = useNavigate();

  const { user, logout } = useUser();

  const [anchorEl, setAnchorEl] = useState(null);

  const open = Boolean(anchorEl);

  const fullName = [user?.firstname, user?.lastname].filter(Boolean).join(" ");

  const userInitial = user?.firstname?.charAt(0)?.toUpperCase() || "U";

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
        bgcolor: "#FFFFFF",
        color: COLORS.text,
        borderBottom: `1px solid ${COLORS.border}`,
        zIndex: (theme) => theme.zIndex.drawer - 1,
      }}
    >
      <Box
        sx={{
          height: 65,
          px: {
            xs: 2,
            md: 2,
          },

          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Mobile Logo */}

        <Box
          sx={{
            display: {
              xs: "flex",
              md: "none",
            },

            alignItems: "center",
            gap: 1,
          }}
        >
          <Box
            sx={{
              width: 36,
              height: 36,

              borderRadius: 2,

              display: "flex",
              alignItems: "center",
              justifyContent: "center",

              backgroundColor: COLORS.primary,

              color: "#FFFFFF",

              fontSize: 16,
              fontWeight: 600,
            }}
          >
            {APP_NAME?.charAt(0)?.toUpperCase() || "H"}
          </Box>

          <Typography
            sx={{
              fontSize: 16,
              fontWeight: 600,
            }}
          >
            {APP_NAME}
          </Typography>
        </Box>

        {/* Header Actions */}

        <Box
          sx={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 2,
          }}
        >
          {/* Left Side */}

          <IconButton
            onClick={() => setCollapsed(!collapsed)}
            sx={{
              width: 42,
              height: 42,

              border: `1px solid ${COLORS.border}`,

              borderRadius: 2,

              "&:hover": {
                backgroundColor: "#F8FAFC",
              },
            }}
          >
            <MenuIcon />
          </IconButton>

          <Paper
            elevation={0}
            sx={{
              display: {
                xs: "none",
                md: "flex",
              },

              width: 360,
              height: 44,

              px: 1.5,

              alignItems: "center",

              borderRadius: 3,

              border: `1px solid ${COLORS.border}`,

              backgroundColor: "#FFFFFF",

              boxShadow: "0 2px 8px rgba(15, 23, 42, 0.04)",

              transition: "all 0.2s ease",

              "&:hover": {
                borderColor: "#CBD5E1",
              },

              "&:focus-within": {
                borderColor: COLORS.primary,
                boxShadow: `0 0 0 4px ${COLORS.primary}15`,
              },
            }}
          >
            <Box
              sx={{
                width: 30,
                height: 30,

                display: "flex",
                alignItems: "center",
                justifyContent: "center",

                borderRadius: 2,

                backgroundColor: "#F8FAFC",

                mr: 1.5,
              }}
            >
              <Search
                sx={{
                  fontSize: 18,
                  color: COLORS.textSecondary,
                }}
              />
            </Box>

            <InputBase
              fullWidth
              placeholder="Search hospitals, leads, customers..."
              sx={{
                fontSize: 14,

                "& input::placeholder": {
                  color: COLORS.textSecondary,
                  opacity: 1,
                },
              }}
            />
          </Paper>

          {/* Right Side */}

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1.5,
              ml: "auto",
            }}
          >
            <IconButton
              sx={{
                width: 42,
                height: 42,

                border: `1px solid ${COLORS.border}`,

                borderRadius: 2,

                "&:hover": {
                  backgroundColor: "#F8FAFC",
                },
              }}
            >
              <CalendarMonth />
            </IconButton>

            {/* Settings */}

            <IconButton
              sx={{
                width: 42,
                height: 42,

                border: `1px solid ${COLORS.border}`,

                borderRadius: 2,

                "&:hover": {
                  backgroundColor: "#F8FAFC",
                },
              }}
            >
              <Settings />
            </IconButton>

            {/* Notifications */}

            <IconButton
              sx={{
                width: 42,
                height: 42,

                border: `1px solid ${COLORS.border}`,

                borderRadius: 2,

                "&:hover": {
                  backgroundColor: "#F8FAFC",
                },
              }}
            >
              <Badge badgeContent={5} color="error">
                <NotificationsNone />
              </Badge>
            </IconButton>

            {/* Profile */}

            <IconButton
              onClick={handleOpenMenu}
              sx={{
                p: 1,

                borderRadius: 2,

                border: `1px solid ${COLORS.border}`,

                "&:hover": {
                  backgroundColor: "#F8FAFC",
                },
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                }}
              >
                <Box
                  sx={{
                    display: {
                      xs: "none",
                      sm: "block",
                    },

                    textAlign: "right",
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: 13,
                      fontWeight: 600,
                      lineHeight: 1,
                    }}
                  >
                    {fullName || "User"}
                  </Typography>
                </Box>

                <Avatar
                  src={user?.profileimageurl || ""}
                  alt={user?.firstname || "User"}
                  sx={{
                    bgcolor: COLORS.primary,
                  }}
                >
                  {!user?.profileimageurl && userInitial}
                </Avatar>
              </Box>
            </IconButton>

            {/* Profile Menu */}

            <Menu
              anchorEl={anchorEl}
              open={open}
              onClose={handleCloseMenu}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              PaperProps={{
                sx: {
                  mt: 1,

                  width: 240,

                  borderRadius: 3,

                  border: `1px solid ${COLORS.border}`,

                  overflow: "hidden",
                },
              }}
            >
              <MenuItem
                onClick={() => {
                  handleCloseMenu();
                  navigate(`/profile/${user?.id}`);
                }}
              >
                <Person sx={{ mr: 1.5 }} />
                My Profile
              </MenuItem>

              <MenuItem onClick={handleCloseMenu}>
                <LockReset sx={{ mr: 1.5 }} />
                Change Password
              </MenuItem>

              <Divider />

              <MenuItem
                onClick={handleLogout}
                sx={{
                  color: COLORS.error,
                }}
              >
                <Logout sx={{ mr: 1.5 }} />
                Logout
              </MenuItem>
            </Menu>
          </Box>
        </Box>
      </Box>
    </AppBar>
  );
};

export default PrivateHeader;
