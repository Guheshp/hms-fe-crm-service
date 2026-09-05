import {
  Assessment,
  Dashboard,
  Groups,
  Inventory2,
  Payments,
  People,
  Subscriptions,
  TrendingUp,
  Business,
} from "@mui/icons-material";

import {
  Box,
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
    label: "Customer",
    icon: <Business />,
    path: "/customers",
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
  {
    label: "Users",
    icon: <People />,
    path: "/users",
  },
];

const Sidebar = ({ collapsed }) => {
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

    const menuButton = (
      <ListItemButton
        component={Link}
        to={item.path}
        selected={active}
        sx={{
          minHeight: 20,
          mb: 1,
          backgroundColor: "#EEF4FF",
          px: collapsed ? 0 : 1,
          justifyContent: collapsed ? "center" : "flex-start",
          borderRadius: 3,
          position: "relative",
          transition: "all 0.2s ease",

          color: active ? COLORS.primary : COLORS.textSecondary,

          backgroundColor: active ? "#EEF4FF" : "transparent",

          "&:hover": {
            backgroundColor: "#F8FAFC",
            color: COLORS.primary,
          },

          "&.Mui-selected": {
            backgroundColor: "#EEF4FF",
            color: COLORS.primary,
          },

          "&.Mui-selected:hover": {
            backgroundColor: "#EEF4FF",
          },

          ...(active && {
            "&::before": {
              content: '""',
              position: "absolute",
              left: 0,
              top: "50%",
              transform: "translateY(-50%)",
              width: 4,
              height: 28,
              borderRadius: 10,
              backgroundColor: COLORS.primary,
            },
          }),

          "& .MuiListItemIcon-root": {
            minWidth: collapsed ? 0 : 40,
            justifyContent: "center",
            color: "inherit",
          },

          "& .MuiListItemText-primary": {
            fontSize: 14,
            fontWeight: active ? 600 : 500,
          },
        }}
      >
        <ListItemIcon>{item.icon}</ListItemIcon>

        {!collapsed && <ListItemText primary={item.label} />}
      </ListItemButton>
    );

    if (collapsed) {
      return (
        <Tooltip key={item.path} title={item.label} placement="right" arrow>
          {menuButton}
        </Tooltip>
      );
    }

    return <Box key={item.path}>{menuButton}</Box>;
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: collapsed ? collapsedWidth : drawerWidth,
        flexShrink: 0,

        "& .MuiDrawer-paper": {
          width: collapsed ? collapsedWidth : drawerWidth,
          transition: "width 0.3s ease",
          overflowX: "hidden",
          boxSizing: "border-box",
          backgroundColor: "#FFFFFF",
          borderRight: "1px solid #E2E8F0",
        },
      }}
    >
      {/* Logo */}

      <Box
        sx={{
          height: 66,
          px: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: collapsed ? "center" : "flex-start",
          borderBottom: "1px solid #E2E8F0",
        }}
      >
        {collapsed ? (
          <Box
            sx={{
              width: 42,
              height: 42,
              borderRadius: 3,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: COLORS.primary,
              color: "#FFFFFF",
              fontWeight: 700,
              fontSize: 18,
            }}
          >
            {APP_NAME?.charAt(0)}
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
                borderRadius: 3,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: COLORS.primary,
                color: "#FFFFFF",
                fontWeight: 700,
                fontSize: 18,
              }}
            >
              {APP_NAME?.charAt(0)}
            </Box>

            <Box>
              <Typography
                sx={{
                  fontSize: 18,
                  fontWeight: 700,
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
                Healthcare CRM
              </Typography>
            </Box>
          </Box>
        )}
      </Box>

      {/* Menu */}

      <Box
        sx={{
          flex: 1,
          p: collapsed ? 1 : 1.5,
          overflowY: "auto",
        }}
      >
        <List disablePadding>{menuItems.map(renderMenuItem)}</List>
      </Box>
    </Drawer>
  );
};

export default Sidebar;
