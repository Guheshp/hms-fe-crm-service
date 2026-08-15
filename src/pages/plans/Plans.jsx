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
          const billingCycle = BILLING_CYCLE_OPTIONS.find(
            (item) => item.id === Number(plan.billingcycle),
          );

          return (
            <Grid size={{ xs: 12, md: 6, lg: 4 }} key={plan.planid}>
              <Card
                elevation={0}
                sx={{
                  height: "100%",
                  borderRadius: 4,
                  border: "1px solid",
                  borderColor: "divider",
                  transition: "0.3s",

                  "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: "0 12px 24px rgba(0,0,0,.08)",
                  },
                }}
              >
                <CardContent className="flex h-full flex-col p-6">
                  {/* Header */}

                  <div className="mb-6 flex items-start justify-between">
                    <div>
                      <Typography
                        sx={{
                          fontSize: 22,
                          fontWeight: 700,
                        }}
                      >
                        {plan.name}
                      </Typography>

                      <Typography
                        sx={{
                          fontSize: 14,
                          color: "text.secondary",
                        }}
                      >
                        {plan.plancode}
                      </Typography>
                    </div>

                    <Chip
                      label={billingCycle?.name || "-"}
                      color="primary"
                      size="small"
                    />
                  </div>

                  {/* Price */}

                  <div className="mb-6 rounded-3xl bg-slate-50 p-5 text-center">
                    <Typography
                      sx={{
                        fontSize: 40,
                        fontWeight: 800,
                        color: "primary.main",
                      }}
                    >
                      ₹{Number(plan.price || 0).toLocaleString("en-IN")}
                    </Typography>

                    <Typography
                      sx={{
                        color: "text.secondary",
                      }}
                    >
                      per {billingCycle?.name?.toLowerCase()}
                    </Typography>
                  </div>

                  {/* Description */}

                  <Typography
                    sx={{
                      mb: 4,
                      color: "text.secondary",
                      minHeight: 60,
                      lineHeight: 1.7,
                    }}
                  >
                    {plan.description || "No description available."}
                  </Typography>

                  <Divider sx={{ mb: 3 }} />

                  {/* Features */}

                  <div className="mb-4 flex items-center justify-between">
                    <Typography fontWeight={700}>Features</Typography>

                    <Chip
                      label={`${plan.features?.length || 0} Included`}
                      size="small"
                      variant="outlined"
                    />
                  </div>

                  <div className="flex flex-1 flex-col gap-3">
                    {plan.features?.length ? (
                      plan.features.map((feature, index) => (
                        <div key={index} className="flex items-center gap-3">
                          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-green-100 text-sm font-bold text-green-600">
                            ✓
                          </div>

                          <Typography>{feature}</Typography>
                        </div>
                      ))
                    ) : (
                      <Typography color="text.secondary">
                        No features available.
                      </Typography>
                    )}
                  </div>

                  {/* Buttons */}

                  <div className="mt-6 flex gap-3">
                    <Button
                      fullWidth
                      variant="contained"
                      startIcon={<Edit />}
                      onClick={() => navigate(`/plans/edit/${plan.planid}`)}
                      sx={{
                        borderRadius: 2,
                        textTransform: "none",
                      }}
                    >
                      Edit
                    </Button>

                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() => handleDelete(plan)}
                      sx={{
                        minWidth: 50,
                        borderRadius: 2,
                      }}
                    >
                      <Delete />
                    </Button>
                  </div>
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
