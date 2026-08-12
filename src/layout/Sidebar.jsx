import {
  Assessment,
  Dashboard,
  Groups,
  Inventory2,
  Payments,
  People,
  Settings,
  Subscriptions,
  TrendingUp,
} from "@mui/icons-material";

import {
  Box,
  Divider,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Tooltip,
  Typography,
} from "@mui/material";

import { Link, useLocation } from "react-router-dom";

import { APP_NAME } from "../constants/app";
import { COLORS } from "../constants/theme";

const drawerWidth = 260;
const collapsedWidth = 80;

const menuItems = [
  {
    label: "Dashboard",
    icon: <Dashboard />,
    path: "/dashboard",
  },
  {
    label: "Users",
    icon: <People />,
    path: "/users",
  },
  {
    label: "Enquiries",
    icon: <Groups />,
    path: "/enquiries",
  },
  {
    label: "Leads",
    icon: <TrendingUp />,
    path: "/leads",
  },
  {
    label: "Plans",
    icon: <Inventory2 />,
    path: "/plans",
  },
  {
    label: "Subscriptions",
    icon: <Subscriptions />,
    path: "/subscriptions",
  },
  {
    label: "Payments",
    icon: <Payments />,
    path: "/payments",
  },
  {
    label: "Reports",
    icon: <Assessment />,
    path: "/reports",
  },
];

const Sidebar = ({ collapsed = false }) => {
  const location = useLocation();

  const isActive = (path) => {
    if (path === "/dashboard") {
      return location.pathname === "/dashboard";
    }

    return (
      location.pathname === path || location.pathname.startsWith(`${path}/`)
    );
  };

  const renderMenuItem = (item) => {
    const active = isActive(item.path);

    const button = (
      <ListItemButton
        component={Link}
        to={item.path}
        selected={active}
        sx={{
          position: "relative",

          minHeight: 50,

          mb: 1,

          px: collapsed ? 0 : 2,

          justifyContent: collapsed ? "center" : "flex-start",

          borderRadius: 3,

          color: active ? COLORS.primary : COLORS.textSecondary,

          backgroundColor: active ? "#E8F0FE" : "transparent",

          border: active ? "1px solid #DBEAFE" : "1px solid transparent",

          boxShadow: active ? "0 2px 8px rgba(37, 99, 235, 0.08)" : "none",

          transition: "all 0.2s ease",

          "& .MuiListItemIcon-root": {
            minWidth: collapsed ? 0 : 40,

            color: "inherit",

            justifyContent: "center",

            transform: active ? "scale(1.1)" : "scale(1)",

            transition: "all 0.2s ease",
          },

          "& .MuiListItemText-primary": {
            fontSize: 14,

            fontWeight: active ? 600 : 500,
          },

          "&:hover": {
            backgroundColor: "#EEF4FF",

            color: COLORS.primary,

            transform: "translateX(4px)",
          },

          "&.Mui-selected": {
            backgroundColor: "#E8F0FE",

            color: COLORS.primary,
          },

          "&.Mui-selected:hover": {
            backgroundColor: "#E8F0FE",
          },

          ...(active && {
            "&::before": {
              content: '""',

              position: "absolute",

              left: -6,

              top: "50%",

              transform: "translateY(-50%)",

              width: 4,

              height: 28,

              borderRadius: 4,

              backgroundColor: COLORS.primary,
            },
          }),
        }}
      >
        <ListItemIcon>{item.icon}</ListItemIcon>

        {!collapsed && <ListItemText primary={item.label} />}
      </ListItemButton>
    );

    return collapsed ? (
      <Tooltip key={item.path} title={item.label} placement="right" arrow>
        {button}
      </Tooltip>
    ) : (
      <Box key={item.path}>{button}</Box>
    );
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: collapsed ? collapsedWidth : drawerWidth,
        flexShrink: 0,

        "& .MuiDrawer-paper": {
          width: collapsed ? collapsedWidth : drawerWidth,
          boxSizing: "border-box",
          transition: "width 0.25s ease",
          backgroundColor: "#FFFFFF",
          borderRight: "1px solid #DCE4EE",
          overflowX: "hidden",
          display: "flex",
          flexDirection: "column",
        },
      }}
    >
      {/* Header */}

      <Box
        sx={{
          height: 72,
          minHeight: 72,
          px: collapsed ? 0 : 3,
          display: "flex",
          alignItems: "center",
          justifyContent: collapsed ? "center" : "flex-start",
          backgroundColor: "#FFFFFF",
          borderBottom: "1px solid #D7E0EA",
        }}
      >
        {collapsed ? (
          <Box
            sx={{
              width: 42,
              height: 42,
              borderRadius: 2,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: COLORS.primary,
              color: "#FFFFFF",
              fontWeight: 700,
              fontSize: 18,
            }}
          >
            {APP_NAME?.charAt(0)?.toUpperCase()}
          </Box>
        ) : (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1.5,
            }}
          >
            <Box
              sx={{
                width: 42,
                height: 42,
                borderRadius: 2,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: COLORS.primary,
                color: "#FFFFFF",
                fontWeight: 700,
                fontSize: 18,
              }}
            >
              {APP_NAME?.charAt(0)?.toUpperCase()}
            </Box>

            <Box>
              <Typography
                sx={{
                  fontSize: 18,
                  fontWeight: 700,
                  color: COLORS.text,
                  lineHeight: 1.2,
                }}
              >
                {APP_NAME}
              </Typography>

              <Typography
                sx={{
                  fontSize: 12,
                  color: COLORS.textSecondary,
                }}
              >
                Healthcare Management
              </Typography>
            </Box>
          </Box>
        )}
      </Box>

      {/* Navigation */}

      <Box
        sx={{
          flex: 1,
          px: collapsed ? 1 : 1.5,
          py: 2,
          overflowY: "auto",

          "&::-webkit-scrollbar": {
            width: 4,
          },

          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "#CBD5E1",
            borderRadius: 10,
          },
        }}
      >
        <List disablePadding>{menuItems.map(renderMenuItem)}</List>
      </Box>

      {/* Settings */}

      <Box
        sx={{
          px: collapsed ? 1 : 1.5,
          pb: 2,
        }}
      >
        <Divider sx={{ mb: 1.5 }} />

        {renderMenuItem({
          label: "Settings",
          icon: <Settings />,
          path: "/settings",
        })}
      </Box>
    </Drawer>
  );
};

export default Sidebar;
