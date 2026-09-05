import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import * as yup from "yup";

import { Box, Card, CardContent, Divider } from "@mui/material";
import { useNavigate } from "react-router-dom";

import PageHeader from "../../components/common/PageHeader";
import InputField from "../../components/forms/InputField";
import CustomButton from "../../components/common/Button";

import { createEnquiry } from "../../api/enquiries";

import { errorAlert, successAlert } from "../../utils/alerts";

const defaultValues = {
  hospitalname: "",
  contactperson: "",
  email: "",
  phone: "",
  remarks: "",
};

const enquirySchema = yup.object({
  hospitalname: yup.string().required("Hospital name is required."),

  contactperson: yup.string().required("Contact person is required."),

  email: yup
    .string()
    .email("Please enter a valid email address.")
    .required("Email address is required."),

  phone: yup
    .string()
    .matches(/^[0-9]{10}$/, "Phone number must be 10 digits.")
    .required("Phone number is required."),

  remarks: yup.string(),
});

const CreateEnquiry = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const { control, handleSubmit, reset } = useForm({
    resolver: yupResolver(enquirySchema),
    defaultValues,
  });

  const onSubmit = async (data) => {
    try {
      setLoading(true);

      const response = await createEnquiry(data);

      successAlert(response.data.message);

      reset();

      navigate("/enquiries");
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
        backText="Back"
        backPath="/enquiries"
        title="Create Enquiry"
        subtitle="Add a new hospital enquiry."
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
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
              <Controller
                name="hospitalname"
                control={control}
                render={({ field, fieldState }) => (
                  <InputField
                    label="Hospital Name"
                    required
                    placeholder="Enter hospital name"
                    {...field}
                    error={fieldState.error}
                  />
                )}
              />

              <Controller
                name="contactperson"
                control={control}
                render={({ field, fieldState }) => (
                  <InputField
                    label="Contact Person"
                    required
                    placeholder="Enter contact person"
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
                    placeholder="9876543210"
                    {...field}
                    error={fieldState.error}
                  />
                )}
              />

              <div className="md:col-span-2 lg:col-span-3">
                <Controller
                  name="remarks"
                  control={control}
                  render={({ field, fieldState }) => (
                    <InputField
                      label="Remarks"
                      multiline
                      rows={4}
                      placeholder="Enter remarks"
                      {...field}
                      error={fieldState.error}
                    />
                  )}
                />
              </div>
            </div>

            <Divider sx={{ my: 4 }} />

            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                gap: 2,
              }}
            >
              <CustomButton back to="/enquiries" variant="outlined">
                Cancel
              </CustomButton>

              <CustomButton type="submit" loading={loading}>
                Create Enquiry
              </CustomButton>
            </Box>
          </form>
        </CardContent>
      </Card>
    </>
  );
};

export default CreateEnquiry;
