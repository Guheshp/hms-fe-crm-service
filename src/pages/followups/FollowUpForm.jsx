// import * as yup from "yup";
// import { yupResolver } from "@hookform/resolvers/yup";
// import { Controller, useForm } from "react-hook-form";
// import { Box, Divider, IconButton, Stack, Typography } from "@mui/material";
// import { Close } from "@mui/icons-material";
// import moment from "moment";
// import InputField from "../../components/forms/InputField";

// import CustomButton from "../../components/common/Button";
// import { useEffect, useState } from "react";
// import { getLeadStatuses } from "../../api/leadStatus";
// import { getLeadById, updateLead, updateLeadStatus } from "../../api/leads";
// import DateField from "../../components/forms/DateField";
// import Dropdown from "../../components/forms/Dropdown";
// import { FOLLOWUP_MODE_OPTIONS } from "../../constants/app";
// import { errorAlert, successAlert } from "../../utils/alerts";
// import { createLeadFollowUp } from "../../api/leadFollowUps";
// import { useUser } from "../../context/UserContext";

// const schema = yup.object({
//   followupdate: yup
//     .date()
//     .transform((value, originalValue) => (originalValue === "" ? null : value))
//     .nullable()
//     .required("Follow Up Date is required."),

//   leadstatusid: yup.string().required("Lead Status is required."),

//   mode: yup.number().required("Follow Up Mode is required."),

//   remarks: yup.string().trim().nullable(),

//   nextfollowupdate: yup
//     .date()
//     .transform((value, originalValue) => (originalValue === "" ? null : value))
//     .nullable(),
// });

// const defaultValues = {
//   followupdate: moment().format("YYYY-MM-DD"),
//   leadstatusid: "",
//   mode: "",
//   remarks: "",
//   nextfollowupdate: "",
// };

// const FollowUpForm = ({ leadId, onClose, getAllFollowUps }) => {
//   const [leadStatuses, setLeadStatuses] = useState([]);
//   const [loading, setLoading] = useState(false);

//   const { user } = useUser();
//   const { control, handleSubmit, setValue } = useForm({
//     resolver: yupResolver(schema),
//     defaultValues,
//   });

//   const getAllLeadStatuses = async () => {
//     try {
//       const response = await getLeadStatuses({
//         page: 1,
//         limit: 100,
//       });

//       setLeadStatuses(response.data.data);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const getLead = async () => {
//     try {
//       const response = await getLeadById(leadId);

//       const lead = response.data.data;

//       setValue("leadstatusid", lead.leadstatusid);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   useEffect(() => {
//     if (leadId) {
//       getLead();
//     }

//     getAllLeadStatuses();
//   }, [leadId]);

//   const onSubmit = async (data) => {
//     try {
//       setLoading(true);

//       const payload = {
//         leadid: leadId,
//         followupdate: moment(data.followupdate).valueOf(),
//         nextfollowupdate: data.nextfollowupdate
//           ? moment(data.nextfollowupdate).valueOf()
//           : null,
//         leadstatusid: data.leadstatusid,
//         mode: data.mode,
//         remarks: data.remarks?.trim() || null,
//         createdby: user.id,
//       };

//       const response = await createLeadFollowUp(payload);

//       await updateLeadStatus({
//         id: leadId,
//         leadstatusid: data.leadstatusid,
//       });

//       successAlert(response.data.message);

//       onClose();
//       getAllFollowUps();
//     } catch (error) {
//       errorAlert(
//         error.response?.data?.message || "Failed to create follow up.",
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <>
//       <Stack
//         direction="row"
//         alignItems="center"
//         sx={{
//           px: 2,
//           py: 1,
//           bgcolor: "#F8FAFC",
//           borderBottom: "1px solid",
//           borderColor: "divider",
//         }}
//       >
//         <Box>
//           <Typography variant="h6" fontWeight={700}>
//             Create Follow Up
//           </Typography>
//         </Box>

//         <IconButton
//           onClick={onClose}
//           sx={{
//             ml: "auto", // Pushes button to the right
//             width: 40,
//             height: 40,
//             bgcolor: "background.paper",
//             border: "1px solid",
//             borderColor: "divider",
//             borderRadius: 2,
//           }}
//         >
//           <Close fontSize="small" />
//         </IconButton>
//       </Stack>
//       <Divider />
//       <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
//         <Box
//           sx={{
//             width: "100%",
//             p: 3,
//             display: "flex",
//             flexDirection: "column",
//           }}
//         >
//           <Controller
//             name="followupdate"
//             control={control}
//             render={({ field, fieldState }) => (
//               <DateField
//                 label="Follow Up Date"
//                 required
//                 value={field.value}
//                 onChange={field.onChange}
//                 error={fieldState.error}
//               />
//             )}
//           />

//           <Controller
//             name="mode"
//             control={control}
//             render={({ field, fieldState }) => (
//               <Dropdown
//                 label="Follow Up Mode"
//                 required
//                 options={FOLLOWUP_MODE_OPTIONS}
//                 value={field.value}
//                 onChange={(value) => field.onChange(Number(value))}
//                 valueKey="id"
//                 labelKey="name"
//                 placeholder="Select Mode"
//                 error={fieldState.error}
//               />
//             )}
//           />

//           <Controller
//             name="leadstatusid"
//             control={control}
//             render={({ field, fieldState }) => (
//               <Dropdown
//                 label="Lead Status"
//                 required
//                 options={leadStatuses}
//                 value={field.value}
//                 onChange={field.onChange}
//                 valueKey="id"
//                 labelKey="name"
//                 placeholder="Select Lead Status"
//                 error={fieldState.error}
//               />
//             )}
//           />

//           <Controller
//             name="nextfollowupdate"
//             control={control}
//             render={({ field, fieldState }) => (
//               <DateField
//                 label="Next Follow Up Date"
//                 value={field.value}
//                 onChange={field.onChange}
//                 error={fieldState.error}
//               />
//             )}
//           />

//           <Controller
//             name="remarks"
//             control={control}
//             render={({ field, fieldState }) => (
//               <InputField
//                 {...field}
//                 label="Remarks"
//                 placeholder="Enter follow up remarks"
//                 multiline
//                 rows={5}
//                 error={fieldState.error}
//               />
//             )}
//           />
//         </Box>

//         <Box
//           sx={{
//             width: "100%",
//             px: 3,
//             py: 2,
//             bgcolor: "#F8FAFC",
//             borderTop: "1px solid",
//             borderColor: "divider",
//           }}
//         >
//           <Box
//             sx={{
//               display: "flex",
//               justifyContent: "flex-end",
//               gap: 2,
//               width: "100%",
//             }}
//           >
//             <CustomButton type="button" variant="outlined" onClick={onClose}>
//               Cancel
//             </CustomButton>

//             <CustomButton type="submit">Save Follow Up</CustomButton>
//           </Box>
//         </Box>
//       </form>
//     </>
//   );
// };

// export default FollowUpForm;

import { useEffect, useState } from "react";
import moment from "moment";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";

import { Box, Divider, IconButton, Stack, Typography } from "@mui/material";
import { Close } from "@mui/icons-material";

import InputField from "../../components/forms/InputField";
import DateField from "../../components/forms/DateField";
import Dropdown from "../../components/forms/Dropdown";
import CustomButton from "../../components/common/Button";

import { useUser } from "../../context/UserContext";

import { FOLLOWUP_MODE_OPTIONS } from "../../constants/app";

import {
  createLeadFollowUp,
  updateLeadFollowUp,
} from "../../api/leadFollowUps";

import { getLeadById, updateLeadStatus } from "../../api/leads";

import { getLeadStatuses } from "../../api/leadStatus";

import { successAlert, errorAlert } from "../../utils/alerts";

const schema = yup.object({
  followupdate: yup
    .date()
    .transform((value, originalValue) => (originalValue === "" ? null : value))
    .nullable()
    .required("Follow Up Date is required."),

  leadstatusid: yup.string().required("Lead Status is required."),

  mode: yup
    .number()
    .required("Follow Up Mode is required.")
    .typeError("Follow Up Mode is required."),

  remarks: yup.string().trim().nullable(),

  nextfollowupdate: yup
    .date()
    .transform((value, originalValue) => (originalValue === "" ? null : value))
    .nullable(),
});

const defaultValues = {
  followupdate: moment().format("YYYY-MM-DD"),
  leadstatusid: "",
  mode: "",
  remarks: "",
  nextfollowupdate: "",
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
  const [leadStatuses, setLeadStatuses] = useState([]);

  const { control, handleSubmit, setValue, reset } = useForm({
    resolver: yupResolver(schema),
    defaultValues,
  });

  const getAllLeadStatuses = async () => {
    try {
      const response = await getLeadStatuses({
        page: 1,
        limit: 100,
      });

      setLeadStatuses(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const getLead = async () => {
    try {
      const response = await getLeadById(leadId);

      const lead = response.data.data;

      setValue("leadstatusid", lead.leadstatusid);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (leadId) {
      getLead();
    }

    getAllLeadStatuses();
  }, [leadId]);

  useEffect(() => {
    if (!isEdit || !followUp) {
      reset(defaultValues);
      return;
    }

    reset({
      followupdate: followUp.followupdate
        ? moment(Number(followUp.followupdate)).format("YYYY-MM-DD")
        : moment().format("YYYY-MM-DD"),

      nextfollowupdate: followUp.nextfollowupdate
        ? moment(Number(followUp.nextfollowupdate)).format("YYYY-MM-DD")
        : "",

      leadstatusid: followUp.leadstatusid || "",

      mode: Number(followUp.mode),

      remarks: followUp.remarks || "",
    });
  }, [followUp, isEdit, reset]);

  const onSubmit = async (data) => {
    try {
      setLoading(true);

      const payload = {
        leadid: leadId,
        followupdate: moment(data.followupdate).valueOf(),
        nextfollowupdate: data.nextfollowupdate
          ? moment(data.nextfollowupdate).valueOf()
          : null,
        leadstatusid: data.leadstatusid,
        mode: data.mode,
        remarks: data.remarks?.trim() || null,
        createdby: user.id,
      };

      let response;

      if (isEdit) {
        response = await updateLeadFollowUp({
          id: followUp.id,
          ...payload,
        });

        successAlert(
          response.data.message || "Follow up updated successfully.",
        );
      } else {
        response = await createLeadFollowUp(payload);

        successAlert(
          response.data.message || "Follow up created successfully.",
        );
      }

      // Update Lead Status
      await updateLeadStatus({
        id: leadId,
        leadstatusid: data.leadstatusid,
      });

      // Refresh Follow Ups Table
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
              : "Record a follow up for this lead."}
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

      <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
        <Box
          sx={{
            p: 3,
            display: "flex",
            flexDirection: "column",
          }}
        >
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

          <Controller
            name="mode"
            control={control}
            render={({ field, fieldState }) => (
              <Dropdown
                label="Follow Up Mode"
                required
                options={FOLLOWUP_MODE_OPTIONS}
                value={field.value}
                onChange={(value) => field.onChange(Number(value))}
                valueKey="id"
                labelKey="name"
                placeholder="Select Mode"
                error={fieldState.error}
              />
            )}
          />

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
