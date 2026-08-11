import * as yup from "yup";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Box,
  Card,
  CardContent,
  Divider,
  Grid,
  Typography,
} from "@mui/material";
import { useNavigate, useSearchParams } from "react-router-dom";

import InputField from "../../components/forms/InputField";
import CustomButton from "../../components/common/Button";

import { createLead } from "../../api/leads";
import { getEnquiryById } from "../../api/enquiries";

import { successAlert, errorAlert } from "../../utils/alerts";

import useCountryState from "../../hooks/useCountryState";
import { getLeadStatuses } from "../../api/leadStatus";
import { PRIORITY_OPTIONS, SOURCE_OPTIONS } from "../../constants/api";
import { get } from "../../api/users";
import Dropdown from "../../components/forms/Dropdown";

const defaultValues = {
  enquiryid: "",
  userid: "",
  hospitalname: "",

  firstname: "",
  lastname: "",

  email: "",
  phone: "",

  address: "",
  countryid: "",
  stateid: "",
  city: "",
  pincode: "",

  priority: 1,
  source: "",

  leadstatusid: 1,

  expectedamount: "",

  assignedby: "",

  remarks: "",
};

const schema = yup.object({
  hospitalname: yup.string().trim().required("Hospital Name is required."),

  firstname: yup.string().trim().required("First Name is required."),

  lastname: yup.string().trim(),

  email: yup
    .string()
    .trim()
    .email("Please enter a valid email.")
    .required("Email is required."),

  phone: yup
    .string()
    .matches(/^[0-9]{10}$/, "Phone number must be 10 digits.")
    .required("Phone number is required."),

  source: yup.number().required("Source is required."),

  countryid: yup.string().required("Country is required."),

  stateid: yup.string().required("State is required."),
  address: yup
    .string()
    .transform((value, originalValue) => (originalValue === "" ? null : value))
    .nullable(),

  city: yup
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

  priority: yup.number().required("Priority is required."),

  leadstatusid: yup.string().required("Lead Status is required."),

  userid: yup.string().required("Assigned To is required."),
  expectedamount: yup
    .number()
    .transform((value, originalValue) => (originalValue === "" ? null : value))
    .nullable()
    .typeError("Expected Amount must be a number."),

  remarks: yup
    .string()
    .trim()
    .max(500, "Remarks cannot exceed 500 characters."),
});

const LeadForm = () => {
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();

  const enquiryid = searchParams.get("enquiryid");

  const [loading, setLoading] = useState(false);
  const [leadStatuses, setLeadStatuses] = useState([]);
  const [users, setUsers] = useState([]);

  const { control, handleSubmit, reset, watch, setValue } = useForm({
    resolver: yupResolver(schema),
    defaultValues,
  });
  const countryId = watch("countryid");

  const {
    countries,
    states,
    //   loading,
  } = useCountryState(countryId, setValue);
  //   console.log(countries);
  //   console.log(states);

  const getEnquiry = async () => {
    try {
      if (!enquiryid) return;

      const response = await getEnquiryById(enquiryid);

      reset({
        enquiryid,
        ...response.data.data,
      });
    } catch (error) {
      errorAlert(error.response?.data?.message || "Failed to load enquiry.");
    }
  };

  useEffect(() => {
    getEnquiry();
  }, []);

  const getAllLeadStatuses = async () => {
    try {
      const response = await getLeadStatuses({
        page: 1,
        limit: 100,
      });

      const statuses = response.data.data;

      setLeadStatuses(statuses);

      if (statuses.length > 0) {
        setValue("leadstatusid", statuses[0].id);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getAllLeadStatuses();
  }, []);

  const getUsers = async () => {
    try {
      const response = await get({
        page: 1,
        limit: 1000,
        search: "",
      });

      const users = response?.data?.data?.map((user) => ({
        ...user,
        fullname: `${user.firstname} ${user.lastname}`,
      }));

      setUsers(users);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  const onSubmit = async (data) => {
    try {
      setLoading(true);

      const response = await createLead(data);

      successAlert(response.data.message);

      navigate("/leads");
    } catch (error) {
      errorAlert(error.response?.data?.message || "Failed to create lead.");
    } finally {
      setLoading(false);
    }
  };

  return (
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
                  label="Phone"
                  required
                  placeholder="Enter phone number"
                  {...field}
                  error={fieldState.error}
                />
              )}
            />
          </div>
          <Divider sx={{ my: 2 }} />

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
            {/* Country */}
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

                    // Clear state when country changes
                    setValue("stateid", "");
                  }}
                  valueKey="id"
                  labelKey="name"
                  placeholder="Select Country"
                  error={fieldState.error}
                />
              )}
            />
            {/* State */}
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
            {/* City */}
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
            {/* Pincode */}
            <Controller
              name="address"
              control={control}
              render={({ field, fieldState }) => (
                <InputField
                  label="address"
                  placeholder="Enter address"
                  {...field}
                  error={fieldState.error}
                />
              )}
            />{" "}
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

          <Divider sx={{ my: 2 }} />

          <Typography
            variant="h6"
            sx={{
              mb: 2,
              fontWeight: 700,
            }}
          >
            Lead Details
          </Typography>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {/* Priority */}

            <Controller
              name="priority"
              control={control}
              render={({ field, fieldState }) => (
                <Dropdown
                  label="Priority"
                  required
                  options={PRIORITY_OPTIONS}
                  value={field.value}
                  onChange={field.onChange}
                  valueKey="id"
                  labelKey="name"
                  placeholder="Select Priority"
                  error={fieldState.error}
                />
              )}
            />
            {/* Lead Status */}
            <Controller
              name="leadstatusid"
              control={control}
              render={({ field, fieldState }) => (
                <Dropdown
                  label="Lead Status"
                  required
                  options={leadStatuses}
                  value={field.value}
                  onChange={field.onChange}
                  valueKey="id"
                  labelKey="name"
                  placeholder="Select Lead Status"
                  error={fieldState.error}
                />
              )}
            />
            {/* Assigned To */}
            <Controller
              name="userid"
              control={control}
              render={({ field, fieldState }) => (
                <Dropdown
                  label="Assigned To"
                  required
                  options={users}
                  value={field.value}
                  onChange={field.onChange}
                  valueKey="id"
                  labelKey="fullname"
                  placeholder="Select User"
                  error={fieldState.error}
                />
              )}
            />

            <Controller
              name="source"
              control={control}
              render={({ field, fieldState }) => (
                <Dropdown
                  label="Source"
                  required
                  options={SOURCE_OPTIONS}
                  value={field.value}
                  onChange={field.onChange}
                  valueKey="id"
                  labelKey="name"
                  placeholder="Select Source"
                  error={fieldState.error}
                />
              )}
            />

            {/* Expected Amount */}
            <Controller
              name="expectedamount"
              control={control}
              render={({ field, fieldState }) => (
                <InputField
                  label="Expected Amount"
                  type="number"
                  placeholder="₹0.00"
                  {...field}
                  error={fieldState.error}
                />
              )}
            />
          </div>

          <Box mt={3}>
            {/* Remarks */}
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
          </Box>
          <Divider sx={{ my: 2 }} />

          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              gap: 2,
            }}
          >
            <CustomButton back to="/leads" variant="outlined">
              Cancel
            </CustomButton>

            <CustomButton type="submit" loading={loading}>
              Create Lead
            </CustomButton>
          </Box>
        </form>
      </CardContent>
    </Card>
  );
};

export default LeadForm;
