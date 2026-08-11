import {
  Assessment,
  Dashboard,
  Groups,
  Inventory2,
  Payments,
  People,
  PersonAddAlt1,
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
  {
    label: "Settings",
    icon: <Settings />,
    path: "/settings",
  },
];

const Sidebar = ({ collapsed = false }) => {
  const location = useLocation();

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: collapsed ? collapsedWidth : drawerWidth,
        flexShrink: 0,

        "& .MuiDrawer-paper": {
          width: collapsed ? collapsedWidth : drawerWidth,
          transition: "width .25s ease",
          boxSizing: "border-box",
          bgcolor: "background.paper",
          borderRight: "1px solid",
          borderColor: "divider",
        },
      }}
    >
      {/* Logo */}
      <Box
        sx={{
          height: 64,
          display: "flex",
          alignItems: "center",
          justifyContent: collapsed ? "center" : "flex-start",
          px: 3,
        }}
      >
        {collapsed ? (
          <Typography color="primary" variant="h5" fontWeight={700}>
            C
          </Typography>
        ) : (
          <Typography color="primary" variant="h5" fontWeight={700}>
            {APP_NAME}
          </Typography>
        )}
      </Box>

      <Divider />

      {/* Menu */}
      <List sx={{ px: 1.5, py: 2 }}>
        {menuItems.map((item) => {
          const active = location.pathname === item.path;

          const button = (
            <ListItemButton
              component={Link}
              to={item.path}
              selected={active}
              sx={{
                borderRadius: 2,
                mb: 0.5,
                minHeight: 48,
                justifyContent: collapsed ? "center" : "initial",

                "&.Mui-selected": {
                  bgcolor: "primary.main",
                  color: "white",

                  "& .MuiListItemIcon-root": {
                    color: "white",
                  },

                  "&:hover": {
                    bgcolor: "primary.dark",
                  },
                },
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: collapsed ? 0 : 2,
                  justifyContent: "center",
                  color: active ? "inherit" : "text.secondary",
                }}
              >
                {item.icon}
              </ListItemIcon>

              {!collapsed && (
                <ListItemText
                  primary={item.label}
                  primaryTypographyProps={{
                    fontWeight: active ? 600 : 500,
                  }}
                />
              )}
            </ListItemButton>
          );

          return collapsed ? (
            <Tooltip key={item.path} title={item.label} placement="right">
              {button}
            </Tooltip>
          ) : (
            <Box key={item.path}>{button}</Box>
          );
        })}
      </List>
    </Drawer>
  );
};

export default Sidebar;
