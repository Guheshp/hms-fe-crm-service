import PageHeader from "../../components/common/PageHeader";
import Register from "../register/Register";

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
import { register } from "../../api/auth";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { useState } from "react";
import { successAlert, errorAlert } from "../../utils/alerts";
import { APP_NAME } from "../../constants/app";
import InputField from "../../components/forms/InputField";
import CustomButton from "../../components/common/Button";

const defaultValues = {
  firstname: "",
  lastname: "",
  email: "",
  phone: "",
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
});

const CreateUser = () => {
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

      navigate("/users");
    } catch (error) {
      errorAlert(error.response?.data?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <PageHeader
        showBackButton
        backText="Users"
        backPath="/users"
        title="Create User"
        subtitle="Add a new user to the system."
      />

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
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
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
                    placeholder="Enter email address"
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

            <Divider sx={{ my: 4 }} />

            <Box
              sx={{
                mt: 4,
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
                gap: 2,
                width: "100%",
              }}
            >
              <CustomButton back to="/users" variant="outlined">
                Cancel
              </CustomButton>

              <CustomButton type="submit" loading={loading}>
                Create User
              </CustomButton>
            </Box>
          </form>
        </CardContent>
      </Card>
    </>
  );
};

export default CreateUser;
