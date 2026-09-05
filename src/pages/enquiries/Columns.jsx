import { Delete, Edit } from "@mui/icons-material";

import { Avatar, IconButton, Stack, Tooltip, Typography } from "@mui/material";

import StatusChip from "../../components/common/StatusChip";
import CellContent from "../../components/common/CellContent";

export const columns = (handleEdit, handleDelete, handleConvert) => [
  // ================= HOSPITAL =================

  {
    field: "hospitalname",
    headerName: "Hospital",
    width: 280,

    renderCell: (params) => (
      <div className="flex h-full w-full items-center gap-3">
        <Avatar
          sx={{
            width: 40,
            height: 40,
            bgcolor: "primary.main",
            fontSize: 14,
            fontWeight: 700,
            flexShrink: 0,
          }}
        >
          {params.row.hospitalname
            ?.split(" ")
            .filter(Boolean)
            .map((word) => word[0])
            .join("")
            .substring(0, 2)
            .toUpperCase() || "H"}
        </Avatar>

        <div className="flex flex-col justify-center">
          <Typography
            sx={{
              fontSize: 14,
              color: "#0F172A",
            }}
          >
            {params.row.hospitalname || "-"}
          </Typography>
        </div>
      </div>
    ),
  },

  // ================= ENQUIRY NUMBER =================

  {
    field: "enquirynumber",
    headerName: "Enquiry No.",
    width: 150,

    renderCell: (params) => (
      <StatusChip type="primary" label={params.row.enquirynumber || "-"} />
    ),
  },

  // ================= CONTACT PERSON =================

  {
    field: "contactperson",
    headerName: "Contact Person",
    width: 180,
    align: "center",
    headerAlign: "center",

    renderCell: (params) => (
      <CellContent>
        <Typography variant="body2" fontWeight={500} noWrap>
          {params.row.contactperson || "-"}
        </Typography>
      </CellContent>
    ),
  },

  // ================= EMAIL =================

  {
    field: "email",
    headerName: "Email",
    width: 240,

    renderCell: (params) => (
      <CellContent>
        <Tooltip title={params.row.email || "-"}>
          <Typography variant="body2" noWrap color="text.secondary">
            {params.row.email || "-"}
          </Typography>
        </Tooltip>
      </CellContent>
    ),
  },

  // ================= PHONE =================

  {
    field: "phone",
    headerName: "Phone",
    width: 150,

    renderCell: (params) => (
      <CellContent>
        <Typography variant="body2" fontWeight={500} noWrap>
          {params.row.phone || "-"}
        </Typography>
      </CellContent>
    ),
  },

  // ================= REMARKS =================

  {
    field: "remarks",
    headerName: "Remarks",
    width: 220,

    renderCell: (params) => (
      <CellContent>
        <Tooltip title={params.row.remarks || "-"}>
          <Typography variant="body2" color="text.secondary" noWrap>
            {params.row.remarks || "-"}
          </Typography>
        </Tooltip>
      </CellContent>
    ),
  },

  // ================= LEAD =================

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

  // ================= ACTIONS =================

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
      <Stack
        direction="row"
        spacing={0.5}
        alignItems="center"
        justifyContent="center"
        width="100%"
      >
        {/* <Tooltip title="Edit">
          <IconButton
            size="small"
            color="primary"
            onClick={() => handleEdit(params.row)}
          >
            <Edit fontSize="small" />
          </IconButton>
        </Tooltip> */}

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
