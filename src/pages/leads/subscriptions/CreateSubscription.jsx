import { useEffect, useState } from "react";
import * as yup from "yup";

import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import moment from "moment";

import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Grid,
  MenuItem,
  Stack,
  Typography,
} from "@mui/material";

import { useParams, useNavigate } from "react-router-dom";

import InputField from "../../../components/forms/InputField";
import Dropdown from "../../../components/forms/Dropdown";

import { errorAlert, successAlert } from "../../../utils/alerts";

import { getPlans } from "../../../api/plans";
import { createSubscription } from "../../../api/subscriptions";

import {
  BILLING_CYCLE_OPTIONS,
  SUBSCRIPTION_STATUS_OPTIONS,
} from "../../../constants/app";
import CustomButton from "../../../components/common/Button";
import {
  createRazorpayOrder,
  verifyRazorpayPayment,
} from "../../../api/payments";

// import {
//   createRazorpayOrder,
//   verifyRazorpayPayment,
// } from "../../../api/subscriptions";

const defaultValues = {
  leadid: "",
  organizationid: "",
  planid: "",

  billingcycle: "",

  startdate: "",
  enddate: "",

  amount: "",
  discount: 5,
  tax: 18,
  totalamount: 0,
  subscriptionstatus: 1,
};

const schema = yup.object({
  leadid: yup.string().required("Lead is required."),

  organizationid: yup.string().nullable(),

  planid: yup.string().required("Plan is required."),

  billingcycle: yup
    .number()
    .typeError("Billing cycle is required.")
    .required("Billing cycle is required."),

  startdate: yup.string().required("Start date is required."),

  enddate: yup
    .string()
    .required("End date is required.")
    .test("end-date", "End date must be after start date.", function (value) {
      const { startdate } = this.parent;

      if (!startdate || !value) {
        return true;
      }

      return new Date(value) > new Date(startdate);
    }),

  amount: yup
    .number()
    .typeError("Amount is required.")
    .min(0, "Amount cannot be negative.")
    .required("Amount is required."),

  discount: yup
    .number()
    .typeError("Discount must be a number.")
    .min(0, "Discount cannot be negative.")
    .default(0),

  tax: yup
    .number()
    .typeError("Tax must be a number.")
    .min(0, "Tax cannot be negative.")
    .default(0),

  totalamount: yup.number().min(0).required(),

  subscriptionstatus: yup.number().required("Subscription status is required."),
});

const CreateSubscription = () => {
  const { leadid: leadId } = useParams();
  console.log("leadId", leadId);
  const navigate = useNavigate();

  const [plans, setPlans] = useState([]);

  const [loading, setLoading] = useState(false);

  const { control, handleSubmit, reset, watch, setValue } = useForm({
    resolver: yupResolver(schema),
    defaultValues,
  });

  const selectedPlanId = watch("planid");

  const amount = Number(watch("amount")) || 0;

  const discount = Number(watch("discount")) || 0;

  const tax = Number(watch("tax")) || 0;

  const totalamount = Number(watch("totalamount")) || 0;

  const startDate = watch("startdate");

  const billingCycle = watch("billingcycle");

  const subscriptionStatus = watch("subscriptionstatus");

  const getAllPlans = async () => {
    try {
      setLoading(true);

      const response = await getPlans({
        page: 1,
        limit: 100,
      });

      setPlans(response.data.data || []);
    } catch (error) {
      errorAlert(error.response?.data?.message || "Failed to fetch plans.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (leadId) {
      setValue("leadid", leadId);
    }

    getAllPlans();
  }, [leadId]);
  console.log(plans);
  useEffect(() => {
    if (!selectedPlanId) {
      setValue("amount", "");
      setValue("billingcycle", "");

      return;
    }

    const selectedPlan = plans.find((plan) => plan.id === selectedPlanId);

    if (!selectedPlan) return;

    setValue("amount", Number(selectedPlan?.price) || 0);

    setValue("billingcycle", Number(selectedPlan?.billingcycle));
  }, [selectedPlanId, plans, setValue]);

  useEffect(() => {
    const amountValue = Number(amount) || 0;
    const discountValue = Number(discount) || 0;
    const taxValue = Number(tax) || 0;

    const discountAmount = (amountValue * discountValue) / 100;

    const taxableAmount = Math.max(amountValue - discountAmount, 0);

    const taxAmount = (taxableAmount * taxValue) / 100;

    const total = taxableAmount + taxAmount;

    setValue("totalamount", Number(total.toFixed(2)));
  }, [amount, discount, tax, setValue]);

  useEffect(() => {
    if (!startDate || !billingCycle) {
      return;
    }

    const monthsMap = {
      1: 1, // Monthly
      2: 3, // Quarterly
      3: 6, // Half Yearly
      4: 12, // Yearly
    };

    const months = monthsMap[Number(billingCycle)];

    if (!months) return;

    const endDate = moment(startDate)
      .add(months, "months")
      .subtract(1, "day")
      .format("YYYY-MM-DD");

    setValue("enddate", endDate);
  }, [startDate, billingCycle, setValue]);

  const loadRazorpay = () => {
    return new Promise((resolve) => {
      if (window.Razorpay) {
        resolve(true);
        return;
      }

      const script = document.createElement("script");

      script.src = "https://checkout.razorpay.com/v1/checkout.js";

      script.onload = () => {
        resolve(true);
      };

      script.onerror = () => {
        resolve(false);
      };

      document.body.appendChild(script);
    });
  };

  const onSubmit = async (data) => {
    try {
      setLoading(true);

      // --------------------------------
      // 1. PREPARE SUBSCRIPTION DATA
      // --------------------------------

      const payload = {
        leadid: leadId,
        organizationid: null,

        planid: data.planid,

        billingcycle: Number(data.billingcycle),

        startdate: moment(data.startdate).valueOf(),

        enddate: moment(data.enddate).valueOf(),

        amount: Number(data.amount),

        discount: Number(data.discount) || 0,

        tax: Number(data.tax) || 0,

        totalamount: Number(data.totalamount) || 0,

        subscriptionstatus: 1,
      };

      console.log("Subscription Payload:", payload);

      // --------------------------------
      // 2. LOAD RAZORPAY
      // --------------------------------

      const razorpayLoaded = await loadRazorpay();

      if (!razorpayLoaded) {
        throw new Error("Razorpay SDK could not be loaded.");
      }

      // --------------------------------
      // 3. CREATE RAZORPAY ORDER
      // --------------------------------

      const orderResponse = await createRazorpayOrder({
        amount: payload.totalamount,
      });

      const order = orderResponse?.data?.data;

      if (!order?.orderid) {
        throw new Error("Failed to create Razorpay order.");
      }

      console.log("Razorpay Order:", order);

      // --------------------------------
      // 4. OPEN RAZORPAY CHECKOUT
      // --------------------------------
      console.log("Razorpay Key:", import.meta.env.VITE_RAZORPAY_KEY_ID);
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,

        amount: order.amount,
        currency: order.currency,

        name: "Nexa CRM",
        description: "Subscription Payment",

        order_id: order.orderid,

        handler: async (response) => {
          try {
            setLoading(true);

            console.log("Razorpay Payment Response:", response);

            const verifyResponse = await verifyRazorpayPayment({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              subscription: payload,
            });

            console.log("Payment Verification Response:", verifyResponse);

            if (verifyResponse?.data?.success) {
              successAlert(
                "Payment successful! Subscription created successfully.",
              );

              navigate(`/leads/${leadId}?tab=subscriptions`);
            } else {
              errorAlert(
                verifyResponse?.data?.message || "Payment verification failed.",
              );
            }
          } catch (error) {
            console.error("Payment verification error:", error);

            errorAlert(
              error.response?.data?.message || "Payment verification failed.",
            );
          } finally {
            setLoading(false);
          }
        },

        modal: {
          ondismiss: () => {
            setLoading(false);
          },
        },

        theme: {
          color: "#1976d2",
        },
      };

      const razorpayInstance = new window.Razorpay(options);

      razorpayInstance.on("payment.failed", (response) => {
        console.error("Razorpay payment failed:", response.error);

        errorAlert(response.error?.description || "Payment failed.");

        setLoading(false);
      });

      razorpayInstance.open();
    } catch (error) {
      console.error("Subscription payment error:", error);

      errorAlert(
        error.response?.data?.message ||
          error.message ||
          "Failed to initiate payment.",
      );

      setLoading(false);
    }
  };

  return (
    <Box>
      <Stack sx={{ mb: 3 }}>
        <Typography variant="h5" fontWeight={700}>
          Create Subscription
        </Typography>

        <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
          Create a new subscription for this lead.
        </Typography>
      </Stack>

      <Card
        elevation={0}
        sx={{
          border: "1px solid",
          borderColor: "divider",
          borderRadius: 3,
        }}
      >
        <CardContent sx={{ p: 4 }}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={4}>
              <Box>
                <Typography variant="subtitle1" fontWeight={700} sx={{ mb: 2 }}>
                  Subscription Details
                </Typography>

                <Grid container spacing={3}>
                  {/* Plan */}
                  <Grid
                    size={{
                      xs: 12,
                      md: 4,
                    }}
                  >
                    <Controller
                      name="planid"
                      control={control}
                      render={({ field, fieldState }) => (
                        <InputField
                          {...field}
                          select
                          label="Plan"
                          required
                          error={fieldState.error}
                        >
                          <MenuItem value="">Select Plan</MenuItem>

                          {plans.map((plan) => (
                            <MenuItem
                              key={plan.id || plan.planid}
                              value={plan.id || plan.planid}
                            >
                              {plan.name} - ₹
                              {Number(plan.price).toLocaleString("en-IN")}
                            </MenuItem>
                          ))}
                        </InputField>
                      )}
                    />
                  </Grid>

                  <Grid
                    size={{
                      xs: 12,
                      md: 4,
                    }}
                  >
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
                          disabled
                          error={fieldState.error}
                        />
                      )}
                    />
                  </Grid>

                  {/* Start Date */}
                  <Grid
                    size={{
                      xs: 12,
                      md: 4,
                    }}
                  >
                    <Controller
                      name="startdate"
                      control={control}
                      render={({ field, fieldState }) => (
                        <InputField
                          {...field}
                          type="date"
                          label="Start Date"
                          required
                          InputLabelProps={{
                            shrink: true,
                          }}
                          error={fieldState.error}
                        />
                      )}
                    />
                  </Grid>

                  {/* End Date */}
                  <Grid
                    size={{
                      xs: 12,
                      md: 4,
                    }}
                  >
                    <Controller
                      name="enddate"
                      control={control}
                      render={({ field, fieldState }) => (
                        <InputField
                          {...field}
                          type="date"
                          label="End Date"
                          required
                          readOnly
                          InputLabelProps={{
                            shrink: true,
                          }}
                          error={fieldState.error}
                        />
                      )}
                    />
                  </Grid>

                  {/* Amount */}
                  <Grid
                    size={{
                      xs: 12,
                      md: 4,
                    }}
                  >
                    <Controller
                      name="amount"
                      control={control}
                      render={({ field, fieldState }) => (
                        <InputField
                          {...field}
                          type="number"
                          label="Amount"
                          required
                          readOnly
                          error={fieldState.error}
                        />
                      )}
                    />
                  </Grid>

                  {/* Discount */}
                  <Grid
                    size={{
                      xs: 12,
                      md: 4,
                    }}
                  >
                    <Controller
                      name="discount"
                      control={control}
                      render={({ field, fieldState }) => (
                        <InputField
                          {...field}
                          type="number"
                          label="Discount (%)"
                          readOnly
                          error={fieldState.error}
                        />
                      )}
                    />
                  </Grid>

                  {/* Tax */}
                  <Grid
                    size={{
                      xs: 12,
                      md: 4,
                    }}
                  >
                    <Controller
                      name="tax"
                      control={control}
                      render={({ field, fieldState }) => (
                        <InputField
                          {...field}
                          type="number"
                          label="Tax (%)"
                          error={fieldState.error}
                        />
                      )}
                    />
                  </Grid>
                  {/* Total Amount */}
                  <Grid
                    size={{
                      xs: 12,
                      md: 4,
                    }}
                  >
                    <Controller
                      name="totalamount"
                      control={control}
                      render={({ field }) => (
                        <InputField
                          {...field}
                          type="number"
                          label="Total Amount"
                          readOnly
                        />
                      )}
                    />
                  </Grid>
                </Grid>
              </Box>

              <Divider />

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  gap: 2,
                }}
              >
                <CustomButton
                  back
                  to={`/leads/${leadId}?tab=subscriptions`}
                  variant="outlined"
                >
                  Cancel
                </CustomButton>

                <CustomButton type="submit" loading={loading}>
                  Pay ₹{Number(totalamount).toLocaleString("en-IN")}
                </CustomButton>
              </Box>
            </Stack>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
};

export default CreateSubscription;
