import {
  AppBar,
  Avatar,
  Box,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  Typography,
} from "@mui/material";

import { Logout, LockReset, Person } from "@mui/icons-material";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { APP_NAME } from "../constants/app";
import { COLORS } from "../constants/theme";
import { useUser } from "../context/UserContext";

const PrivateHeader = () => {
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
          height: 71.5,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          px: {
            xs: 2,
            md: 3,
          },
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
              color: COLORS.text,
            }}
          >
            {APP_NAME}
          </Typography>
        </Box>

        {/* User Section */}

        <Box sx={{ ml: "auto" }}>
          <IconButton
            onClick={handleOpenMenu}
            sx={{
              p: 1,
              borderRadius: 2,
              border: `1px solid ${COLORS.border}`,

              "&:hover": {
                backgroundColor: COLORS.background,
              },
            }}
          >
            <Stack direction="row" spacing={1.5} alignItems="center">
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
                    fontSize: 14,
                    fontWeight: 500,
                    color: COLORS.text,
                    lineHeight: 1.3,
                  }}
                >
                  {fullName || "User"}
                </Typography>

                <Typography
                  sx={{
                    fontSize: 12,
                    color: COLORS.textSecondary,
                  }}
                >
                  Administrator
                </Typography>
              </Box>

              <Avatar
                sx={{
                  width: 38,
                  height: 38,
                  bgcolor: COLORS.primary,
                  color: "#FFFFFF",
                  fontSize: 14,
                  fontWeight: 600,
                }}
              >
                {userInitial}
              </Avatar>
            </Stack>
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
                borderRadius: 2,
                border: `1px solid ${COLORS.border}`,
                boxShadow: "0 8px 20px rgba(15,23,42,0.08)",
                overflow: "hidden",
              },
            }}
          >
            <Box
              sx={{
                px: 2,
                py: 2,
                backgroundColor: "#F8FAFC",
              }}
            >
              <Stack direction="row" spacing={1.5} alignItems="center">
                <Avatar
                  sx={{
                    width: 42,
                    height: 42,
                    bgcolor: COLORS.primary,
                    fontWeight: 600,
                  }}
                >
                  {userInitial}
                </Avatar>

                <Box minWidth={0}>
                  <Typography
                    sx={{
                      fontSize: 14,
                      fontWeight: 600,
                    }}
                    noWrap
                  >
                    {fullName || "User"}
                  </Typography>

                  <Typography
                    sx={{
                      fontSize: 12,
                      color: COLORS.textSecondary,
                    }}
                    noWrap
                  >
                    {user?.email || "Administrator"}
                  </Typography>
                </Box>
              </Stack>
            </Box>

            <Divider />

            <MenuItem
              onClick={handleCloseMenu}
              sx={{
                py: 1.2,
                px: 2,

                "&:hover": {
                  backgroundColor: "#F8FAFC",
                },
              }}
            >
              <Person
                fontSize="small"
                sx={{
                  mr: 1.5,
                  color: COLORS.textSecondary,
                }}
              />

              <Typography
                sx={{
                  fontSize: 14,
                  fontWeight: 500,
                }}
              >
                My Profile
              </Typography>
            </MenuItem>

            <MenuItem
              onClick={handleCloseMenu}
              sx={{
                py: 1.2,
                px: 2,

                "&:hover": {
                  backgroundColor: "#F8FAFC",
                },
              }}
            >
              <LockReset
                fontSize="small"
                sx={{
                  mr: 1.5,
                  color: COLORS.textSecondary,
                }}
              />

              <Typography
                sx={{
                  fontSize: 14,
                  fontWeight: 500,
                }}
              >
                Change Password
              </Typography>
            </MenuItem>

            <Divider />

            <MenuItem
              onClick={handleLogout}
              sx={{
                py: 1.2,
                px: 2,
                color: COLORS.error,

                "&:hover": {
                  backgroundColor: COLORS.errorLight,
                },
              }}
            >
              <Logout
                fontSize="small"
                sx={{
                  mr: 1.5,
                }}
              />

              <Typography
                sx={{
                  fontSize: 14,
                  fontWeight: 500,
                }}
              >
                Logout
              </Typography>
            </MenuItem>
          </Menu>
        </Box>
      </Box>
    </AppBar>
  );
};

export default PrivateHeader;
