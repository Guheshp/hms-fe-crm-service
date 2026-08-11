import moment from "moment";
import { Delete, Edit } from "@mui/icons-material";
import { IconButton, Stack, Tooltip, Typography } from "@mui/material";
import StatusChip from "../../components/common/StatusChip";
import { FOLLOWUP_MODE_OPTIONS } from "../../constants/app";

const FOLLOWUP_MODE = {
  1: "Call",
  2: "Meeting",
  3: "Email",
  4: "WhatsApp",
  5: "Visit",
};

export const columns = (handleEdit, handleDelete) => [
  {
    field: "followupdate",
    headerName: "Follow Up Date",
    width: 170,
    renderCell: ({ row }) => (
      <Typography>
        {row.followupdate
          ? moment(Number(row.followupdate)).format("DD/MM/YYYY")
          : "-"}
      </Typography>
    ),
  },
  {
    field: "leadstatus",
    headerName: "Lead Status",
    width: 170,
    renderCell: ({ row }) => (
      <StatusChip type="primary" label={row.leadstatus} />
    ),
  },

  {
    field: "mode",
    headerName: "Mode",
    width: 150,
    renderCell: ({ row }) => {
      const mode = FOLLOWUP_MODE_OPTIONS.find(
        (item) => item.id === Number(row.mode),
      );

      return <StatusChip type={mode?.type} label={mode?.name || "-"} />;
    },
  },
  {
    field: "nextfollowupdate",
    headerName: "Next Follow Up",
    width: 180,
    renderCell: ({ row }) => (
      <Typography>
        {row.nextfollowupdate
          ? moment(Number(row.nextfollowupdate)).format("DD/MM/YYYY")
          : "-"}
      </Typography>
    ),
  },
  {
    field: "remarks",
    headerName: "Remarks",
    flex: 1,
    minWidth: 250,
    sortable: false,
    renderCell: ({ row }) => (
      <Tooltip title={row.remarks || "-"}>
        <Typography noWrap>{row.remarks || "-"}</Typography>
      </Tooltip>
    ),
  },

  {
    field: "actions",
    headerName: "Actions",
    width: 120,
    sortable: false,
    filterable: false,
    disableColumnMenu: true,
    align: "center",
    headerAlign: "center",
    renderCell: ({ row }) => (
      <Stack direction="row" spacing={1}>
        <Tooltip title="Edit">
          <IconButton
            size="small"
            color="primary"
            onClick={() => handleEdit(row)}
          >
            <Edit fontSize="small" />
          </IconButton>
        </Tooltip>

        <Tooltip title="Delete">
          <IconButton
            size="small"
            color="error"
            onClick={() => handleDelete(row)}
          >
            <Delete fontSize="small" />
          </IconButton>
        </Tooltip>
      </Stack>
    ),
  },
];
