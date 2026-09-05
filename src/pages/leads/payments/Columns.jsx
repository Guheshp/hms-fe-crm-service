import moment from "moment";

import { Delete, Edit } from "@mui/icons-material";
import { IconButton, Stack, Tooltip, Typography } from "@mui/material";

import StatusChip from "../../../components/common/StatusChip";
import CellContent from "../../../components/common/CellContent";

import {
  PAYMENT_GATEWAY_OPTIONS,
  PAYMENT_MODE_OPTIONS,
  SUBSCRIPTION_STATUS_OPTIONS,
} from "../../../constants/app";

export const Columns = (handleEdit, handleDelete) => [
  // ================= PAYMENT NUMBER =================

  {
    field: "paymentnumber",
    headerName: "Payment Number",
    width: 200,
    sortable: false,
    renderCell: ({ row }) => (
      <StatusChip type="warning" label={row.paymentnumber || "-"} />
    ),
  },

  // ================= TRANSACTION ID =================

  {
    field: "transactionid",
    headerName: "Transaction ID",
    width: 250,
    sortable: false,
    renderCell: ({ row }) => (
      <CellContent>
        <Tooltip title={row.transactionid || "-"}>
          <Typography
            noWrap
            sx={{
              fontSize: 14,
              color: "#64748B",
              maxWidth: "100%",
            }}
          >
            {row.transactionid || "-"}
          </Typography>
        </Tooltip>
      </CellContent>
    ),
  },

  // ================= PAYMENT DATE =================

  {
    field: "paymentdate",
    headerName: "Payment Date",
    width: 150,
    sortable: false,
    renderCell: ({ row }) => (
      <CellContent>
        <Typography
          sx={{
            fontSize: 14,
          }}
        >
          {row.paymentdate
            ? moment(Number(row.paymentdate)).format("DD/MM/YYYY")
            : "-"}
        </Typography>
      </CellContent>
    ),
  },

  // ================= AMOUNTS =================

  {
    field: "amounts",
    headerName: "Amounts",
    width: 250,
    sortable: false,
    renderCell: ({ row }) => {
      const currency = row.currency || "INR";
      const subscriptionAmount = Number(row.subscriptionamount || 0);
      const totalAmount = Number(row.totalamount || 0);

      return (
        <CellContent>
          <Stack spacing={0.25}>
            <Typography
              sx={{
                fontSize: 14,
                fontWeight: 500,
              }}
            >
              Subscription: {currency}{" "}
              {subscriptionAmount.toLocaleString("en-IN")}
            </Typography>

            <Typography
              sx={{
                fontSize: 13,
                color: "#64748B",
              }}
            >
              Total: {currency} {totalAmount.toLocaleString("en-IN")}
            </Typography>
          </Stack>
        </CellContent>
      );
    },
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
          {row.currency || "INR"}{" "}
          {Number(row.discount || 0).toLocaleString("en-IN")}
        </Typography>
      </CellContent>
    ),
  },

  // ================= TAX =================

  {
    field: "tax",
    headerName: "Tax",
    width: 100,
    align: "center",
    headerAlign: "center",
    sortable: false,
    renderCell: ({ row }) => (
      <StatusChip type="info" label={`${Number(row.tax || 0)}%`} />
    ),
  },

  // ================= PAYMENT MODE =================

  {
    field: "paymentmode",
    headerName: "Payment Mode",
    width: 160,
    sortable: false,
    renderCell: ({ row }) => {
      const paymentMode = PAYMENT_MODE_OPTIONS.find(
        (item) => item.id === Number(row.paymentmode),
      );

      return <StatusChip type="primary" label={paymentMode?.name || "-"} />;
    },
  },

  // ================= PAYMENT GATEWAY =================

  {
    field: "paymentgateway",
    headerName: "Gateway",
    width: 160,
    sortable: false,
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

  // ================= STATUS =================

  {
    field: "subscriptionstatus",
    headerName: "Status",
    width: 150,
    sortable: false,
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

  // ================= ACTIONS =================

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
      <Stack
        direction="row"
        spacing={0.5}
        alignItems="center"
        justifyContent="center"
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
