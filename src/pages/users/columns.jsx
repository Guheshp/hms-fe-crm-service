import { Delete, Edit } from "@mui/icons-material";
import { Avatar, IconButton, Stack, Tooltip, Typography } from "@mui/material";

import CellContent from "../../components/common/CellContent";

export const columns = (handleEdit, handleDelete) => [
  {
    field: "user",
    headerName: "User",
    width: 300,
    sortable: false,

    renderCell: ({ row }) => (
      <CellContent>
        <Stack direction="row" spacing={2} alignItems="center">
          <Avatar
            sx={{
              width: 36,
              height: 36,
              bgcolor: "primary.main",
              fontSize: 14,
              fontWeight: 600,
              flexShrink: 0,
            }}
          >
            {`${row?.firstname?.[0] || ""}${row?.lastname?.[0] || ""}`}
          </Avatar>

          <Typography variant="body2" fontWeight={600}>
            {`${row?.firstname || ""} ${row?.lastname || ""}`}
          </Typography>
        </Stack>
      </CellContent>
    ),
  },

  {
    field: "email",
    headerName: "Email",
    width: 300,

    renderCell: ({ row }) => (
      <CellContent>
        <Tooltip title={row.email || "-"}>
          <Typography variant="body2" noWrap>
            {row.email || "-"}
          </Typography>
        </Tooltip>
      </CellContent>
    ),
  },

  {
    field: "phone",
    headerName: "Phone",
    width: 180,

    renderCell: ({ row }) => (
      <CellContent>
        <Typography variant="body2">{row.phone || "-"}</Typography>
      </CellContent>
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
      <Stack
        direction="row"
        spacing={0.5}
        alignItems="center"
        justifyContent="center"
        width="100%"
      >
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
