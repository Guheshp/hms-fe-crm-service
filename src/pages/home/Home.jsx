import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Stack,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

import { APP_NAME } from "../../constants/app";

const Home = () => {
  const navigate = useNavigate();

  const features = [
    {
      title: "Lead & Enquiry Management",
      description:
        "Manage enquiries, leads, follow-ups, and customer interactions from a centralized platform.",
    },
    {
      title: "Organization Management",
      description:
        "Create and manage organizations, subscriptions, branches, and user accounts efficiently.",
    },
    {
      title: "Administration & Reports",
      description:
        "Monitor business activities, manage users and roles, and generate operational reports.",
    },
  ];

  return (
    <main className="bg-slate-50">
      <section className="mx-auto flex min-h-[calc(100vh-64px)] max-w-7xl items-center px-6 py-12">
        <div className="grid w-full items-center gap-12 lg:grid-cols-2">
          {/* Left Section */}
          <Box>
            <Chip
              label="Internal CRM System"
              color="primary"
              sx={{
                mb: 3,
                fontWeight: 600,
              }}
            />

            <Typography
              variant="h3"
              fontWeight={700}
              sx={{
                lineHeight: 1.3,
              }}
            >
              Welcome to
              <br />
              {APP_NAME}
            </Typography>

            <Typography
              variant="body1"
              color="text.secondary"
              sx={{
                mt: 4,
                maxWidth: 550,
                lineHeight: 1.9,
              }}
            >
              {APP_NAME} is an internal Customer Relationship Management
              platform that helps teams manage enquiries, organizations,
              subscriptions, users, customers, and day-to-day business
              operations from a single centralized application.
            </Typography>

            <Stack direction="row" spacing={2} sx={{ mt: 5 }}>
              <Button
                variant="contained"
                size="large"
                onClick={() => navigate("/login")}
                sx={{
                  minWidth: 150,
                  py: 1.4,
                  borderRadius: 2,
                  textTransform: "none",
                  fontWeight: 600,
                }}
              >
                Login
              </Button>

              <Button
                variant="outlined"
                size="large"
                onClick={() => navigate("/register")}
                sx={{
                  minWidth: 150,
                  py: 1.4,
                  borderRadius: 2,
                  textTransform: "none",
                  fontWeight: 600,
                }}
              >
                Register
              </Button>
            </Stack>
          </Box>

          {/* Right Section */}
          <Stack spacing={3}>
            {features.map((feature) => (
              <Card
                key={feature.title}
                elevation={0}
                sx={{
                  borderRadius: 3,
                  border: "1px solid",
                  borderColor: "divider",
                  boxShadow: "0 8px 20px rgba(15,23,42,0.05)",
                }}
              >
                <CardContent>
                  <Typography variant="h6" fontWeight={600}>
                    {feature.title}
                  </Typography>

                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      mt: 1,
                      lineHeight: 1.8,
                    }}
                  >
                    {feature.description}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </Stack>
        </div>
      </section>
    </main>
  );
};

export default Home;
