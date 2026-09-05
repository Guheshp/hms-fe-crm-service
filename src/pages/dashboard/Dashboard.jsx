import { useEffect, useState } from "react";

import {
  Card,
  CardContent,
  Button,
  LinearProgress,
  Typography,
  Box,
} from "@mui/material";

import { Groups, TrendingUp, Subscriptions, Person } from "@mui/icons-material";

import PageHeader from "../../components/common/PageHeader";
import { getDashboard } from "../../api/dashboard";

const Dashboard = () => {
  const [dashboard, setDashboard] = useState({
    enquiries: { total: 0 },
    leads: { total: 0, won: 0 },
    followups: { total: 0, today: 0, overdue: 0 },
    subscriptions: { total: 0, active: 0 },
    payments: { total: 0, today: 0 },
    users: { total: 0 },
  });

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const response = await getDashboard();

      setDashboard(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const stats = [
    {
      title: "Total Enquiries",
      value: dashboard.enquiries.total,
      icon: <Groups fontSize="medium" />,
      background: "#EFF6FF",
      color: "#2563EB",
    },
    {
      title: "Total Leads",
      value: dashboard.leads.total,
      icon: <TrendingUp fontSize="medium" />,
      background: "#F0FDF4",
      color: "#16A34A",
    },
    {
      title: "Subscriptions",
      value: dashboard.subscriptions.active,
      icon: <Subscriptions fontSize="medium" />,
      background: "#FAF5FF",
      color: "#9333EA",
    },
    {
      title: "Users",
      value: dashboard.users.total,
      icon: <Person fontSize="medium" />,
      background: "#FFF7ED",
      color: "#EA580C",
    },
  ];

  const conversionRate =
    dashboard.leads.total > 0
      ? (dashboard.leads.won / dashboard.leads.total) * 100
      : 0;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Dashboard"
        subtitle="Overview of your healthcare management system."
      />

      {/* Statistics */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((item) => (
          <Card
            key={item.title}
            elevation={0}
            sx={{
              border: "1px solid #CBD5E1",
              borderRadius: "14px",
              boxShadow: "0 2px 6px rgba(15,23,42,0.06)",
            }}
          >
            <CardContent sx={{ p: 2.5 }}>
              <div className="flex items-center justify-between">
                <div>
                  <Typography
                    sx={{
                      fontSize: 13,
                      fontWeight: 500,
                      color: "#64748B",
                    }}
                  >
                    {item.title}
                  </Typography>

                  <Typography
                    sx={{
                      mt: 0.5,
                      fontSize: 28,
                      fontWeight: 700,
                      color: "#0F172A",
                      lineHeight: 1.2,
                    }}
                  >
                    {item.value}
                  </Typography>
                </div>

                <Box
                  sx={{
                    width: 48,
                    height: 48,
                    borderRadius: 2.5,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: item.background,
                    color: item.color,

                    "& svg": {
                      fontSize: 24,
                    },
                  }}
                >
                  {item.icon}
                </Box>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Summary */}

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card elevation={0}>
          <CardContent>
            <Typography variant="h6" fontWeight={700}>
              Follow-ups
            </Typography>

            <div className="mt-6 space-y-4">
              <div className="flex justify-between">
                <span>Total</span>
                <strong>{dashboard.followups.total}</strong>
              </div>

              <div className="flex justify-between">
                <span>Today</span>
                <strong>{dashboard.followups.today}</strong>
              </div>

              <div className="flex justify-between">
                <span>Overdue</span>
                <strong>{dashboard.followups.overdue}</strong>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card elevation={0}>
          <CardContent>
            <Typography variant="h6" fontWeight={700}>
              Payments
            </Typography>

            <div className="mt-6 space-y-4">
              <div className="flex justify-between">
                <span>Total Revenue</span>
                <strong>₹{dashboard.payments.total}</strong>
              </div>

              <div className="flex justify-between">
                <span>Today's Revenue</span>
                <strong>₹{dashboard.payments.today}</strong>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card elevation={0}>
          <CardContent>
            <Typography variant="h6" fontWeight={700}>
              Lead Conversion
            </Typography>

            <div className="mt-6 space-y-4">
              <LinearProgress variant="determinate" value={conversionRate} />

              <Typography variant="h4" fontWeight={700}>
                {conversionRate.toFixed(0)}%
              </Typography>

              <Typography color="text.secondary">
                {dashboard.leads.won} won from {dashboard.leads.total} leads
              </Typography>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}

      <Card elevation={0}>
        <CardContent>
          <Typography variant="h6" fontWeight={700}>
            Quick Actions
          </Typography>

          <div className="mt-6 flex flex-wrap gap-3">
            <Button variant="contained">New Enquiry</Button>

            <Button variant="outlined">Create Lead</Button>

            <Button variant="outlined">Add Subscription</Button>

            <Button variant="outlined">Add Payment</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
