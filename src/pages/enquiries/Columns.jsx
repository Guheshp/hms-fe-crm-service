import { Delete, Edit } from "@mui/icons-material";
import {
  Avatar,
  IconButton,
  Stack,
  Tooltip,
  Typography,
  Chip,
} from "@mui/material";

import StatusChip from "../../components/common/StatusChip";

export const columns = (handleEdit, handleDelete, handleConvert) => [
  {
    field: "hospitalname",
    headerName: "Hospital",
    width: 280,
    renderCell: (params) => (
      <Stack direction="row" spacing={2} alignItems="center">
        <Avatar
          sx={{
            width: 40,
            height: 40,
            bgcolor: "primary.main",
            fontSize: 14,
            fontWeight: 700,
          }}
        >
          {params.row.hospitalname
            ?.split(" ")
            .map((word) => word[0])
            .join("")
            .substring(0, 2)
            .toUpperCase()}
        </Avatar>

        <Stack spacing={0.5}>
          <Typography fontWeight={700}>{params.row.hospitalname}</Typography>

          <Chip
            label={params.row.enquirynumber}
            size="small"
            sx={{
              width: "fit-content",
              height: 22,
              fontSize: 11,
              fontWeight: 600,
              bgcolor: "#EEF2FF",
              color: "#4338CA",
              borderRadius: "6px",
            }}
          />
        </Stack>
      </Stack>
    ),
  },

  {
    field: "contactperson",
    headerName: "Contact Person",
    width: 180,
  },

  {
    field: "email",
    headerName: "Email",
    width: 240,
  },

  {
    field: "phone",
    headerName: "Phone",
    width: 150,
  },

  {
    field: "remarks",
    headerName: "Remarks",
    width: 220,
    renderCell: (params) => (
      <Tooltip title={params.row.remarks || "-"}>
        <Typography noWrap>{params.row.remarks || "-"}</Typography>
      </Tooltip>
    ),
  },

  {
    field: "convert",
    headerName: "Lead",
    width: 180,
    sortable: false,
    filterable: false,
    renderCell: (params) =>
      params.row.isconverted ? (
        <StatusChip type="success" label="Converted" />
      ) : (
        <StatusChip
          type="warning"
          label="Convert to Lead"
          clickable
          onClick={() => handleConvert(params.row)}
        />
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
    renderCell: (params) => (
      <Stack direction="row" spacing={0.5}>
        <Tooltip title="Edit">
          <IconButton
            size="small"
            color="primary"
            onClick={() => handleEdit(params.row)}
          >
            <Edit fontSize="small" />
          </IconButton>
        </Tooltip>

        <Tooltip title="Delete">
          <IconButton
            size="small"
            color="error"
            onClick={() => handleDelete(params.row)}
          >
            <Delete fontSize="small" />
          </IconButton>
        </Tooltip>
      </Stack>
    ),
  },
];
