import { Avatar, Tooltip, Typography } from "@mui/material";
import { Link } from "react-router-dom";

import StatusChip from "../../components/common/StatusChip";
import ActionMenu from "./ActionMenu";

import { PRIORITY_OPTIONS, SOURCE_OPTIONS } from "../../constants/api";

export const columns = (
  handleEdit,
  handleDelete,
  leadStatuses,
  handleStatusChange,
) => [
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

          <StatusChip type="primary" label={row.leadnumber || "-"} />
        </div>
      </div>
    ),
  },

  {
    field: "contactperson",
    headerName: "Contact Person",
    width: 200,
    sortable: false,
    renderCell: ({ row }) => (
      <Typography
        sx={{
          fontSize: 14,
          fontWeight: 500,
          color: "#0F172A",
        }}
      >
        {`${row.firstname || ""} ${row.lastname || ""}`}
      </Typography>
    ),
  },

  {
    field: "phone",
    headerName: "Phone",
    width: 150,
    renderCell: ({ row }) => (
      <Typography
        sx={{
          fontSize: 14,
          color: "#64748B",
        }}
      >
        {row.phone || "-"}
      </Typography>
    ),
  },

  {
    field: "email",
    headerName: "Email",
    width: 250,
    renderCell: ({ row }) => (
      <Typography
        sx={{
          fontSize: 14,
          color: "#64748B",
        }}
      >
        {row.email || "-"}
      </Typography>
    ),
  },

  {
    field: "leadstatus",
    headerName: "Status",
    width: 150,
    renderCell: ({ row }) => (
      <StatusChip type="primary" label={row.leadstatus || "-"} />
    ),
  },

  {
    field: "priority",
    headerName: "Priority",
    width: 140,
    renderCell: ({ row }) => {
      const priority = PRIORITY_OPTIONS.find(
        (item) => item.id === Number(row.priority),
      );

      const type =
        {
          1: "success",
          2: "warning",
          3: "error",
        }[row.priority] || "info";

      return <StatusChip type={type} label={priority?.name || "-"} />;
    },
  },

  {
    field: "source",
    headerName: "Source",
    width: 140,
    renderCell: ({ row }) => {
      const source = SOURCE_OPTIONS.find(
        (item) => item.id === Number(row.source),
      );

      return <StatusChip type="info" label={source?.name || "-"} />;
    },
  },

  {
    field: "location",
    headerName: "Location",
    width: 220,
    sortable: false,
    renderCell: ({ row }) => (
      <Typography
        sx={{
          fontSize: 14,
          color: "#64748B",
        }}
      >
        {[row.city, row.statename, row.countryname]
          .filter(Boolean)
          .join(", ") || "-"}
      </Typography>
    ),
  },

  {
    field: "assignedto",
    headerName: "Assigned To",
    width: 180,
    renderCell: ({ row }) => (
      <Typography
        sx={{
          fontSize: 14,
          color: "#0F172A",
        }}
      >
        {row.assignedto || "-"}
      </Typography>
    ),
  },

  {
    field: "expectedamount",
    headerName: "Expected Amount",
    width: 180,
    align: "right",
    headerAlign: "right",
    renderCell: ({ row }) => (
      <Typography
        sx={{
          fontSize: 14,
          fontWeight: 500,
          color: "#0F172A",
        }}
      >
        ₹{Number(row.expectedamount || 0).toLocaleString("en-IN")}
      </Typography>
    ),
  },

  {
    field: "remarks",
    headerName: "Remarks",
    width: 250,
    sortable: false,
    renderCell: ({ row }) => (
      <Tooltip title={row.remarks || "-"}>
        <Typography
          noWrap
          sx={{
            fontSize: 14,
            color: "#64748B",
          }}
        >
          {row.remarks || "-"}
        </Typography>
      </Tooltip>
    ),
  },

  {
    field: "actions",
    headerName: "",
    width: 80,
    sortable: false,
    filterable: false,
    disableColumnMenu: true,
    align: "center",
    headerAlign: "center",
    renderCell: ({ row }) => (
      <ActionMenu
        row={row}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
        leadStatuses={leadStatuses}
        onStatusChange={handleStatusChange}
      />
    ),
  },
];
