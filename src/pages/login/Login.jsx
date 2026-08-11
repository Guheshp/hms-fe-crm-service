import * as yup from "yup";
import {
  Box,
  Button,
  Card,
  CardContent,
  Checkbox,
  Divider,
  FormControlLabel,
  Typography,
} from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import { LoadingButton } from "@mui/lab";
import InputField from "../../components/forms/InputField";
import { APP_NAME } from "../../constants/app";
import OtpField from "../../components/forms/OtpField";
import { useState } from "react";
import { errorAlert, successAlert } from "../../utils/alerts";
import { login as loginApi, resendOtp, verifyOtp } from "../../api/auth";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../context/UserContext";

const Login = () => {
  const navigate = useNavigate();
  const [otpSent, setOtpSent] = useState(false);

  const [sendingOtp, setSendingOtp] = useState(false);
  const [resendingOtp, setResendingOtp] = useState(false);
  const [verifyingOtp, setVerifyingOtp] = useState(false);
  const { login } = useUser();

  const defaultValues = {
    email: "",
    otp: "",
  };

  const loginSchema = yup.object({
    email: yup
      .string()
      .email("Please enter a valid email address.")
      .required("Email address is required."),

    otp: yup.string().when([], {
      is: () => otpSent,
      then: (schema) =>
        schema.required("OTP is required.").length(6, "OTP must be 6 digits."),
      otherwise: (schema) => schema.notRequired(),
    }),
  });

  const handleSendOtp = async () => {
    const email = watch("email");

    if (!email) {
      errorAlert("Please enter your email.");
      return;
    }

    try {
      setSendingOtp(true);

      const response = await loginApi({
        email,
      });

      successAlert(response.data.message);

      setOtpSent(true);
    } catch (error) {
      errorAlert(error.response?.data?.message || "Something went wrong.");
    } finally {
      setSendingOtp(false);
    }
  };

  const { control, handleSubmit, reset, watch, setValue } = useForm({
    resolver: yupResolver(loginSchema),
    defaultValues,
  });

  const onSubmit = async (data) => {
    try {
      setVerifyingOtp(true);

      const response = await verifyOtp(data);

      localStorage.setItem("token", response.data.data.accessToken);

      localStorage.setItem("refreshToken", response.data.data.refreshToken);
      login(response.data.data.user);
      // localStorage.setItem("user", JSON.stringify(response.data.data.user));

      successAlert(response.data.message);

      navigate("/dashboard");
    } catch (error) {
      errorAlert(error.response?.data?.message || "Something went wrong.");
    } finally {
      setVerifyingOtp(false);
    }
  };

  const handleResendOtp = async () => {
    try {
      setResendingOtp(true);

      const response = await resendOtp({
        email: watch("email"),
      });

      successAlert(response.data.message);
    } catch (error) {
      errorAlert(error.response?.data?.message || "Something went wrong.");
    } finally {
      setResendingOtp(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-100">
      <div className="grid min-h-screen lg:grid-cols-2">
        {/* Left Side */}
        <section className="hidden lg:flex bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white relative overflow-hidden">
          {/* Background Blur */}
          <div className="absolute -top-20 -left-20 h-72 w-72 rounded-full bg-blue-500/20 blur-3xl"></div>
          <div className="absolute -bottom-24 -right-20 h-80 w-80 rounded-full bg-indigo-500/20 blur-3xl"></div>

          <div className="relative z-10 flex w-full flex-col items-center justify-center px-12 text-center">
            {/* Logo */}
            <div className="mb-8 flex h-24 w-24 items-center justify-center rounded-3xl bg-white/10 backdrop-blur-lg shadow-2xl">
              <Typography variant="h2" fontWeight={700}>
                🚀
              </Typography>
            </div>

            {/* App Name */}
            <Typography variant="h3" fontWeight={700} gutterBottom>
              {APP_NAME}
            </Typography>

            {/* Heading */}
            <Typography variant="h4" sx={{ mb: 3, fontWeight: 600 }}>
              Welcome Back
            </Typography>

            {/* Description */}
            <Typography
              variant="body1"
              sx={{
                maxWidth: 450,
                opacity: 0.85,
                lineHeight: 1.8,
              }}
            >
              Sign in to continue accessing your dashboard and manage everything
              in one place with a clean, secure, and seamless experience.
            </Typography>

            {/* Decorative Dots */}
            <div className="mt-12 flex gap-3">
              <span className="h-3 w-3 rounded-full bg-white"></span>
              <span className="h-3 w-3 rounded-full bg-white/60"></span>
              <span className="h-3 w-3 rounded-full bg-white/30"></span>
            </div>
          </div>
        </section>

        {/* Right Side */}
        <section className="flex items-center justify-center bg-slate-50 px-6 py-12">
          <div className="w-full max-w-md">
            <Card
              elevation={0}
              sx={{
                borderRadius: 4,
                border: "1px solid",
                borderColor: "divider",
                boxShadow: "0 10px 30px rgba(15, 23, 42, 0.08)",
              }}
            >
              <CardContent sx={{ p: 5 }}>
                {/* Logo */}
                <div className="mb-8 ">
                  <Typography variant="h5" fontWeight={600} sx={{ mt: 3 }}>
                    Sign In
                  </Typography>

                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mt: 1 }}
                  >
                    Sign in to access your CRM dashboard.
                  </Typography>
                </div>

                <form
                  onSubmit={(e) => {
                    e.preventDefault();

                    if (otpSent) {
                      handleSubmit(onSubmit)();
                    } else {
                      handleSendOtp();
                    }
                  }}
                  className="space-y-6"
                >
                  <Controller
                    name="email"
                    control={control}
                    render={({ field, fieldState }) => (
                      <InputField
                        label="Email Address"
                        name="email"
                        type="email"
                        required
                        placeholder="Enter your email"
                        value={field.value}
                        onChange={field.onChange}
                        onBlur={field.onBlur}
                        error={fieldState.error}
                      />
                    )}
                  />

                  {otpSent && (
                    <Controller
                      name="otp"
                      control={control}
                      render={({ field, fieldState }) => (
                        <OtpField
                          label="One Time Password"
                          required
                          value={field.value}
                          onChange={field.onChange}
                          error={fieldState.error}
                        />
                      )}
                    />
                  )}

                  <div className="flex items-center justify-between">
                    {otpSent ? (
                      <>
                        <Typography variant="body2" color="text.secondary">
                          Didn't receive the OTP?
                        </Typography>

                        <LoadingButton
                          variant="contained"
                          loading={resendingOtp}
                          onClick={handleResendOtp}
                          sx={{
                            textTransform: "none",
                            fontWeight: 600,
                          }}
                        >
                          Resend OTP
                        </LoadingButton>
                      </>
                    ) : (
                      <div className="flex w-full justify-end">
                        <LoadingButton
                          variant="contained"
                          loading={sendingOtp}
                          onClick={handleSendOtp}
                          sx={{
                            textTransform: "none",
                            fontWeight: 600,
                          }}
                        >
                          Send OTP
                        </LoadingButton>
                      </div>
                    )}
                  </div>

                  {otpSent && (
                    <Button
                      type="submit"
                      variant="contained"
                      fullWidth
                      size="large"
                      disabled={verifyingOtp}
                      sx={{
                        py: 1.6,
                        borderRadius: 2,
                        textTransform: "none",
                        fontSize: "1rem",
                        fontWeight: 600,
                      }}
                    >
                      {verifyingOtp ? "Verifying..." : "Verify & Login"}
                    </Button>
                  )}
                </form>

                <Divider sx={{ my: 4 }} />

                <Typography
                  variant="caption"
                  color="text.secondary"
                  align="center"
                  display="block"
                >
                  © {new Date().getFullYear()} {APP_NAME}. All rights reserved.
                </Typography>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </main>
  );
};

export default Login;
