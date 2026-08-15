import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";

import PrivateHeader from "./PrivateHeader";
import Sidebar from "./Sidebar";

const DashboardLayout = () => {
  const [collapsed, setCollapsed] = useState(() => {
    const savedState = localStorage.getItem("sidebar-collapsed");

    return savedState ? JSON.parse(savedState) : false;
  });

  useEffect(() => {
    localStorage.setItem("sidebar-collapsed", JSON.stringify(collapsed));
  }, [collapsed]);

  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
      }}
    >
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />

      <Box
        sx={{
          flexGrow: 1,
          minWidth: 0,
          display: "flex",
          flexDirection: "column",
          bgcolor: "background.default",
        }}
      >
        <PrivateHeader collapsed={collapsed} setCollapsed={setCollapsed} />

        <Box
          component="main"
          sx={{
            flexGrow: 1,
            minWidth: 0,
            p: 2,
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default DashboardLayout;
