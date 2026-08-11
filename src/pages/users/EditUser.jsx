import * as yup from "yup";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button, Card, CardContent, Divider, Stack } from "@mui/material";

import PageHeader from "../../components/common/PageHeader";
import InputField from "../../components/forms/InputField";
import CustomButton from "../../components/common/Button";
import { getById, updateUser } from "../../api/users";
import { useNavigate, useParams } from "react-router-dom";
import { errorAlert, successAlert } from "../../utils/alerts";
import { ArrowBack, Save } from "@mui/icons-material";

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

const EditUser = () => {
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  const { control, handleSubmit, reset } = useForm({
    resolver: yupResolver(registrationSchema),
    defaultValues,
  });

  const getUser = async () => {
    try {
      setPageLoading(true);

      const response = await getById(id);

      reset(response.data.data);
    } catch (error) {
      errorAlert(
        error.response?.data?.message ||
          error.message ||
          "Failed to fetch user.",
      );
    } finally {
      setPageLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      getUser();
    }
  }, [id]);

  const onSubmit = async (data) => {
    try {
      setLoading(true);

      const response = await updateUser({
        id,
        ...data,
      });

      successAlert(response.data.message);

      navigate("/users");
    } catch (error) {
      errorAlert(error.response?.data?.message || "Failed to update user.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* <PageHeader
        showBackButton
        backPath="/users"
        backText="Users"
        title="Edit User"
        subtitle="Update user details."
        buttonText="Save Changes"
        buttonIcon={<Save />}
        onButtonClick={handleSubmit(onSubmit)}
      /> */}

      <PageHeader
        title="Edit User"
        actions={
          <Stack direction="row" spacing={2}>
            <Button
              variant="outlined"
              startIcon={<ArrowBack />}
              onClick={() => navigate("/users")}
            >
              Back
            </Button>
          </Stack>
        }
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

              <Controller
                name="email"
                control={control}
                render={({ field, fieldState }) => (
                  <InputField
                    label="Email Address"
                    type="email"
                    required
                    disabled
                    placeholder="Enter email address"
                    {...field}
                    error={fieldState.error}
                  />
                )}
              />

              <Controller
                name="phone"
                control={control}
                render={({ field, fieldState }) => (
                  <InputField
                    label="Phone Number"
                    required
                    disabled
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
                display: "flex",
                justifyContent: "flex-end",
                gap: 2,
              }}
            >
              <CustomButton back to="/users" variant="outlined">
                Cancel
              </CustomButton>

              <CustomButton type="submit" loading={loading}>
                Update User
              </CustomButton>
            </Box>
          </form>
        </CardContent>
      </Card>
    </>
  );
};

export default EditUser;
