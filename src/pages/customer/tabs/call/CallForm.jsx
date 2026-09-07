import { useEffect, useState } from "react";
import moment from "moment";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";

import { Box, Divider, IconButton, Stack, Typography } from "@mui/material";
import { Close } from "@mui/icons-material";

import InputField from "../../../../components/forms/InputField";
import DateField from "../../../../components/forms/DateField";
import Dropdown from "../../../../components/forms/Dropdown";
import CustomButton from "../../../../components/common/Button";

import { useUser } from "../../../../context/UserContext";

import { createCall, updateCall } from "../../../../api/call";
import { errorAlert, successAlert } from "../../../../utils/alerts";
import {
  CALL_STATUS_OPTIONS,
  CALL_TYPE_OPTIONS,
} from "../../../../constants/app";

const schema = yup.object({
  calltype: yup
    .number()
    .required("Call Type is required.")
    .typeError("Call Type is required."),

  callstatus: yup
    .number()
    .required("Call Status is required.")
    .typeError("Call Status is required."),

  duration: yup
    .number()
    .nullable()
    .min(0, "Duration cannot be negative.")
    .typeError("Duration must be a number."),

  subject: yup.string().trim().required("Subject is required."),

  notes: yup.string().trim().nullable(),

  calledat: yup
    .date()
    .transform((value, originalValue) => (originalValue === "" ? null : value))
    .nullable()
    .required("Called At is required."),
});

const defaultValues = {
  calltype: "",
  callstatus: "",
  duration: "",
  subject: "",
  notes: "",
  calledat: moment().format("YYYY-MM-DD"),
};

const CallForm = ({
  leadId,
  call = null,
  isEdit = false,
  onClose,
  getAllCalls,
}) => {
  const { user } = useUser();

  const [loading, setLoading] = useState(false);

  const { control, handleSubmit, reset } = useForm({
    resolver: yupResolver(schema),
    defaultValues,
  });

  // --------------------------------
  // Reset Form
  // --------------------------------
  useEffect(() => {
    if (!isEdit || !call) {
      reset(defaultValues);
      return;
    }

    reset({
      calltype:
        call.calltype !== null && call.calltype !== undefined
          ? Number(call.calltype)
          : "",

      callstatus:
        call.callstatus !== null && call.callstatus !== undefined
          ? Number(call.callstatus)
          : "",

      duration:
        call.duration !== null && call.duration !== undefined
          ? Number(call.duration)
          : "",

      subject: call.subject || "",

      notes: call.notes || "",

      calledat: call.calledat
        ? moment(Number(call.calledat)).format("YYYY-MM-DD")
        : moment().format("YYYY-MM-DD"),
    });
  }, [call, isEdit, reset]);

  // --------------------------------
  // Submit
  // --------------------------------
  const onSubmit = async (data) => {
    try {
      setLoading(true);

      const payload = {
        leadid: leadId,
        userid: user.id,

        calltype: Number(data.calltype),
        callstatus: Number(data.callstatus),

        duration:
          data.duration !== "" && data.duration !== null
            ? Number(data.duration)
            : null,

        subject: data.subject?.trim() || null,

        notes: data.notes?.trim() || null,

        calledat: moment(data.calledat).valueOf(),
      };

      let response;

      if (isEdit) {
        response = await updateCall({
          id: call.id,
          ...payload,
        });

        successAlert(response.data.message || "Call updated successfully.");
      } else {
        response = await createCall(payload);

        successAlert(response.data.message || "Call created successfully.");
      }

      // Refresh Calls Table
      if (getAllCalls) {
        await getAllCalls();
      }

      // Close Drawer
      onClose();
    } catch (error) {
      errorAlert(
        error.response?.data?.message ||
          `Failed to ${isEdit ? "update" : "create"} call.`,
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Header */}
      <Stack
        direction="row"
        alignItems="center"
        sx={{
          px: 3,
          py: 2,
          bgcolor: "#F8FAFC",
          borderBottom: "1px solid",
          borderColor: "divider",
        }}
      >
        <Box>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 700,
            }}
          >
            {isEdit ? "Edit Call" : "Create Call"}
          </Typography>

          <Typography variant="body2" color="text.secondary">
            {isEdit
              ? "Update call information."
              : "Record a call for this customer."}
          </Typography>
        </Box>

        <IconButton
          onClick={onClose}
          sx={{
            ml: "auto",
            width: 40,
            height: 40,
            bgcolor: "background.paper",
            border: "1px solid",
            borderColor: "divider",
            borderRadius: 2,
            "&:hover": {
              bgcolor: "grey.100",
            },
          }}
        >
          <Close fontSize="small" />
        </IconButton>
      </Stack>

      <Divider />

      {/* Form */}
      <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
        <Box
          sx={{
            p: 3,
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* Called At */}
          <Controller
            name="calledat"
            control={control}
            render={({ field, fieldState }) => (
              <DateField
                label="Called On"
                required
                value={field.value}
                onChange={field.onChange}
                error={fieldState.error}
              />
            )}
          />

          {/* Subject */}
          <Controller
            name="subject"
            control={control}
            render={({ field, fieldState }) => (
              <InputField
                {...field}
                label="Subject"
                required
                placeholder="Enter call subject"
                error={fieldState.error}
              />
            )}
          />

          {/* Call Type */}
          <Controller
            name="calltype"
            control={control}
            render={({ field, fieldState }) => (
              <Dropdown
                label="Call Type"
                required
                options={CALL_TYPE_OPTIONS}
                value={field.value}
                onChange={(value) => field.onChange(Number(value))}
                valueKey="id"
                labelKey="name"
                placeholder="Select Call Type"
                error={fieldState.error}
              />
            )}
          />

          {/* Call Status */}
          <Controller
            name="callstatus"
            control={control}
            render={({ field, fieldState }) => (
              <Dropdown
                label="Call Status"
                required
                options={CALL_STATUS_OPTIONS}
                value={field.value}
                onChange={(value) => field.onChange(Number(value))}
                valueKey="id"
                labelKey="name"
                placeholder="Select Call Status"
                error={fieldState.error}
              />
            )}
          />

          {/* Duration */}
          <Controller
            name="duration"
            control={control}
            render={({ field, fieldState }) => (
              <InputField
                {...field}
                type="number"
                label="Duration"
                placeholder="Enter duration in seconds"
                error={fieldState.error}
              />
            )}
          />

          {/* Notes */}
          <Controller
            name="notes"
            control={control}
            render={({ field, fieldState }) => (
              <InputField
                {...field}
                label="Notes"
                placeholder="Enter call notes"
                multiline
                rows={5}
                error={fieldState.error}
              />
            )}
          />
        </Box>

        {/* Footer */}
        <Box
          sx={{
            px: 3,
            py: 2,
            bgcolor: "#F8FAFC",
            borderTop: "1px solid",
            borderColor: "divider",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              gap: 2,
            }}
          >
            <CustomButton type="button" variant="outlined" onClick={onClose}>
              Cancel
            </CustomButton>

            <CustomButton type="submit" loading={loading}>
              {isEdit ? "Update Call" : "Save Call"}
            </CustomButton>
          </Box>
        </Box>
      </form>
    </>
  );
};

export default CallForm;
