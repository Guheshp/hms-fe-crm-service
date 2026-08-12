import { Delete, Edit } from "@mui/icons-material";

import { Avatar, IconButton, Stack, Tooltip, Typography } from "@mui/material";

import StatusChip from "../../components/common/StatusChip";

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
            className="leading-none"
            sx={{
              fontSize: 14,
              // fontWeight: 700,
              color: "#0F172A",
            }}
          >
            {params.row.hospitalname || "-"}
          </Typography>
        </div>
      </div>
    ),
  },
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

    renderCell: (params) => (
      <Typography variant="body2" fontWeight={500} noWrap>
        {params.row.contactperson || "-"}
      </Typography>
    ),
  },

  // ================= EMAIL =================

  {
    field: "email",
    headerName: "Email",
    width: 240,

    renderCell: (params) => (
      <Tooltip title={params.row.email || "-"}>
        <Typography variant="body2" noWrap color="text.secondary">
          {params.row.email || "-"}
        </Typography>
      </Tooltip>
    ),
  },

  // ================= PHONE =================

  {
    field: "phone",
    headerName: "Phone",
    width: 150,

    renderCell: (params) => (
      <Typography variant="body2" fontWeight={500} noWrap>
        {params.row.phone || "-"}
      </Typography>
    ),
  },

  // ================= REMARKS =================

  {
    field: "remarks",
    headerName: "Remarks",
    width: 220,

    renderCell: (params) => (
      <Tooltip title={params.row.remarks || "-"}>
        <Typography variant="body2" color="text.secondary" noWrap>
          {params.row.remarks || "-"}
        </Typography>
      </Tooltip>
    ),
  },

  // ================= LEAD STATUS =================

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
        {/* Edit */}

        <Tooltip title="Edit">
          <IconButton
            size="small"
            color="primary"
            onClick={() => handleEdit(params.row)}
            sx={{
              width: 34,
              height: 34,

              "&:hover": {
                backgroundColor: "#EFF6FF",
              },
            }}
          >
            <Edit fontSize="small" />
          </IconButton>
        </Tooltip>

        {/* Delete */}

        <Tooltip title="Delete">
          <IconButton
            size="small"
            color="error"
            onClick={() => handleDelete(params.row)}
            sx={{
              width: 34,
              height: 34,

              "&:hover": {
                backgroundColor: "#FEF2F2",
              },
            }}
          >
            <Delete fontSize="small" />
          </IconButton>
        </Tooltip>
      </Stack>
    ),
  },
];
