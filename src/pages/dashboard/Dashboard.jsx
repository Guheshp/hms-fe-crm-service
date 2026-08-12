import {
  ArrowForward,
  Payments,
  People,
  TrendingUp,
  WorkspacePremium,
} from "@mui/icons-material";

import {
  Box,
  Card,
  CardContent,
  Chip,
  Divider,
  Grid,
  Stack,
  Typography,
} from "@mui/material";

import PageHeader from "../../components/common/PageHeader";
import CustomButton from "../../components/common/Button";
import { COLORS } from "../../constants/theme";

const statCards = [
  {
    title: "Total Leads",
    value: "1,248",
    change: "+12.5%",
    subtitle: "vs last month",
    icon: <TrendingUp />,
    iconBg: COLORS.primaryLight,
    iconColor: COLORS.primary,
  },
  {
    title: "Active Subscriptions",
    value: "326",
    change: "+8.2%",
    subtitle: "vs last month",
    icon: <WorkspacePremium />,
    iconBg: COLORS.successLight,
    iconColor: COLORS.success,
  },
  {
    title: "Total Customers",
    value: "892",
    change: "+6.4%",
    subtitle: "vs last month",
    icon: <People />,
    iconBg: COLORS.purpleLight,
    iconColor: COLORS.purple,
  },
  {
    title: "Total Revenue",
    value: "₹8.42L",
    change: "+14.8%",
    subtitle: "vs last month",
    icon: <Payments />,
    iconBg: COLORS.warningLight,
    iconColor: COLORS.warning,
  },
];

const recentSubscriptions = [
  {
    name: "Aman Joshi Hospital",
    plan: "HMS Premium",
    amount: "₹2,999",
    status: "Active",
  },
  {
    name: "City Care Hospital",
    plan: "HMS Standard",
    amount: "₹1,999",
    status: "Active",
  },
  {
    name: "Apollo Medical Centre",
    plan: "HMS Basic",
    amount: "₹1,288",
    status: "Active",
  },
  {
    name: "Health Plus Clinic",
    plan: "HMS Standard",
    amount: "₹1,999",
    status: "Pending",
  },
];

const leadOverview = [
  {
    label: "New Leads",
    value: 248,
    percentage: 42,
  },
  {
    label: "Qualified",
    value: 156,
    percentage: 26,
  },
  {
    label: "Demo Scheduled",
    value: 98,
    percentage: 17,
  },
  {
    label: "Converted",
    value: 87,
    percentage: 15,
  },
];

const Dashboard = () => {
  return (
    <Box>
      <PageHeader
        title="Dashboard"
        subtitle="Overview of your hospital management system."
      />

      {/* ================= STAT CARDS ================= */}

      <Grid container spacing={3}>
        {statCards.map((stat) => (
          <Grid key={stat.title} size={{ xs: 12, sm: 6, lg: 3 }}>
            <Card
              elevation={0}
              sx={{
                height: "100%",
                borderRadius: 3,
                border: `1px solid ${COLORS.border}`,
                backgroundColor: COLORS.card,
                transition: "all 0.2s ease",

                "&:hover": {
                  transform: "translateY(-3px)",
                  boxShadow: "0 10px 30px rgba(15, 23, 42, 0.07)",
                },
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Stack
                  direction="row"
                  alignItems="flex-start"
                  justifyContent="space-between"
                >
                  <Box>
                    <Typography
                      variant="body2"
                      color={COLORS.textSecondary}
                      fontWeight={500}
                    >
                      {stat.title}
                    </Typography>

                    <Typography
                      sx={{
                        mt: 1,
                        fontSize: 30,
                        lineHeight: 1.2,
                        fontWeight: 750,
                        color: COLORS.text,
                      }}
                    >
                      {stat.value}
                    </Typography>
                  </Box>

                  <Box
                    sx={{
                      width: 44,
                      height: 44,
                      borderRadius: 2,

                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",

                      backgroundColor: stat.iconBg,
                      color: stat.iconColor,

                      "& svg": {
                        fontSize: 22,
                      },
                    }}
                  >
                    {stat.icon}
                  </Box>
                </Stack>

                <Stack
                  direction="row"
                  spacing={1}
                  alignItems="center"
                  sx={{ mt: 2 }}
                >
                  <Typography
                    variant="caption"
                    sx={{
                      color: COLORS.success,
                      fontWeight: 700,
                    }}
                  >
                    {stat.change}
                  </Typography>

                  <Typography variant="caption" color={COLORS.textSecondary}>
                    {stat.subtitle}
                  </Typography>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* ================= MAIN GRID ================= */}

      <Grid container spacing={3} sx={{ mt: 0 }}>
        {/* ================= REVENUE ================= */}

        <Grid size={{ xs: 12, lg: 8 }}>
          <Card
            elevation={0}
            sx={{
              height: "100%",
              borderRadius: 3,
              border: `1px solid ${COLORS.border}`,
              backgroundColor: COLORS.card,
            }}
          >
            <CardContent sx={{ p: 3 }}>
              <Stack
                direction={{
                  xs: "column",
                  sm: "row",
                }}
                alignItems={{
                  xs: "flex-start",
                  sm: "center",
                }}
                justifyContent="space-between"
                gap={2}
              >
                <Box>
                  <Typography variant="h6" fontWeight={700} color={COLORS.text}>
                    Revenue Overview
                  </Typography>

                  <Typography
                    variant="body2"
                    color={COLORS.textSecondary}
                    sx={{ mt: 0.5 }}
                  >
                    Subscription revenue overview.
                  </Typography>
                </Box>

                <Chip
                  label="This Year"
                  size="small"
                  variant="outlined"
                  sx={{
                    borderRadius: 2,
                    fontWeight: 600,
                  }}
                />
              </Stack>

              {/* Revenue summary */}

              <Grid container spacing={2} sx={{ mt: 2, mb: 3 }}>
                <Grid size={{ xs: 6, sm: 4 }}>
                  <Box
                    sx={{
                      p: 2,
                      borderRadius: 2,
                      backgroundColor: COLORS.background,
                    }}
                  >
                    <Typography variant="caption" color={COLORS.textSecondary}>
                      Total Revenue
                    </Typography>

                    <Typography
                      sx={{
                        mt: 0.5,
                        fontSize: 20,
                        fontWeight: 700,
                        color: COLORS.text,
                      }}
                    >
                      ₹8.42L
                    </Typography>
                  </Box>
                </Grid>

                <Grid size={{ xs: 6, sm: 4 }}>
                  <Box
                    sx={{
                      p: 2,
                      borderRadius: 2,
                      backgroundColor: COLORS.background,
                    }}
                  >
                    <Typography variant="caption" color={COLORS.textSecondary}>
                      This Month
                    </Typography>

                    <Typography
                      sx={{
                        mt: 0.5,
                        fontSize: 20,
                        fontWeight: 700,
                        color: COLORS.text,
                      }}
                    >
                      ₹74.8K
                    </Typography>
                  </Box>
                </Grid>

                <Grid size={{ xs: 12, sm: 4 }}>
                  <Box
                    sx={{
                      p: 2,
                      borderRadius: 2,
                      backgroundColor: COLORS.successLight,
                    }}
                  >
                    <Typography variant="caption" color={COLORS.textSecondary}>
                      Growth
                    </Typography>

                    <Typography
                      sx={{
                        mt: 0.5,
                        fontSize: 20,
                        fontWeight: 700,
                        color: COLORS.success,
                      }}
                    >
                      +14.8%
                    </Typography>
                  </Box>
                </Grid>
              </Grid>

              {/* Chart */}

              <Box
                sx={{
                  height: 210,
                  borderRadius: 2,

                  background: `linear-gradient(
                    180deg,
                    ${COLORS.primaryLight} 0%,
                    ${COLORS.card} 100%
                  )`,

                  border: `1px solid ${COLORS.border}`,

                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Stack alignItems="center" spacing={1}>
                  <Payments
                    sx={{
                      fontSize: 32,
                      color: COLORS.primary,
                    }}
                  />

                  <Typography fontWeight={600} color={COLORS.textSecondary}>
                    Revenue analytics
                  </Typography>

                  <Typography variant="caption" color={COLORS.textSecondary}>
                    Connect payment analytics here
                  </Typography>
                </Stack>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* ================= LEADS ================= */}

        <Grid size={{ xs: 12, lg: 4 }}>
          <Card
            elevation={0}
            sx={{
              height: "100%",
              borderRadius: 3,
              border: `1px solid ${COLORS.border}`,
              backgroundColor: COLORS.card,
            }}
          >
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" fontWeight={700} color={COLORS.text}>
                Lead Overview
              </Typography>

              <Typography
                variant="body2"
                color={COLORS.textSecondary}
                sx={{ mt: 0.5, mb: 3 }}
              >
                Current lead distribution.
              </Typography>

              <Stack spacing={2.5}>
                {leadOverview.map((item) => (
                  <Box key={item.label}>
                    <Stack
                      direction="row"
                      alignItems="center"
                      justifyContent="space-between"
                      sx={{ mb: 1 }}
                    >
                      <Typography
                        variant="body2"
                        color={COLORS.text}
                        fontWeight={500}
                      >
                        {item.label}
                      </Typography>

                      <Typography
                        variant="body2"
                        color={COLORS.text}
                        fontWeight={700}
                      >
                        {item.value}
                      </Typography>
                    </Stack>

                    <Box
                      sx={{
                        height: 7,
                        borderRadius: 10,
                        overflow: "hidden",
                        backgroundColor: COLORS.background,
                      }}
                    >
                      <Box
                        sx={{
                          width: `${item.percentage}%`,
                          height: "100%",
                          borderRadius: 10,
                          backgroundColor: COLORS.primary,
                        }}
                      />
                    </Box>
                  </Box>
                ))}
              </Stack>

              <Divider sx={{ my: 3 }} />

              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
              >
                <Typography variant="body2" color={COLORS.textSecondary}>
                  Total Leads
                </Typography>

                <Typography fontWeight={700} color={COLORS.text}>
                  589
                </Typography>
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        {/* ================= RECENT SUBSCRIPTIONS ================= */}

        <Grid size={{ xs: 12 }}>
          <Card
            elevation={0}
            sx={{
              borderRadius: 3,
              border: `1px solid ${COLORS.border}`,
              backgroundColor: COLORS.card,
              overflow: "hidden",
            }}
          >
            <Box sx={{ p: 3 }}>
              <Stack
                direction={{
                  xs: "column",
                  sm: "row",
                }}
                alignItems={{
                  xs: "flex-start",
                  sm: "center",
                }}
                justifyContent="space-between"
                gap={2}
              >
                <Box>
                  <Typography variant="h6" fontWeight={700} color={COLORS.text}>
                    Recent Subscriptions
                  </Typography>

                  <Typography
                    variant="body2"
                    color={COLORS.textSecondary}
                    sx={{ mt: 0.5 }}
                  >
                    Latest subscription activity.
                  </Typography>
                </Box>

                <CustomButton variant="text" endIcon={<ArrowForward />}>
                  View All
                </CustomButton>
              </Stack>
            </Box>

            <Divider />

            {recentSubscriptions.map((subscription, index) => (
              <Box key={subscription.name}>
                <Box
                  sx={{
                    px: 3,
                    py: 2,

                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",

                    gap: 2,

                    "&:hover": {
                      backgroundColor: COLORS.background,
                    },
                  }}
                >
                  <Stack
                    direction="row"
                    spacing={2}
                    alignItems="center"
                    minWidth={0}
                  >
                    <Box
                      sx={{
                        width: 40,
                        height: 40,
                        minWidth: 40,

                        borderRadius: 2,

                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",

                        backgroundColor: COLORS.primaryLight,

                        color: COLORS.primary,

                        fontWeight: 700,
                      }}
                    >
                      {subscription.name.charAt(0).toUpperCase()}
                    </Box>

                    <Box minWidth={0}>
                      <Typography variant="body2" fontWeight={650} noWrap>
                        {subscription.name}
                      </Typography>

                      <Typography
                        variant="caption"
                        color={COLORS.textSecondary}
                      >
                        {subscription.plan}
                      </Typography>
                    </Box>
                  </Stack>

                  <Stack
                    direction="row"
                    spacing={2}
                    alignItems="center"
                    flexShrink={0}
                  >
                    <Typography
                      variant="body2"
                      fontWeight={700}
                      color={COLORS.text}
                    >
                      {subscription.amount}
                    </Typography>

                    <Chip
                      label={subscription.status}
                      size="small"
                      color={
                        subscription.status === "Active" ? "success" : "warning"
                      }
                      sx={{
                        minWidth: 72,
                        fontWeight: 600,
                      }}
                    />
                  </Stack>
                </Box>

                {index < recentSubscriptions.length - 1 && <Divider />}
              </Box>
            ))}
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
