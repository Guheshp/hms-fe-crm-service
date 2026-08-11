import moment from "moment";
import { Delete, Edit } from "@mui/icons-material";

import { IconButton, Stack, Tooltip, Typography } from "@mui/material";
import StatusChip from "../../../components/common/StatusChip";

export const BILLING_CYCLE = {
  1: "Monthly",
  2: "Quarterly",
  3: "Half Yearly",
  4: "Yearly",
};

export const subscriptionColumns = (handleEdit) => [
  {
    field: "subscriptionnumber",
    headerName: "Subscription No.",
    width: 180,
  },

  {
    field: "planname",
    headerName: "Plan",
    width: 180,
  },

  {
    field: "billingcycle",
    headerName: "Billing Cycle",
    width: 150,
    renderCell: ({ row }) => (
      <Typography>{BILLING_CYCLE[row.billingcycle] || "-"}</Typography>
    ),
  },

  {
    field: "startdate",
    headerName: "Start Date",
    width: 150,
    renderCell: ({ row }) => (
      <Typography>
        {row.startdate
          ? moment(Number(row.startdate)).format("DD/MM/YYYY")
          : "-"}
      </Typography>
    ),
  },

  {
    field: "enddate",
    headerName: "End Date",
    width: 150,
    renderCell: ({ row }) => (
      <Typography>
        {row.enddate ? moment(Number(row.enddate)).format("DD/MM/YYYY") : "-"}
      </Typography>
    ),
  },

  {
    field: "amount",
    headerName: "Amount",
    width: 140,
    renderCell: ({ row }) => (
      <Typography fontWeight={600}>
        ₹{Number(row.amount || 0).toLocaleString("en-IN")}
      </Typography>
    ),
  },

  {
    field: "discount",
    headerName: "Discount",
    width: 130,
    renderCell: ({ row }) => (
      <Typography>
        ₹{Number(row.discount || 0).toLocaleString("en-IN")}
      </Typography>
    ),
  },

  {
    field: "tax",
    headerName: "Tax",
    width: 100,
    renderCell: ({ row }) => <Typography>{row.tax || 0}%</Typography>,
  },

  {
    field: "totalamount",
    headerName: "Total Amount",
    width: 150,
    renderCell: ({ row }) => (
      <Typography fontWeight={700} color="primary.main">
        ₹{Number(row.totalamount || 0).toLocaleString("en-IN")}
      </Typography>
    ),
  },

  {
    field: "status",
    headerName: "Status",
    width: 130,
    renderCell: ({ row }) => (
      <StatusChip
        type={Number(row.status) === 1 ? "success" : "error"}
        label={Number(row.status) === 1 ? "Active" : "Inactive"}
      />
    ),
  },

  {
    field: "actions",
    headerName: "Actions",
    width: 100,
    sortable: false,
    filterable: false,
    disableColumnMenu: true,
    align: "center",
    headerAlign: "center",

    renderCell: ({ row }) => (
      <Stack direction="row">
        <Tooltip title="Edit">
          <IconButton
            size="small"
            color="primary"
            onClick={() => handleEdit(row)}
          >
            <Edit fontSize="small" />
          </IconButton>
        </Tooltip>
      </Stack>
    ),
  },
];
