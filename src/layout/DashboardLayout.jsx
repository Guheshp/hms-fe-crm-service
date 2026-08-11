import { Box, Toolbar } from "@mui/material";
import { Outlet } from "react-router-dom";
import { useState } from "react";

import PrivateHeader from "./PrivateHeader";
import Sidebar from "./Sidebar";

const DashboardLayout = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      {/* Sidebar */}
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />

      {/* Main Content */}
      <Box
        sx={{
          flexGrow: 1,
          minWidth: 0,
          display: "flex",
          flexDirection: "column",
          bgcolor: "background.default",
        }}
      >
        {/* Header */}
        <PrivateHeader collapsed={collapsed} setCollapsed={setCollapsed} />

        {/* Push content below AppBar */}
        {/* <Toolbar /> */}

        {/* Page Content */}
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
