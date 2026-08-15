import moment from "moment";
import { Edit } from "@mui/icons-material";

import { Avatar, IconButton, Stack, Tooltip, Typography } from "@mui/material";
import { Link } from "react-router-dom";

import StatusChip from "../../components/common/StatusChip";
import CellContent from "../../components/common/CellContent";

import { SUBSCRIPTION_STATUS_OPTIONS } from "../../constants/app";

export const BILLING_CYCLE = {
  1: "Monthly",
  2: "Quarterly",
  3: "Half Yearly",
  4: "Yearly",
};

export const Columns = (handleEdit) => [
  {
    field: "subscriptionnumber",
    headerName: "Subscription No.",
    width: 180,
    renderCell: ({ row }) => (
      <StatusChip type="warning" label={row.subscriptionnumber || "-"} />
    ),
  },

  {
    field: "hospitalname",
    headerName: "Hospital",
    width: 300,
    sortable: false,
    renderCell: ({ row }) => (
      <div className="flex h-full items-center gap-3">
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
          {row.hospitalname
            ?.split(" ")
            .filter(Boolean)
            .map((word) => word[0])
            .join("")
            .substring(0, 2)
            .toUpperCase() || "H"}
        </Avatar>

        <div className="flex flex-col justify-center gap-1">
          <Typography
            component={Link}
            to={`/leads/${row.id}`}
            sx={{
              fontSize: 14,
              fontWeight: 500,
              color: "#0F172A",
              textDecoration: "none",

              "&:hover": {
                color: "#2563EB",
              },
            }}
          >
            {row.hospitalname || "-"}
          </Typography>
        </div>
      </div>
    ),
  },

  {
    field: "planname",
    headerName: "Plan",
    width: 180,
    renderCell: ({ row }) => <StatusChip label={row.planname || "-"} />,
  },

  {
    field: "billingcycle",
    headerName: "Billing Cycle",
    width: 150,
    renderCell: ({ row }) => (
      <CellContent>
        <Typography sx={{ fontSize: 14 }}>
          {BILLING_CYCLE[row.billingcycle] || "-"}
        </Typography>
      </CellContent>
    ),
  },

  {
    field: "startdate",
    headerName: "Start Date",
    width: 150,
    renderCell: ({ row }) => (
      <CellContent>
        <Typography sx={{ fontSize: 14 }}>
          {row.startdate
            ? moment(Number(row.startdate)).format("DD/MM/YYYY")
            : "-"}
        </Typography>
      </CellContent>
    ),
  },

  {
    field: "enddate",
    headerName: "End Date",
    width: 150,
    renderCell: ({ row }) => (
      <CellContent>
        <Typography sx={{ fontSize: 14 }}>
          {row.enddate ? moment(Number(row.enddate)).format("DD/MM/YYYY") : "-"}
        </Typography>
      </CellContent>
    ),
  },

  {
    field: "amount",
    headerName: "Amount",
    width: 140,
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
          ₹{Number(row.amount || 0).toLocaleString("en-IN")}
        </Typography>
      </CellContent>
    ),
  },

  {
    field: "discount",
    headerName: "Discount",
    width: 130,
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

  {
    field: "tax",
    headerName: "Tax",
    width: 100,
    renderCell: ({ row }) => (
      <CellContent>
        <Typography sx={{ fontSize: 14 }}>{row.tax || 0}%</Typography>
      </CellContent>
    ),
  },

  {
    field: "totalamount",
    headerName: "Total Amount",
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
          ₹{Number(row.totalamount || 0).toLocaleString("en-IN")}
        </Typography>
      </CellContent>
    ),
  },

  {
    field: "subscriptionstatus",
    headerName: "Status",
    width: 130,
    renderCell: ({ row }) => {
      const status = SUBSCRIPTION_STATUS_OPTIONS.find(
        (item) => item.id === Number(row.subscriptionstatus),
      );

      return (
        <StatusChip
          type={Number(row.subscriptionstatus) === 1 ? "success" : "error"}
          label={status?.name || "-"}
        />
      );
    },
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
