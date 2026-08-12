import moment from "moment";

import { Edit, Delete } from "@mui/icons-material";

import { Chip, IconButton, Stack, Tooltip, Typography } from "@mui/material";
import { PAYMENT_MODE_OPTIONS } from "../../../constants/app";

const PAYMENT_STATUS = {
  1: {
    label: "Paid",
    color: "success",
  },
  2: {
    label: "Pending",
    color: "warning",
  },
  3: {
    label: "Failed",
    color: "error",
  },
  4: {
    label: "Cancelled",
    color: "default",
  },
};

export const Columns = (handleEdit, handleDelete) => [
  {
    field: "paymentnumber",
    headerName: "Payment No",
    width: 160,
    renderCell: ({ row }) => (
      <Typography fontWeight={600}>{row.paymentnumber || "-"}</Typography>
    ),
  },

  {
    field: "subscriptionnumber",
    headerName: "Subscription No",
    width: 180,
    renderCell: ({ row }) => (
      <Typography>{row.subscriptionnumber || "-"}</Typography>
    ),
  },

  {
    field: "planname",
    headerName: "Plan",
    width: 160,
    renderCell: ({ row }) => (
      <Stack>
        <Typography fontWeight={600}>{row.planname || "-"}</Typography>

        <Typography variant="caption" color="text.secondary">
          {row.plancode || "-"}
        </Typography>
      </Stack>
    ),
  },

  {
    field: "paymentdate",
    headerName: "Payment Date",
    width: 160,
    renderCell: ({ row }) => (
      <Typography>
        {row.paymentdate
          ? moment(Number(row.paymentdate)).format("DD/MM/YYYY")
          : "-"}
      </Typography>
    ),
  },

  {
    field: "amount",
    headerName: "Amount",
    width: 140,
    renderCell: ({ row }) => (
      <Typography>
        {row.currency || "INR"}{" "}
        {Number(row.amount || 0).toLocaleString("en-IN", {
          minimumFractionDigits: 2,
        })}
      </Typography>
    ),
  },

  {
    field: "discount",
    headerName: "Discount",
    width: 120,
    renderCell: ({ row }) => (
      <Typography>
        ₹
        {Number(row.discount || 0).toLocaleString("en-IN", {
          minimumFractionDigits: 2,
        })}
      </Typography>
    ),
  },

  {
    field: "tax",
    headerName: "Tax",
    width: 100,
    renderCell: ({ row }) => <Typography>{Number(row.tax || 0)}%</Typography>,
  },

  {
    field: "totalamount",
    headerName: "Total Amount",
    width: 150,
    renderCell: ({ row }) => (
      <Typography fontWeight={700} color="primary.main">
        {row.currency || "INR"}{" "}
        {Number(row.totalamount || 0).toLocaleString("en-IN", {
          minimumFractionDigits: 2,
        })}
      </Typography>
    ),
  },

  {
    field: "paymentmode",
    headerName: "Payment Mode",
    width: 150,
    renderCell: ({ row }) => {
      const paymentMode = PAYMENT_MODE_OPTIONS.find(
        (item) => item.id === Number(row.paymentmode),
      );

      return <Typography>{paymentMode?.name || "-"}</Typography>;
    },
  },

  {
    field: "status",
    headerName: "Status",
    width: 120,
    renderCell: ({ row }) => {
      const status = PAYMENT_STATUS[row.status];

      return (
        <Chip
          size="small"
          label={status?.label || "Unknown"}
          color={status?.color || "default"}
          sx={{
            fontWeight: 600,
          }}
        />
      );
    },
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
      <Stack direction="row" spacing={0.5} justifyContent="center">
        <Tooltip title="Edit">
          <IconButton
            size="small"
            color="primary"
            onClick={() => handleEdit(row)}
          >
            <Edit fontSize="small" />
          </IconButton>
        </Tooltip>

        {handleDelete && (
          <Tooltip title="Delete">
            <IconButton
              size="small"
              color="error"
              onClick={() => handleDelete(row)}
            >
              <Delete fontSize="small" />
            </IconButton>
          </Tooltip>
        )}
      </Stack>
    ),
  },
];
