import moment from "moment";

import { Delete, Edit } from "@mui/icons-material";

import { IconButton, Stack, Tooltip, Typography } from "@mui/material";

import StatusChip from "../../components/common/StatusChip";
import CellContent from "../../components/common/CellContent";

import {
  PAYMENT_GATEWAY_OPTIONS,
  PAYMENT_MODE_OPTIONS,
  SUBSCRIPTION_STATUS_OPTIONS,
} from "../../constants/app";

export const Columns = (handleEdit, handleDelete) => [
  {
    field: "paymentnumber",
    headerName: "Payment Number",
    width: 180,
    renderCell: ({ row }) => (
      <StatusChip type="warning" label={row.paymentnumber || "-"} />
    ),
  },

  {
    field: "transactionid",
    headerName: "Transaction ID",
    width: 250,
    renderCell: ({ row }) => (
      <CellContent>
        <Tooltip title={row.transactionid || "-"}>
          <Typography noWrap sx={{ fontSize: 14 }}>
            {row.transactionid || "-"}
          </Typography>
        </Tooltip>
      </CellContent>
    ),
  },

  {
    field: "paymentdate",
    headerName: "Payment Date",
    width: 150,
    renderCell: ({ row }) => (
      <CellContent>
        <Typography sx={{ fontSize: 14 }}>
          {row.paymentdate
            ? moment(Number(row.paymentdate)).format("DD/MM/YYYY")
            : "-"}
        </Typography>
      </CellContent>
    ),
  },

  {
    field: "amounts",
    headerName: "Amounts",
    width: 240,
    sortable: false,
    renderCell: ({ row }) => (
      <CellContent>
        <Stack spacing={0.5}>
          <Typography
            sx={{
              fontSize: 14,
              fontWeight: 500,
            }}
          >
            Subscription: {row.currency || "INR"}{" "}
            {Number(row.subscriptionamount || 0).toLocaleString("en-IN")}
          </Typography>

          <Typography sx={{ fontSize: 13 }}>
            Total: {row.currency || "INR"}{" "}
            {Number(row.totalamount || 0).toLocaleString("en-IN")}
          </Typography>
        </Stack>
      </CellContent>
    ),
  },

  {
    field: "discount",
    headerName: "Discount",
    width: 130,
    renderCell: ({ row }) => (
      <CellContent>
        <Typography sx={{ fontSize: 14 }}>
          {row.currency || "INR"}{" "}
          {Number(row.discount || 0).toLocaleString("en-IN")}
        </Typography>
      </CellContent>
    ),
  },

  {
    field: "tax",
    headerName: "Tax",
    width: 100,
    renderCell: ({ row }) => (
      <StatusChip type="info" label={`${row.tax || 0}%`} />
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

      return <StatusChip type="primary" label={paymentMode?.name || "-"} />;
    },
  },

  {
    field: "paymentgateway",
    headerName: "Gateway",
    width: 150,
    renderCell: ({ row }) => {
      const gateway = PAYMENT_GATEWAY_OPTIONS.find(
        (item) => item.id === Number(row.paymentgateway),
      );

      return (
        <CellContent>
          <Typography
            sx={{
              fontSize: 14,
              color: "#0F172A",
              fontWeight: 500,
            }}
          >
            {gateway?.name || "-"}
          </Typography>
        </CellContent>
      );
    },
  },

  {
    field: "subscriptionstatus",
    headerName: "Status",
    width: 150,
    renderCell: ({ row }) => {
      const status = SUBSCRIPTION_STATUS_OPTIONS.find(
        (item) => item.id === Number(row.subscriptionstatus),
      );

      return (
        <StatusChip
          type={row.subscriptionstatus === 1 ? "success" : "error"}
          label={status?.name || "-"}
        />
      );
    },
  },

  {
    field: "actions",
    headerName: "Action",
    width: 100,
    sortable: false,
    filterable: false,
    disableColumnMenu: true,
    align: "center",
    headerAlign: "center",
    renderCell: ({ row }) => (
      <Stack direction="row" spacing={0.5}>
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
