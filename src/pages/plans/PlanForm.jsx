import { useState } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useFieldArray, useForm } from "react-hook-form";

import {
  Box,
  Card,
  CardContent,
  Divider,
  Grid,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";

import { Add, Close, Delete } from "@mui/icons-material";

import InputField from "../../components/forms/InputField";
import Dropdown from "../../components/forms/Dropdown";
import CustomButton from "../../components/common/Button";

import { createPlan } from "../../api/plans";
import { createPlanFeature } from "../../api/planFeatures";

import { successAlert, errorAlert } from "../../utils/alerts";
import { useNavigate } from "react-router-dom";
import { BILLING_CYCLE_OPTIONS } from "../../constants/app";

const schema = yup.object({
  plancode: yup.string().trim().required("Plan Code is required."),

  name: yup.string().trim().required("Plan Name is required."),

  price: yup
    .number()
    .typeError("Price is required.")
    .required("Price is required.")
    .positive(),

  billingcycle: yup.number().required("Billing Cycle is required."),

  description: yup.string().nullable(),

  features: yup
    .array()
    .of(
      yup.object({
        features: yup.string().trim().required("Feature is required."),
      }),
    )
    .min(1),
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
const PlanForm = ({ onClose, getAllPlans }) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { control, handleSubmit, reset } = useForm({
    resolver: yupResolver(schema),
    defaultValues,
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "features",
  });

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      console.log(data);
      const payload = {
        plancode: data.plancode.trim(),
        name: data.name.trim(),
        price: Number(data.price),
        billingcycle: Number(data.billingcycle),
        description: data.description?.trim() || null,
      };

      // Create Plan
      const response = await createPlan(payload);

      const planId = response.data.data.id;

      // Convert feature objects to string array
      const features = data.features
        .map((item) => item.features.trim())
        .filter(Boolean);

      await createPlanFeature({
        planid: planId,
        features,
        value: "Included",
      });

      successAlert("Plan created successfully.");

      reset();

      if (getAllPlans) {
        getAllPlans();
      }

      navigate("/plans");
    } catch (error) {
      errorAlert(error.response?.data?.message || "Failed to create plan.");
    } finally {
      setLoading(false);
    }
  };

  const handleAddFeature = () => {
    append({
      features: "",
    });
  };

  const handleRemoveFeature = (index) => {
    if (fields.length === 1) return;

    remove(index);
  };

  return (
    <>
      {" "}
      <Card
        elevation={0}
        sx={{
          borderRadius: 3,
          border: "1px solid",
          borderColor: "divider",
        }}
      >
        <CardContent sx={{ p: 4 }}>
          <form onSubmit={handleSubmit(onSubmit)}>
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

            {/* ---------------- Plan Features ---------------- */}

            <Card
              elevation={0}
              sx={{
                borderRadius: 3,
                border: "1px solid",
                borderColor: "divider",
              }}
            >
              <CardContent>
                <div className="mb-6 flex items-center justify-between">
                  <Typography variant="h6" fontWeight={700}>
                    Plan Features
                  </Typography>

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
                        sx={{ mt: index === 0 ? 4 : 0 }}
                        onClick={() => handleRemoveFeature(index)}
                        disabled={fields.length === 1}
                      >
                        <Delete />
                      </IconButton>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Divider sx={{ my: 2 }} />

            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                gap: 2,
              }}
            >
              <CustomButton back to="/plans" variant="outlined">
                Cancel
              </CustomButton>

              <CustomButton type="submit" loading={loading}>
                Create Plan
              </CustomButton>
            </Box>
          </form>
        </CardContent>
      </Card>
    </>
  );
};

export default PlanForm;
