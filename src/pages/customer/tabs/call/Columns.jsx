import { Edit, Delete } from "@mui/icons-material";
import { IconButton, Tooltip } from "@mui/material";
import StatusChip from "../../../../components/common/StatusChip";

export const columns = (handleEdit, handleDelete) => [
  {
    field: "subject",
    headerName: "Subject",
    flex: 1,
    minWidth: 220,
  },
  {
    field: "calltype",
    headerName: "Call Type",
    width: 140,
    renderCell: ({ row }) => (
      <StatusChip
        type={Number(row.calltype) === 1 ? "info" : "default"}
        label={Number(row.calltype) === 1 ? "Outgoing" : "Incoming"}
      />
    ),
  },
  {
    field: "callstatus",
    headerName: "Call Status",
    width: 160,
    renderCell: ({ row }) => {
      const status = Number(row.callstatus);

      const statusMap = {
        1: {
          label: "Connected",
          type: "success",
        },
        2: {
          label: "No Answer",
          type: "warning",
        },
        3: {
          label: "Busy",
          type: "error",
        },
        4: {
          label: "Call Back Later",
          type: "info",
        },
        5: {
          label: "Wrong Number",
          type: "error",
        },
      };

      const currentStatus = statusMap[status] || {
        label: "Unknown",
        type: "default",
      };

      return (
        <StatusChip type={currentStatus.type} label={currentStatus.label} />
      );
    },
  },
  {
    field: "duration",
    headerName: "Duration",
    width: 120,
    renderCell: ({ row }) => {
      if (row.duration === null || row.duration === undefined) {
        return "-";
      }

      const seconds = Number(row.duration);

      const minutes = Math.floor(seconds / 60);
      const remainingSeconds = seconds % 60;

      if (minutes === 0) {
        return `${remainingSeconds}s`;
      }

      return `${minutes}m ${remainingSeconds}s`;
    },
  },
  {
    field: "calledat",
    headerName: "Called At",
    width: 180,
    renderCell: ({ row }) => {
      if (!row.calledat) return "-";

      return new Date(Number(row.calledat)).toLocaleString();
    },
  },
  {
    field: "notes",
    headerName: "Notes",
    flex: 1,
    minWidth: 220,
    renderCell: ({ row }) => row.notes || "-",
  },
  {
    field: "actions",
    headerName: "Actions",
    width: 120,
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
