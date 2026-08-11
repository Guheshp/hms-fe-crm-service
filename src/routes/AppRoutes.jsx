import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from "../App";

import PublicRoute from "./PublicRoute";
import ProtectedRoute from "./ProtectedRoute";

import DashboardLayout from "../layout/DashboardLayout";

import Home from "../pages/home/Home";
import Login from "../pages/login/Login";
import Register from "../pages/register/Register";
import Dashboard from "../pages/dashboard/Dashboard";
import Users from "../pages/users/Users";
import CreateUser from "../pages/users/CreateUser";
import userRoutes from "./userRoutes";
import enquiriesRoutes from "./Enquiries";
import leadsRoutes from "./LeadRoutes";
import planRoutes from "./PlanRoute";
import subscriptionsRoutes from "./Subscriptions";

const router = createBrowserRouter([
  // Public Routes
  {
    element: (
      <PublicRoute>
        <App />
      </PublicRoute>
    ),
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
    ],
  },

  // Protected Routes
  {
    element: (
      <ProtectedRoute>
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "dashboard",
        element: <Dashboard />,
      },

      // Future Routes
      ...userRoutes,
      ...enquiriesRoutes,
      ...leadsRoutes,
      ...planRoutes,
      ...subscriptionsRoutes,
    ],
  },
]);

const AppRoutes = () => {
  return <RouterProvider router={router} />;
};

export default AppRoutes;
