import { Avatar, Tooltip, Typography } from "@mui/material";
import { Link } from "react-router-dom";

import StatusChip from "../../components/common/StatusChip";
import CellContent from "../../components/common/CellContent";
import ActionMenu from "./ActionMenu";

import { PRIORITY_OPTIONS, SOURCE_OPTIONS } from "../../constants/api";

export const columns = (
  handleEdit,
  handleDelete,
  leadStatuses,
  handleStatusChange,
) => [
  // ================= LEAD NUMBER =================

  {
    field: "leadnumber",
    headerName: "Lead Number",
    width: 200,
    sortable: false,
    renderCell: ({ row }) => (
      <StatusChip type="warning" label={row.leadnumber || "-"} />
    ),
  },

  // ================= HOSPITAL =================

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

  // ================= CONTACT PERSON =================

  {
    field: "contactperson",
    headerName: "Contact Person",
    width: 200,
    sortable: false,
    renderCell: ({ row }) => (
      <CellContent>
        <Typography
          sx={{
            fontSize: 14,
            fontWeight: 500,
          }}
        >
          {`${row.firstname || ""} ${row.lastname || ""}`.trim() || "-"}
        </Typography>
      </CellContent>
    ),
  },

  // ================= PHONE =================

  {
    field: "phone",
    headerName: "Phone",
    width: 150,
    renderCell: ({ row }) => (
      <CellContent>
        <Typography
          sx={{
            fontSize: 14,
          }}
        >
          {row.phone || "-"}
        </Typography>
      </CellContent>
    ),
  },

  // ================= EMAIL =================

  {
    field: "email",
    headerName: "Email",
    width: 250,
    renderCell: ({ row }) => (
      <CellContent>
        <Typography
          noWrap
          sx={{
            fontSize: 14,
          }}
        >
          {row.email || "-"}
        </Typography>
      </CellContent>
    ),
  },

  // ================= STATUS =================

  {
    field: "leadstatus",
    headerName: "Status",
    width: 150,
    renderCell: ({ row }) => (
      <StatusChip type="primary" label={row.leadstatus || "-"} />
    ),
  },

  // ================= PRIORITY =================

  {
    field: "priority",
    headerName: "Priority",
    width: 140,
    renderCell: ({ row }) => {
      const priority = PRIORITY_OPTIONS.find(
        (item) => item.id === Number(row.priority),
      );

      return (
        <StatusChip
          color={priority?.color || "info"}
          label={priority?.name || "-"}
        />
      );
    },
  },

  // ================= SOURCE =================

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

  // ================= LOCATION =================

  {
    field: "location",
    headerName: "Location",
    width: 220,
    sortable: false,
    renderCell: ({ row }) => (
      <CellContent>
        <Typography
          sx={{
            fontSize: 14,
          }}
        >
          {[row.city, row.statename, row.countryname]
            .filter(Boolean)
            .join(", ") || "-"}
        </Typography>
      </CellContent>
    ),
  },

  // ================= ASSIGNED TO =================

  {
    field: "assignedto",
    headerName: "Assigned To",
    width: 180,
    renderCell: ({ row }) => (
      <CellContent>
        <Typography
          sx={{
            fontSize: 14,
            color: "#0F172A",
          }}
        >
          {row.assignedto || "-"}
        </Typography>
      </CellContent>
    ),
  },

  // ================= EXPECTED AMOUNT =================

  {
    field: "expectedamount",
    headerName: "Expected Amount",
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
            fontWeight: 500,
          }}
        >
          ₹{Number(row.expectedamount || 0).toLocaleString("en-IN")}
        </Typography>
      </CellContent>
    ),
  },

  // ================= REMARKS =================

  {
    field: "remarks",
    headerName: "Remarks",
    width: 250,
    sortable: false,
    renderCell: ({ row }) => (
      <CellContent>
        <Tooltip title={row.remarks || "-"}>
          <Typography
            noWrap
            sx={{
              fontSize: 14,
            }}
          >
            {row.remarks || "-"}
          </Typography>
        </Tooltip>
      </CellContent>
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
