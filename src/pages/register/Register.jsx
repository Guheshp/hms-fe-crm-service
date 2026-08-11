import * as yup from "yup";
import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  FormControlLabel,
  Checkbox,
  Typography,
} from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import InputField from "../../components/forms/InputField";

import { APP_NAME } from "../../constants/app";
import { errorAlert, successAlert } from "../../utils/alerts";
import { useState } from "react";
import { register } from "../../api/auth";

const defaultValues = {
  firstname: "",
  lastname: "",
  email: "",
  phone: "",
  acceptTerms: false,
};

const registrationSchema = yup.object({
  firstname: yup.string().required("First name is required."),
  lastname: yup.string().required("Last name is required."),
  email: yup
    .string()
    .email("Please enter a valid email address.")
    .required("Email address is required."),
  phone: yup
    .string()
    .matches(/^[0-9]{10}$/, "Phone number must be 10 digits.")
    .required("Phone number is required."),
  acceptTerms: yup.boolean().oneOf([true], "Please accept Terms & Conditions."),
});

const Register = () => {
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const { control, handleSubmit, reset } = useForm({
    resolver: yupResolver(registrationSchema),
    defaultValues,
  });

  const onSubmit = async (data) => {
    try {
      setLoading(true);

      const payload = {
        firstname: data.firstName,
        lastname: data.lastName,
        email: data.email,
        phone: data.phone,
      };

      const response = await register(data);
      console.log("response", response);
      successAlert(response.data.message);

      reset();

      navigate("/login");
    } catch (error) {
      errorAlert(error.response?.data?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <section className="flex min-h-screen items-center justify-center bg-slate-50 px-6 py-12">
      <div className="w-full max-w-5xl">
        <Card
          elevation={0}
          sx={{
            borderRadius: 4,
            border: "1px solid",
            borderColor: "divider",
            boxShadow: "0 10px 30px rgba(15,23,42,.08)",
          }}
        >
          <CardContent sx={{ p: 5 }}>
            <div className="mb-8">
              <Typography variant="h5" fontWeight={600}>
                Create Account
              </Typography>

              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                Register a new account to access the CRM system.
              </Typography>
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="grid grid-cols-1 gap-5 md:grid-cols-4">
                {/* First Name */}
                <Controller
                  name="firstname"
                  control={control}
                  render={({ field, fieldState }) => (
                    <InputField
                      label="First Name"
                      required
                      placeholder="Enter first name"
                      {...field}
                      error={fieldState.error}
                    />
                  )}
                />

                {/* Last Name */}
                <Controller
                  name="lastname"
                  control={control}
                  render={({ field, fieldState }) => (
                    <InputField
                      label="Last Name"
                      required
                      placeholder="Enter last name"
                      {...field}
                      error={fieldState.error}
                    />
                  )}
                />

                {/* Email */}
                <Controller
                  name="email"
                  control={control}
                  render={({ field, fieldState }) => (
                    <InputField
                      label="Email Address"
                      type="email"
                      required
                      placeholder="Enter email"
                      {...field}
                      error={fieldState.error}
                    />
                  )}
                />

                {/* Phone */}
                <Controller
                  name="phone"
                  control={control}
                  render={({ field, fieldState }) => (
                    <InputField
                      label="Phone Number"
                      required
                      placeholder="9876543210"
                      {...field}
                      error={fieldState.error}
                    />
                  )}
                />
              </div>

              {/* Terms */}
              <Controller
                name="acceptTerms"
                control={control}
                render={({ field, fieldState }) => (
                  <>
                    <FormControlLabel
                      sx={{ mt: 2 }}
                      control={
                        <Checkbox
                          checked={field.value}
                          onChange={(e) => field.onChange(e.target.checked)}
                        />
                      }
                      label="I agree to the Terms & Conditions"
                    />
                    {fieldState.error && (
                      <Typography
                        color="error"
                        variant="caption"
                        display="block"
                      >
                        {fieldState.error.message}
                      </Typography>
                    )}
                  </>
                )}
              />

              <Button type="submit" variant="contained" disabled={loading}>
                {loading ? "Creating..." : "Create Account"}
              </Button>

              <Divider sx={{ my: 4 }} />

              <Typography align="center" variant="body2" color="text.secondary">
                Already have an account?
              </Typography>

              <Box textAlign="center" mt={1}>
                <Button
                  variant="text"
                  onClick={() => navigate("/login")}
                  sx={{
                    textTransform: "none",
                    fontWeight: 600,
                  }}
                >
                  Sign In
                </Button>
              </Box>

              <Typography
                variant="caption"
                color="text.secondary"
                align="center"
                display="block"
                mt={3}
              >
                © {new Date().getFullYear()} {APP_NAME}. All rights reserved.
              </Typography>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default Register;
