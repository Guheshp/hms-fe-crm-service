import { Download, Upload } from "@mui/icons-material";

import { Box, Button, Paper } from "@mui/material";

import { DataGrid } from "@mui/x-data-grid";

import TableToolbar from "./TableToolbar";

const DataGridTable = ({
  rows = [],
  columns = [],
  loading = false,

  page = 0,
  pageSize = 10,
  rowCount = 0,

  search = "",
  onSearch,

  onPageChange,
  onPageSizeChange,

  // Future Import / Export handlers
  onImport,
  onExport,
}) => {
  return (
    <Paper
      elevation={0}
      sx={{
        width: "100%",

        borderRadius: 3,

        border: "1px solid #E2E8F0",

        backgroundColor: "#FFFFFF",

        overflow: "hidden",
      }}
    >
      {/* ================= TABLE TOOLBAR ================= */}

      <Box
        sx={{
          minHeight: 64,

          px: 2,

          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",

          gap: 2,

          borderBottom: "1px solid #E2E8F0",

          backgroundColor: "#FFFFFF",
        }}
      >
        {/* Search */}

        <Box
          sx={{
            maxWidth: 400,
          }}
        >
          {onSearch && (
            <TableToolbar
              search={search}
              onSearch={onSearch}
              placeholder="Search..."
            />
          )}
        </Box>

        {/* Actions */}

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          <Button
            variant="outlined"
            size="small"
            startIcon={<Upload />}
            onClick={onImport}
            disabled={!onImport}
            sx={{
              minHeight: 38,

              px: 1.8,

              borderRadius: 2,

              textTransform: "none",

              fontWeight: 600,

              color: "#475569",

              borderColor: "#E2E8F0",

              "&:hover": {
                borderColor: "#2563EB",
                color: "#2563EB",
                backgroundColor: "#EFF6FF",
              },
            }}
          >
            Import
          </Button>

          <Button
            variant="outlined"
            size="small"
            startIcon={<Download />}
            onClick={onExport}
            disabled={!onExport}
            sx={{
              minHeight: 38,

              px: 1.8,

              borderRadius: 2,

              textTransform: "none",

              fontWeight: 600,

              color: "#475569",

              borderColor: "#E2E8F0",

              "&:hover": {
                borderColor: "#2563EB",
                color: "#2563EB",
                backgroundColor: "#EFF6FF",
              },
            }}
          >
            Export
          </Button>
        </Box>
      </Box>

      {/* ================= DATA GRID ================= */}

      <Box
        sx={{
          width: "100%",

          height: {
            xs: 520,
            md: "calc(100vh - 250px)",
          },

          minHeight: 420,
        }}
      >
        <DataGrid
          rows={rows}
          columns={columns}
          loading={loading}
          rowCount={rowCount}
          paginationMode="server"
          paginationModel={{
            page,
            pageSize,
          }}
          onPaginationModelChange={(model) => {
            if (model.page !== page) {
              onPageChange?.(model.page);
            }

            if (model.pageSize !== pageSize) {
              onPageSizeChange?.(model.pageSize);
            }
          }}
          pageSizeOptions={[10, 25, 50, 100]}
          disableRowSelectionOnClick
          disableColumnMenu
          getRowId={(row) => row.id}
          rowHeight={64}
          columnHeaderHeight={52}
          sx={{
            border: 0,

            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: "#F8FAFC",
              borderBottom: "1px solid #E2E8F0",
            },

            "& .MuiDataGrid-columnHeader": {
              px: 2,
              outline: "none",
            },

            "& .MuiDataGrid-columnHeaderTitle": {
              fontSize: 13,
              fontWeight: 700,
              color: "#475569",
            },

            "& .MuiDataGrid-cell": {
              px: 2,

              display: "flex",
              alignItems: "center",

              borderBottom: "1px solid #F1F5F9",

              fontSize: 14,

              color: "#0F172A",

              outline: "none",
            },

            "& .MuiDataGrid-row:hover": {
              backgroundColor: "#F8FAFC",
            },

            "& .MuiDataGrid-footerContainer": {
              minHeight: 56,

              borderTop: "1px solid #E2E8F0",

              backgroundColor: "#FFFFFF",
            },

            "& .MuiTablePagination-root": {
              color: "#64748B",
            },

            "& .MuiDataGrid-cell:focus, & .MuiDataGrid-cell:focus-within": {
              outline: "none",
            },

            "& .MuiDataGrid-columnHeader:focus, & .MuiDataGrid-columnHeader:focus-within":
              {
                outline: "none",
              },

            "& .MuiDataGrid-overlay": {
              backgroundColor: "#FFFFFF",
            },

            "& ::-webkit-scrollbar": {
              width: 6,
              height: 6,
            },

            "& ::-webkit-scrollbar-thumb": {
              backgroundColor: "#CBD5E1",
              borderRadius: 10,
            },

            "& ::-webkit-scrollbar-track": {
              backgroundColor: "transparent",
            },
          }}
        />
      </Box>
    </Paper>
  );
};

export default DataGridTable;
