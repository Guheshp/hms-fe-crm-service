import moment from "moment";
import { Delete, Edit } from "@mui/icons-material";
import { IconButton, Stack, Tooltip, Typography } from "@mui/material";

import StatusChip from "../../components/common/StatusChip";
import CellContent from "../../components/common/CellContent";

import { FOLLOWUP_MODE_OPTIONS } from "../../constants/app";

export const columns = (handleEdit, handleDelete) => [
  // ================= FOLLOW UP DATE =================

  {
    field: "followupdate",
    headerName: "Follow Up Date",
    width: 170,
    sortable: false,
    renderCell: ({ row }) => (
      <CellContent>
        <Typography
          sx={{
            fontSize: 14,
          }}
        >
          {row?.followupdate
            ? moment(Number(row.followupdate)).format("DD/MM/YYYY")
            : "-"}
        </Typography>
      </CellContent>
    ),
  },

  // ================= LEAD STATUS =================

  {
    field: "leadstatus",
    headerName: "Lead Status",
    width: 170,
    sortable: false,
    renderCell: ({ row }) => (
      <CellContent>
        <StatusChip type="primary" label={row?.leadstatus || "-"} />
      </CellContent>
    ),
  },

  // ================= MODE =================

  {
    field: "mode",
    headerName: "Mode",
    width: 150,
    sortable: false,
    renderCell: ({ row }) => {
      const mode = FOLLOWUP_MODE_OPTIONS.find(
        (item) => item.id === Number(row?.mode),
      );

      return (
        <CellContent>
          <StatusChip type={mode?.type || "info"} label={mode?.name || "-"} />
        </CellContent>
      );
    },
  },

  // ================= NEXT FOLLOW UP =================

  {
    field: "nextfollowupdate",
    headerName: "Next Follow Up",
    width: 180,
    sortable: false,
    renderCell: ({ row }) => (
      <CellContent>
        <Typography
          sx={{
            fontSize: 14,
          }}
        >
          {row?.nextfollowupdate
            ? moment(Number(row.nextfollowupdate)).format("DD/MM/YYYY")
            : "-"}
        </Typography>
      </CellContent>
    ),
  },

  // ================= REMARKS =================

  {
    field: "remarks",
    headerName: "Remarks",
    flex: 1,
    minWidth: 250,
    sortable: false,
    renderCell: ({ row }) => (
      <CellContent>
        <Tooltip title={row?.remarks || "-"}>
          <Typography
            noWrap
            sx={{
              fontSize: 14,
            }}
          >
            {row?.remarks || "-"}
          </Typography>
        </Tooltip>
      </CellContent>
    ),
  },

  // ================= ACTIONS =================

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
      <CellContent>
        <Stack
          direction="row"
          spacing={1}
          sx={{
            width: "100%",
            justifyContent: "center",
          }}
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
      </CellContent>
    ),
  },
];
