import { Delete, Edit } from "@mui/icons-material";
import { IconButton, Tooltip } from "@mui/material";
import StatusChip from "../../../../components/common/StatusChip";

const MODE_OPTIONS = {
  1: "Call",
  2: "Email",
  3: "Meeting",
  4: "WhatsApp",
};

const STATUS_OPTIONS = {
  1: {
    label: "Pending",
    type: "warning",
  },
  2: {
    label: "Completed",
    type: "success",
  },
  3: {
    label: "Cancelled",
    type: "error",
  },
};

const formatDate = (value) => {
  if (!value) return "-";

  return new Date(Number(value)).toLocaleDateString();
};

export const columns = (handleEdit, handleDelete) => [
  {
    field: "followupdate",
    headerName: "Follow Up Date",
    width: 160,
    renderCell: ({ row }) => formatDate(row.followupdate),
  },

  {
    field: "mode",
    headerName: "Mode",
    width: 140,
    renderCell: ({ row }) => MODE_OPTIONS[Number(row.mode)] || "-",
  },

  {
    field: "remarks",
    headerName: "Remarks",
    flex: 1,
    minWidth: 250,
    renderCell: ({ row }) => row.remarks || "-",
  },

  {
    field: "nextfollowupdate",
    headerName: "Next Follow Up",
    width: 170,
    renderCell: ({ row }) => formatDate(row.nextfollowupdate),
  },

  {
    field: "status",
    headerName: "Status",
    width: 140,
    renderCell: ({ row }) => {
      const status = STATUS_OPTIONS[Number(row.status)] || {
        label: "Unknown",
        type: "default",
      };

      return <StatusChip type={status.type} label={status.label} />;
    },
  },

  {
    field: "actions",
    headerName: "Actions",
    width: 110,
    sortable: false,
    filterable: false,
    renderCell: ({ row }) => (
      <div className="flex items-center gap-1">
        <Tooltip title="Edit">
          <IconButton size="small" onClick={() => handleEdit(row)}>
            <Edit fontSize="small" />
          </IconButton>
        </Tooltip>

        <Tooltip title="Delete">
          <IconButton
            size="small"
            onClick={() => handleDelete(row)}
            sx={{
              color: "#DC2626",
            }}
          >
            <Delete fontSize="small" />
          </IconButton>
        </Tooltip>
      </div>
    ),
  },
];
