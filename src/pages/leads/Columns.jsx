import { Delete, Edit } from "@mui/icons-material";
import {
  Avatar,
  Chip,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import StatusChip from "../../components/common/StatusChip";
import { PRIORITY_OPTIONS, SOURCE_OPTIONS } from "../../constants/api";
import { Link } from "react-router-dom";

import MoreVertIcon from "@mui/icons-material/MoreVert";
import {
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from "@mui/material";
import ActionMenu from "./ActionMenu";

export const columns = (
  handleEdit,
  handleDelete,
  leadStatuses,
  handleStatusChange,
) => [
  {
    field: "hospitalname",
    headerName: "Hospital",
    width: 300,
    renderCell: ({ row }) => (
      <Stack direction="row" spacing={2} alignItems="center">
        <Avatar
          sx={{
            width: 42,
            height: 42,
            bgcolor: "primary.main",
            fontWeight: 500,
          }}
        >
          {row.hospitalname
            ?.split(" ")
            .map((word) => word[0])
            .join("")
            .substring(0, 2)
            .toUpperCase()}
        </Avatar>

        <Stack spacing={0.25}>
          <Typography
            component={Link}
            to={`/leads/${row.id}`}
            sx={{
              textDecoration: "none",
              color: "primary.main",
              fontWeight: 500,
              width: "fit-content",
              "&:hover": {
                textDecoration: "underline",
              },
            }}
          >
            {row.hospitalname}
          </Typography>

          <Typography
            component={Link}
            to={`/leads/${row.id}`}
            variant="caption"
            sx={{
              textDecoration: "none",
              color: "text.secondary",
              width: "fit-content",
              "&:hover": {
                color: "primary.main",
                textDecoration: "underline",
              },
            }}
          >
            {row.leadnumber}
          </Typography>
        </Stack>
      </Stack>
    ),
  },
  {
    field: "contact",
    headerName: "Contact",
    width: 220,
    sortable: false,
    renderCell: ({ row }) => (
      <Stack spacing={0.25}>
        <Typography fontWeight={600}>
          {row.firstname} {row.lastname}
        </Typography>

        <Typography variant="caption" color="text.secondary">
          {row.phone}
        </Typography>
      </Stack>
    ),
  },

  {
    field: "email",
    headerName: "Email",
    width: 260,
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
    field: "location",
    headerName: "Location",
    width: 220,
    sortable: false,
    renderCell: ({ row }) => (
      <Stack spacing={0.25}>
        <Typography>{row.city}</Typography>

        <Typography variant="caption" color="text.secondary">
          {row.statename}, {row.countryname}
        </Typography>
      </Stack>
    ),
  },

  {
    field: "assignedto",
    headerName: "Assigned To",
    width: 180,
  },

  {
    field: "priority",
    headerName: "Priority",
    width: 140,
    renderCell: ({ row }) => {
      const priority = PRIORITY_OPTIONS.find(
        (item) => item.id === Number(row.priority),
      );

      const type = {
        1: "success",
        2: "warning",
        3: "error",
      }[row.priority];

      return <StatusChip type={type} label={priority?.name || "-"} />;
    },
  },

  {
    field: "source",
    headerName: "Source",
    width: 170,
    renderCell: ({ row }) => {
      const source = SOURCE_OPTIONS.find(
        (item) => item.id === Number(row.source),
      );

      return <StatusChip type="info" label={source?.name || "-"} />;
    },
  },

  {
    field: "expectedamount",
    headerName: "Expected Amount",
    width: 180,
    align: "right",
    headerAlign: "right",
    renderCell: ({ row }) => (
      <Typography fontWeight={600}>
        ₹ {Number(row.expectedamount || 0).toLocaleString("en-IN")}
      </Typography>
    ),
  },

  {
    field: "remarks",
    headerName: "Remarks",
    width: 280,
    sortable: false,
    renderCell: ({ row }) => (
      <Tooltip title={row.remarks || "-"}>
        <Typography
          noWrap
          sx={{
            width: "100%",
          }}
        >
          {row.remarks || "-"}
        </Typography>
      </Tooltip>
    ),
  },

  {
    field: "actions",
    headerName: "Actions",
    width: 90,
    sortable: false,
    filterable: false,
    disableColumnMenu: true,
    align: "center",
    headerAlign: "center",
    renderCell: ({ row }) => (
      <ActionMenu
        row={row}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
        leadStatuses={leadStatuses}
        onStatusChange={handleStatusChange}
      />
    ),
  },
];
