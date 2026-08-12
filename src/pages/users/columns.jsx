import { Delete, Edit } from "@mui/icons-material";
import { Avatar, IconButton, Stack, Tooltip, Typography } from "@mui/material";

export const columns = (handleEdit, handleDelete) => [
  {
    field: "user",
    headerName: "User",
    width: 300,
    renderCell: ({ row }) => (
      <Stack
        direction="row"
        spacing={2}
        className="items-center justify-center"
      >
        <Avatar
          sx={{
            width: 36,
            height: 36,
            bgcolor: "primary.main",
            fontSize: 14,
            fontWeight: 600,
          }}
        >
          {`${row?.firstname?.[0] || ""}${row?.lastname?.[0] || ""}`}
        </Avatar>

        <div className="flex flex-col justify-center">
          <Typography variant="body2" fontWeight={600}>
            {`${row?.firstname || ""} ${row?.lastname || ""}`}
          </Typography>
        </div>
      </Stack>
    ),
  },
  {
    field: "email",
    headerName: "Email",
    width: 300,
  },
  {
    field: "phone",
    headerName: "Phone",
  },
  {
    field: "actions",
    headerName: "Actions",
    align: "end",
    renderCell: (row) => (
      <Stack direction="row" spacing={0.5} justifyContent="flex-end">
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
