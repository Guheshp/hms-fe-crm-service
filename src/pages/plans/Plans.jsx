import { Add, Delete, Edit } from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Divider,
  Grid,
  Stack,
  Typography,
} from "@mui/material";

import PageHeader from "../../components/common/PageHeader";
import { useEffect, useState } from "react";
import { deletePlan, getPlans } from "../../api/plans";
import { useNavigate } from "react-router-dom";
import { BILLING_CYCLE_OPTIONS } from "../../constants/app";
import { deletePlanFeature } from "../../api/planFeatures";
import { successAlert } from "../../utils/alerts";
import { confirmDelete } from "../../utils/confirm";

const Plans = () => {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [params, setParams] = useState({
    page: 1,
    limit: 10,
    search: "",
  });

  const [totalRecords, setTotalRecords] = useState(0);

  const getAllPlans = async () => {
    try {
      setLoading(true);

      const response = await getPlans(params);

      setPlans(response.data.data);
      setTotalRecords(response.data.pagination.totalRecords);
    } catch (error) {
      errorAlert(error.response?.data?.message || "Failed to fetch plans.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllPlans();
  }, [params.page, params.limit, params.search]);

  const handleDelete = async (plan) => {
    const result = await confirmDelete(
      "Delete Plan?",
      `Are you sure you want to delete "${plan.name}"?`,
    );

    if (!result.isConfirmed) return;

    try {
      setLoading(true);

      // Delete plan feature
      if (plan.featureid) {
        await deletePlanFeature(plan.featureid);
      }

      // Delete plan
      const response = await deletePlan(plan.planid || plan.id);

      successAlert(response.data.message || "Plan deleted successfully.");

      await getAllPlans();
    } catch (error) {
      errorAlert(error.response?.data?.message || "Failed to delete plan.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <PageHeader
        title="Subscription Plans"
        subtitle="Manage your subscription plans."
        buttonText="Create Plan"
        buttonIcon={<Add />}
        onButtonClick={() => navigate("/plans/create")}
      />

      <Grid container spacing={3}>
        {plans.map((plan) => {
          const billingCycle = BILLING_CYCLE_OPTIONS?.find(
            (item) => item.id === Number(plan.billingcycle),
          );

          return (
            <Grid size={{ xs: 12, sm: 6, lg: 4 }} key={plan.id}>
              <Card
                elevation={0}
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  borderRadius: 4,
                  border: "1px solid",
                  borderColor: "divider",
                  overflow: "hidden",
                  transition: "all 0.25s ease",
                  "&:hover": {
                    transform: "translateY(-6px)",
                    boxShadow: "0 12px 30px rgba(15, 23, 42, 0.10)",
                    borderColor: "primary.main",
                  },
                }}
              >
                {/* Header */}
                <Box
                  sx={{
                    px: 3,
                    py: 3,
                    bgcolor: "#F8FAFC",
                    borderBottom: "1px solid",
                    borderColor: "divider",
                  }}
                >
                  <div className="flex items-start justify-between gap-2">
                    <Box>
                      <Typography variant="h6" fontWeight={700}>
                        {plan.name}
                      </Typography>

                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ mt: 0.5 }}
                      >
                        {plan.plancode}
                      </Typography>
                    </Box>

                    <Chip
                      label={billingCycle?.name || "-"}
                      size="small"
                      color="primary"
                      variant="outlined"
                      sx={{
                        fontWeight: 600,
                        borderRadius: 2,
                      }}
                    />
                  </div>
                </Box>

                {/* Body */}
                <CardContent
                  sx={{
                    p: 3,
                    display: "flex",
                    flexDirection: "column",
                    flex: 1,
                  }}
                >
                  {/* Price */}
                  <Stack
                    direction="row"
                    alignItems="baseline"
                    spacing={1}
                    sx={{ mb: 3 }}
                  >
                    <Typography
                      variant="h3"
                      fontWeight={800}
                      color="primary.main"
                    >
                      ₹{Number(plan.price).toLocaleString("en-IN")}
                    </Typography>

                    <Typography variant="body2" color="text.secondary">
                      / {billingCycle?.name?.toLowerCase()}
                    </Typography>
                  </Stack>

                  {/* Description */}
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      minHeight: 48,
                      lineHeight: 1.6,
                      mb: 3,
                    }}
                  >
                    {plan.description || "No description available."}
                  </Typography>

                  <Divider sx={{ mb: 3 }} />

                  {/* Features */}
                  <Box sx={{ flex: 1 }}>
                    <Typography
                      variant="subtitle1"
                      fontWeight={700}
                      sx={{ mb: 2 }}
                    >
                      What's included
                    </Typography>

                    <Stack spacing={1.5}>
                      {plan.features?.length ? (
                        plan.features.map((feature) => (
                          <Stack
                            key={feature}
                            direction="row"
                            spacing={1.2}
                            alignItems="center"
                          >
                            <Box
                              sx={{
                                width: 22,
                                height: 22,
                                borderRadius: "50%",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                bgcolor: "#DCFCE7",
                                color: "#16A34A",
                                fontSize: 13,
                                fontWeight: 700,
                                flexShrink: 0,
                              }}
                            >
                              ✓
                            </Box>

                            <Typography variant="body2">{feature}</Typography>
                          </Stack>
                        ))
                      ) : (
                        <Typography variant="body2" color="text.secondary">
                          No features available.
                        </Typography>
                      )}
                    </Stack>
                  </Box>

                  {/* Action */}
                  {/* Action */}
                  <Box
                    sx={{
                      mt: 4,
                      display: "flex",
                      gap: 1.5,
                    }}
                  >
                    <Button
                      fullWidth
                      variant="outlined"
                      startIcon={<Edit />}
                      onClick={() => navigate(`/plans/edit/${plan.planid}`)}
                      sx={{
                        py: 1.2,
                        borderRadius: 2,
                        textTransform: "none",
                        fontWeight: 600,
                      }}
                    >
                      Edit Plan
                    </Button>

                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() => handleDelete(plan)}
                      sx={{
                        minWidth: 48,
                        width: 48,
                        height: 48,
                        borderRadius: 2,
                        p: 0,
                      }}
                    >
                      <Delete fontSize="small" />
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </>
  );
};

export default Plans;
