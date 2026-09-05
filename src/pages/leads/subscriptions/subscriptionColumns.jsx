import moment from "moment";
import { Edit } from "@mui/icons-material";
import { IconButton, Stack, Tooltip, Typography } from "@mui/material";

import StatusChip from "../../../components/common/StatusChip";
import CellContent from "../../../components/common/CellContent";

export const BILLING_CYCLE = {
  1: "Monthly",
  2: "Quarterly",
  3: "Half Yearly",
  4: "Yearly",
};

export const subscriptionColumns = (handleEdit) => [
  // ================= SUBSCRIPTION NUMBER =================

  {
    field: "subscriptionnumber",
    headerName: "Subscription No.",
    width: 200,
    sortable: false,
    renderCell: ({ row }) => (
      <StatusChip type="warning" label={row.subscriptionnumber || "-"} />
    ),
  },

  // ================= PLAN =================

  {
    field: "planname",
    headerName: "Plan",
    width: 200,
    sortable: false,
    renderCell: ({ row }) => (
      <CellContent>
        <Typography
          sx={{
            fontSize: 14,
            fontWeight: 500,
            color: "#0F172A",
          }}
        >
          {row.planname || "-"}
        </Typography>
      </CellContent>
    ),
  },

  // ================= BILLING CYCLE =================

  {
    field: "billingcycle",
    headerName: "Billing Cycle",
    width: 160,
    sortable: false,
    renderCell: ({ row }) => (
      <CellContent>
        <Typography
          sx={{
            fontSize: 14,
          }}
        >
          {BILLING_CYCLE[Number(row.billingcycle)] || "-"}
        </Typography>
      </CellContent>
    ),
  },

  // ================= START DATE =================

  {
    field: "startdate",
    headerName: "Start Date",
    width: 150,
    sortable: false,
    renderCell: ({ row }) => (
      <CellContent>
        <Typography
          sx={{
            fontSize: 14,
          }}
        >
          {row.startdate
            ? moment(Number(row.startdate)).format("DD/MM/YYYY")
            : "-"}
        </Typography>
      </CellContent>
    ),
  },

  // ================= END DATE =================

  {
    field: "enddate",
    headerName: "End Date",
    width: 150,
    sortable: false,
    renderCell: ({ row }) => (
      <CellContent>
        <Typography
          sx={{
            fontSize: 14,
          }}
        >
          {row.enddate ? moment(Number(row.enddate)).format("DD/MM/YYYY") : "-"}
        </Typography>
      </CellContent>
    ),
  },

  // ================= AMOUNT =================

  {
    field: "amount",
    headerName: "Amount",
    width: 160,
    align: "right",
    headerAlign: "right",
    renderCell: ({ row }) => (
      <CellContent>
        <Typography
          sx={{
            width: "100%",
            textAlign: "right",
            fontSize: 14,
            fontWeight: 500,
          }}
        >
          ₹{Number(row.amount || 0).toLocaleString("en-IN")}
        </Typography>
      </CellContent>
    ),
  },

  // ================= DISCOUNT =================

  {
    field: "discount",
    headerName: "Discount",
    width: 150,
    align: "right",
    headerAlign: "right",
    renderCell: ({ row }) => (
      <CellContent>
        <Typography
          sx={{
            width: "100%",
            textAlign: "right",
            fontSize: 14,
          }}
        >
          ₹{Number(row.discount || 0).toLocaleString("en-IN")}
        </Typography>
      </CellContent>
    ),
  },

  // ================= TAX =================

  {
    field: "tax",
    headerName: "Tax",
    width: 100,
    align: "right",
    headerAlign: "right",
    renderCell: ({ row }) => (
      <CellContent>
        <Typography
          sx={{
            width: "100%",
            textAlign: "right",
            fontSize: 14,
          }}
        >
          {Number(row.tax || 0)}%
        </Typography>
      </CellContent>
    ),
  },

  // ================= TOTAL AMOUNT =================

  {
    field: "totalamount",
    headerName: "Total Amount",
    width: 180,
    align: "right",
    headerAlign: "right",
    renderCell: ({ row }) => (
      <CellContent>
        <Typography
          sx={{
            width: "100%",
            textAlign: "right",
            fontSize: 14,
            fontWeight: 700,
            color: "primary.main",
          }}
        >
          ₹{Number(row.totalamount || 0).toLocaleString("en-IN")}
        </Typography>
      </CellContent>
    ),
  },

  // ================= STATUS =================

  {
    field: "status",
    headerName: "Status",
    width: 140,
    sortable: false,
    renderCell: ({ row }) => (
      <StatusChip
        type={Number(row.status) === 1 ? "success" : "error"}
        label={Number(row.status) === 1 ? "Active" : "Inactive"}
      />
    ),
  },

  // ================= ACTIONS =================

  {
    field: "actions",
    headerName: "Action",
    width: 80,
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
