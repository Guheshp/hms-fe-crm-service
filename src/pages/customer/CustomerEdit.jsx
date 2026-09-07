import * as yup from "yup";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { Box, Card, CardContent, Divider, Typography } from "@mui/material";

import { useNavigate, useParams } from "react-router-dom";

import InputField from "../../components/forms/InputField";

import CustomButton from "../../components/common/Button";
import PageHeader from "../../components/common/PageHeader";
import { getLeadById, updateLead } from "../../api/leads";
import { get as getUsers } from "../../api/users";

import { successAlert, errorAlert } from "../../utils/alerts";

import useCountryState from "../../hooks/useCountryState";
import Dropdown from "../../components/forms/Dropdown";

const defaultValues = {
  enquiryid: null,

  hospitalname: "",

  firstname: "",
  lastname: "",

  email: "",
  phone: "",

  address: "",
  countryid: null,
  stateid: null,
  city: "",
  pincode: "",

  userid: null,

  remarks: "",
};

const schema = yup.object({
  hospitalname: yup.string().trim().required("Hospital Name is required."),

  firstname: yup.string().trim().required("First Name is required."),

  lastname: yup
    .string()
    .transform((value, originalValue) => (originalValue === "" ? null : value))
    .nullable(),

  email: yup
    .string()
    .trim()
    .email("Please enter a valid email.")
    .required("Email is required."),

  phone: yup
    .string()
    .matches(/^[0-9]{10}$/, "Phone number must be 10 digits.")
    .required("Phone number is required."),

  countryid: yup.string().nullable().required("Country is required."),

  stateid: yup.string().nullable().required("State is required."),

  city: yup
    .string()
    .transform((value, originalValue) => (originalValue === "" ? null : value))
    .nullable(),

  address: yup
    .string()
    .transform((value, originalValue) => (originalValue === "" ? null : value))
    .nullable(),

  pincode: yup
    .string()
    .transform((value, originalValue) => (originalValue === "" ? null : value))
    .matches(/^[0-9]{6}$/, {
      message: "Pincode must be 6 digits.",
      excludeEmptyString: true,
    })
    .nullable(),

  remarks: yup
    .string()
    .transform((value, originalValue) => (originalValue === "" ? null : value))
    .max(500, "Remarks cannot exceed 500 characters.")
    .nullable(),
});

const CustomerEdit = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);

  const { control, handleSubmit, reset, watch, setValue } = useForm({
    resolver: yupResolver(schema),
    defaultValues,
  });

  const countryId = watch("countryid");

  const { countries, states } = useCountryState(countryId, setValue);

  // --------------------------------
  // Get Customer
  // --------------------------------
  const getCustomer = async () => {
    try {
      setLoading(true);

      const response = await getLeadById(id);

      const customer = response.data.data;

      reset({
        id: customer.id,
        enquiryid: customer.enquiryid,

        hospitalname: customer.hospitalname,
        firstname: customer.firstname,
        lastname: customer.lastname,

        email: customer.email,
        phone: customer.phone,

        address: customer.address,
        countryid: customer.countryid,
        stateid: customer.stateid,
        city: customer.city,
        pincode: customer.pincode,

        userid: customer.userid,

        remarks: customer.remarks ?? "",
      });
    } catch (error) {
      errorAlert(error.response?.data?.message || "Failed to load customer.");
    } finally {
      setLoading(false);
    }
  };

  // --------------------------------
  // Get Users
  // --------------------------------
  const getAllUsers = async () => {
    try {
      const response = await getUsers({
        page: 1,
        limit: 1000,
        search: "",
      });

      const users = (response.data.data || []).map((user) => ({
        ...user,
        name: `${user.firstname} ${user.lastname}`,
      }));

      setUsers(users);
    } catch (error) {
      console.error(error);
    }
  };

  // --------------------------------
  // Initial Load
  // --------------------------------
  useEffect(() => {
    if (id) {
      getCustomer();
    }

    getAllUsers();
  }, []);

  // --------------------------------
  // Submit
  // --------------------------------
  const onSubmit = async (data) => {
    console.log(data);

    try {
      setLoading(true);

      const response = await updateLead(id, data);

      successAlert(response.data.message);

      navigate(`/customers/${id}`);
    } catch (error) {
      errorAlert(error.response?.data?.message || "Failed to update customer.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <PageHeader
        title="Edit Customer"
        subtitle="Update customer details."
        showBackButton
        backPath={`/customers/${id}`}
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
            {/* Contact Details */}
            <Typography
              variant="h6"
              sx={{
                mb: 2,
                fontWeight: 700,
              }}
            >
              Contact Details
            </Typography>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
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
                    label="Email"
                    type="email"
                    required
                    placeholder="Enter email"
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
                    placeholder="Enter phone number"
                    {...field}
                    error={fieldState.error}
                  />
                )}
              />
            </div>

            <Divider sx={{ my: 3 }} />

            {/* Address Details */}
            <Typography
              variant="h6"
              sx={{
                mb: 2,
                fontWeight: 700,
              }}
            >
              Address Details
            </Typography>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
              <Controller
                name="countryid"
                control={control}
                render={({ field, fieldState }) => (
                  <Dropdown
                    label="Country"
                    required
                    options={countries}
                    value={field.value}
                    onChange={(value) => {
                      field.onChange(value);
                      setValue("stateid", "");
                    }}
                    valueKey="id"
                    labelKey="name"
                    placeholder="Select Country"
                    error={fieldState.error}
                  />
                )}
              />

              <Controller
                name="stateid"
                control={control}
                render={({ field, fieldState }) => (
                  <Dropdown
                    label="State"
                    required
                    options={states}
                    value={field.value}
                    onChange={field.onChange}
                    valueKey="id"
                    labelKey="name"
                    placeholder="Select State"
                    disabled={!watch("countryid")}
                    error={fieldState.error}
                  />
                )}
              />

              <Controller
                name="city"
                control={control}
                render={({ field, fieldState }) => (
                  <InputField
                    label="City"
                    placeholder="Enter city"
                    {...field}
                    error={fieldState.error}
                  />
                )}
              />

              <Controller
                name="address"
                control={control}
                render={({ field, fieldState }) => (
                  <InputField
                    label="Address"
                    placeholder="Enter address"
                    {...field}
                    error={fieldState.error}
                  />
                )}
              />

              <Controller
                name="pincode"
                control={control}
                render={({ field, fieldState }) => (
                  <InputField
                    label="Pincode"
                    placeholder="Enter pincode"
                    {...field}
                    error={fieldState.error}
                  />
                )}
              />
            </div>

            <Divider sx={{ my: 3 }} />

            {/* Customer Details */}
            <Typography
              variant="h6"
              sx={{
                mb: 2,
                fontWeight: 700,
              }}
            >
              Customer Details
            </Typography>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
              <Controller
                name="userid"
                control={control}
                render={({ field, fieldState }) => (
                  <Dropdown
                    label="Assigned To"
                    options={users}
                    value={field.value}
                    onChange={field.onChange}
                    valueKey="id"
                    labelKey="name"
                    placeholder="Select User"
                    error={fieldState.error}
                  />
                )}
              />
            </div>

            <Controller
              name="remarks"
              control={control}
              render={({ field, fieldState }) => (
                <InputField
                  label="Remarks"
                  placeholder="Enter remarks"
                  multiline
                  rows={4}
                  {...field}
                  value={field.value ?? ""}
                  error={fieldState.error}
                />
              )}
            />

            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                gap: 2,
                mt: 4,
              }}
            >
              <CustomButton back to="/customers" variant="outlined">
                Cancel
              </CustomButton>

              <CustomButton type="submit" loading={loading}>
                Update Customer
              </CustomButton>
            </Box>
          </form>
        </CardContent>
      </Card>
    </>
  );
};

export default CustomerEdit;
