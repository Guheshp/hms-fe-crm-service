import { useEffect, useState } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";

import {
  Box,
  Card,
  CardContent,
  Divider,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";

import { Add, Delete } from "@mui/icons-material";

import InputField from "../../components/forms/InputField";
import Dropdown from "../../components/forms/Dropdown";
import CustomButton from "../../components/common/Button";
import PageHeader from "../../components/common/PageHeader";

import { getPlanById, updatePlan } from "../../api/plans";
import {
  getPlanFeatureById,
  getPlanFeatures,
  updatePlanFeature,
} from "../../api/planFeatures";

import { errorAlert, successAlert } from "../../utils/alerts";
import { BILLING_CYCLE_OPTIONS } from "../../constants/app";

const schema = yup.object({
  plancode: yup.string().trim().required("Plan Code is required."),

  name: yup.string().trim().required("Plan Name is required."),

  price: yup
    .number()
    .typeError("Price is required.")
    .required("Price is required.")
    .positive("Price must be greater than 0."),

  billingcycle: yup
    .number()
    .typeError("Billing Cycle is required.")
    .required("Billing Cycle is required."),

  description: yup.string().trim().nullable(),

  features: yup
    .array()
    .of(
      yup.object({
        features: yup.string().trim().required("Feature is required."),
      }),
    )
    .min(1, "At least one feature is required."),
});

const defaultValues = {
  plancode: "",
  name: "",
  price: "",
  billingcycle: "",
  description: "",
  features: [
    {
      features: "",
    },
  ],
};

const PlanEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(true);
  const [planFeature, setPlanFeature] = useState(null);
  const { control, handleSubmit, reset } = useForm({
    resolver: yupResolver(schema),
    defaultValues,
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "features",
  });

  const getPlan = async () => {
    try {
      setLoadingData(true);

      const response = await getPlanFeatures({
        id,
      });

      const planList = response.data.data || [];

      const plan = planList.find((item) => item.planid === id);

      if (!plan) {
        errorAlert("Plan not found.");
        return;
      }

      setPlanFeature(plan);

      const features = (plan.features || []).map((feature) => ({
        features: feature,
      }));

      reset({
        plancode: plan.plancode || "",
        name: plan.name || "",
        price: plan.price || "",
        billingcycle: Number(plan.billingcycle) || "",
        description: plan.description || "",
        features: features.length > 0 ? features : [{ features: "" }],
      });
    } catch (error) {
      errorAlert(error.response?.data?.message || "Failed to fetch plan.");
    } finally {
      setLoadingData(false);
    }
  };

  useEffect(() => {
    if (id) {
      getPlan();
    }
  }, [id]);

  const handleAddFeature = () => {
    append({
      features: "",
    });
  };

  const handleRemoveFeature = (index) => {
    if (fields.length === 1) {
      return;
    }

    remove(index);
  };

  const onSubmit = async (data) => {
    try {
      setLoading(true);

      const planPayload = {
        id,
        plancode: data.plancode.trim(),
        name: data.name.trim(),
        price: Number(data.price),
        billingcycle: Number(data.billingcycle),
        description: data.description?.trim() || null,
      };

      // Update Plan
      await updatePlan(planPayload);

      // Convert form data to string array
      const features = data.features
        .map((item) => item.features.trim())
        .filter(Boolean);

      // Update Plan Features
      await updatePlanFeature({
        id: planFeature.featureid,
        planid: id,
        features,
        value: "Included",
      });

      successAlert("Plan updated successfully.");

      navigate("/plans");
    } catch (error) {
      errorAlert(error.response?.data?.message || "Failed to update plan.");
    } finally {
      setLoading(false);
    }
  };

  if (loadingData) {
    return (
      <>
        <PageHeader
          title="Edit Plan"
          subtitle="Update subscription plan."
          showBackButton
          backPath="/plans"
        />

        <Card
          elevation={0}
          sx={{
            borderRadius: 3,
            border: "1px solid",
            borderColor: "divider",
          }}
        >
          <CardContent
            sx={{
              py: 8,
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Typography color="text.secondary">Loading plan...</Typography>
          </CardContent>
        </Card>
      </>
    );
  }

  return (
    <>
      <PageHeader
        title="Edit Plan"
        subtitle="Update subscription plan details."
        showBackButton
        backPath="/plans"
      />

      <form onSubmit={handleSubmit(onSubmit)}>
        <Card
          elevation={0}
          sx={{
            borderRadius: 3,
            border: "1px solid",
            borderColor: "divider",
          }}
        >
          <CardContent sx={{ p: 4 }}>
            <Typography variant="h6" fontWeight={700} sx={{ mb: 3 }}>
              Plan Information
            </Typography>

            <Grid container spacing={3}>
              <Grid size={{ xs: 12, md: 6 }}>
                <Controller
                  name="plancode"
                  control={control}
                  render={({ field, fieldState }) => (
                    <InputField
                      {...field}
                      label="Plan Code"
                      required
                      placeholder="Enter Plan Code"
                      error={fieldState.error}
                    />
                  )}
                />
              </Grid>

              <Grid size={{ xs: 12, md: 6 }}>
                <Controller
                  name="name"
                  control={control}
                  render={({ field, fieldState }) => (
                    <InputField
                      {...field}
                      label="Plan Name"
                      required
                      placeholder="Enter Plan Name"
                      error={fieldState.error}
                    />
                  )}
                />
              </Grid>

              <Grid size={{ xs: 12, md: 6 }}>
                <Controller
                  name="price"
                  control={control}
                  render={({ field, fieldState }) => (
                    <InputField
                      {...field}
                      type="number"
                      label="Price"
                      required
                      placeholder="Enter Price"
                      error={fieldState.error}
                    />
                  )}
                />
              </Grid>

              <Grid size={{ xs: 12, md: 6 }}>
                <Controller
                  name="billingcycle"
                  control={control}
                  render={({ field, fieldState }) => (
                    <Dropdown
                      label="Billing Cycle"
                      required
                      options={BILLING_CYCLE_OPTIONS}
                      value={field.value}
                      onChange={(value) => field.onChange(Number(value))}
                      valueKey="id"
                      labelKey="name"
                      placeholder="Select Billing Cycle"
                      error={fieldState.error}
                    />
                  )}
                />
              </Grid>

              <Grid size={{ xs: 12 }}>
                <Controller
                  name="description"
                  control={control}
                  render={({ field, fieldState }) => (
                    <InputField
                      {...field}
                      label="Description"
                      multiline
                      rows={4}
                      placeholder="Enter Description"
                      error={fieldState.error}
                    />
                  )}
                />
              </Grid>
            </Grid>

            <Divider sx={{ my: 4 }} />

            {/* Features */}

            <Box>
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <Typography variant="h6" fontWeight={700}>
                    Plan Features
                  </Typography>

                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mt: 0.5 }}
                  >
                    Manage the features included in this plan.
                  </Typography>
                </div>

                <CustomButton
                  type="button"
                  startIcon={<Add />}
                  onClick={handleAddFeature}
                >
                  Add Feature
                </CustomButton>
              </div>

              <div className="space-y-4">
                {fields.map((item, index) => (
                  <div key={item.id} className="flex items-start gap-3">
                    <div className="flex-1">
                      <Controller
                        name={`features.${index}.features`}
                        control={control}
                        render={({ field, fieldState }) => (
                          <InputField
                            {...field}
                            label={index === 0 ? "Feature" : ""}
                            required
                            placeholder="Enter Feature"
                            error={fieldState.error}
                          />
                        )}
                      />
                    </div>

                    <IconButton
                      color="error"
                      disabled={fields.length === 1}
                      onClick={() => handleRemoveFeature(index)}
                      sx={{
                        mt: index === 0 ? 4 : 0,
                      }}
                    >
                      <Delete />
                    </IconButton>
                  </div>
                ))}
              </div>
            </Box>

            {/* Footer */}

            <Divider sx={{ my: 4 }} />

            <Box className="flex justify-end gap-3">
              <CustomButton
                type="button"
                variant="outlined"
                onClick={() => navigate("/plans")}
              >
                Cancel
              </CustomButton>

              <CustomButton type="submit" loading={loading}>
                Update Plan
              </CustomButton>
            </Box>
          </CardContent>
        </Card>
      </form>
    </>
  );
};

export default PlanEdit;
