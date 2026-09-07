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
import {
  createCustomerFollowUp,
  updateCustomerFollowUp,
} from "../../../../api/customerFollowUps";
import { errorAlert, successAlert } from "../../../../utils/alerts";

const MODE_OPTIONS = [
  {
    id: 1,
    name: "Call",
  },
  {
    id: 2,
    name: "Email",
  },
  {
    id: 3,
    name: "Meeting",
  },
  {
    id: 4,
    name: "WhatsApp",
  },
];

const schema = yup.object({
  followupdate: yup
    .date()
    .transform((value, originalValue) => (originalValue === "" ? null : value))
    .nullable()
    .required("Follow Up Date is required."),

  mode: yup
    .number()
    .required("Follow Up Mode is required.")
    .typeError("Follow Up Mode is required."),

  remarks: yup.string().trim().nullable(),

  nextfollowupdate: yup
    .date()
    .transform((value, originalValue) => (originalValue === "" ? null : value))
    .nullable(),

  status: yup
    .number()
    .required("Status is required.")
    .typeError("Status is required."),
});

const defaultValues = {
  followupdate: moment().format("YYYY-MM-DD"),
  mode: "",
  remarks: "",
  nextfollowupdate: "",
  status: 1,
};

const FollowUpForm = ({
  leadId,
  followUp = null,
  isEdit = false,
  onClose,
  getAllFollowUps,
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
    if (!isEdit || !followUp) {
      reset(defaultValues);
      return;
    }

    reset({
      followupdate: followUp.followupdate
        ? moment(Number(followUp.followupdate)).format("YYYY-MM-DD")
        : moment().format("YYYY-MM-DD"),

      mode:
        followUp.mode !== null && followUp.mode !== undefined
          ? Number(followUp.mode)
          : "",

      remarks: followUp.remarks || "",

      nextfollowupdate: followUp.nextfollowupdate
        ? moment(Number(followUp.nextfollowupdate)).format("YYYY-MM-DD")
        : "",

      status:
        followUp.status !== null && followUp.status !== undefined
          ? Number(followUp.status)
          : 1,
    });
  }, [followUp, isEdit, reset]);

  // --------------------------------
  // Submit
  // --------------------------------
  const onSubmit = async (data) => {
    try {
      setLoading(true);

      const payload = {
        leadid: leadId,

        followupdate: moment(data.followupdate).valueOf(),

        mode: Number(data.mode),

        remarks: data.remarks?.trim() || null,

        nextfollowupdate: data.nextfollowupdate
          ? moment(data.nextfollowupdate).valueOf()
          : null,

        status: Number(data.status),

        createdby: user.id,
      };

      let response;

      if (isEdit) {
        response = await updateCustomerFollowUp({
          id: followUp.id,
          ...payload,
        });

        successAlert(
          response.data.message || "Follow up updated successfully.",
        );
      } else {
        response = await createCustomerFollowUp(payload);

        successAlert(
          response.data.message || "Follow up created successfully.",
        );
      }

      // Refresh Table
      if (getAllFollowUps) {
        await getAllFollowUps();
      }

      // Close Drawer
      onClose();
    } catch (error) {
      errorAlert(
        error.response?.data?.message ||
          `Failed to ${isEdit ? "update" : "create"} follow up.`,
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
            {isEdit ? "Edit Follow Up" : "Create Follow Up"}
          </Typography>

          <Typography variant="body2" color="text.secondary">
            {isEdit
              ? "Update follow up information."
              : "Create a follow up for this customer."}
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
          {/* Follow Up Date */}
          <Controller
            name="followupdate"
            control={control}
            render={({ field, fieldState }) => (
              <DateField
                label="Follow Up Date"
                required
                value={field.value}
                onChange={field.onChange}
                error={fieldState.error}
              />
            )}
          />

          {/* Follow Up Mode */}
          <Controller
            name="mode"
            control={control}
            render={({ field, fieldState }) => (
              <Dropdown
                label="Follow Up Mode"
                required
                options={MODE_OPTIONS}
                value={field.value}
                onChange={(value) => field.onChange(Number(value))}
                valueKey="id"
                labelKey="name"
                placeholder="Select Mode"
                error={fieldState.error}
              />
            )}
          />

          {/* Status */}
          <Controller
            name="status"
            control={control}
            render={({ field, fieldState }) => (
              <Dropdown
                label="Status"
                required
                options={[
                  {
                    id: 1,
                    name: "Pending",
                  },
                  {
                    id: 2,
                    name: "Completed",
                  },
                  {
                    id: 3,
                    name: "Cancelled",
                  },
                ]}
                value={field.value}
                onChange={(value) => field.onChange(Number(value))}
                valueKey="id"
                labelKey="name"
                placeholder="Select Status"
                error={fieldState.error}
              />
            )}
          />

          {/* Next Follow Up Date */}
          <Controller
            name="nextfollowupdate"
            control={control}
            render={({ field, fieldState }) => (
              <DateField
                label="Next Follow Up Date"
                value={field.value}
                onChange={field.onChange}
                error={fieldState.error}
              />
            )}
          />

          {/* Remarks */}
          <Controller
            name="remarks"
            control={control}
            render={({ field, fieldState }) => (
              <InputField
                {...field}
                label="Remarks"
                placeholder="Enter follow up remarks"
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
              {isEdit ? "Update Follow Up" : "Save Follow Up"}
            </CustomButton>
          </Box>
        </Box>
      </form>
    </>
  );
};

export default FollowUpForm;
