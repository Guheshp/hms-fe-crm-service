import { Download, Upload, Delete } from "@mui/icons-material";

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
  onDelete,

  checkboxSelection = false,
  rowSelectionModel = [],
  onRowSelectionModelChange = () => {},
}) => {
  const selectedRowsCount =
    rowSelectionModel?.ids instanceof Set ? rowSelectionModel.ids.size : 0;
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

          borderBottom: "1px solid #E2E8F0",
          backgroundColor: "#FFFFFF",
        }}
      >
        {/* Left Section */}

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1.5,
          }}
        >
          {onSearch && (
            <Box sx={{ width: 320 }}>
              <TableToolbar
                search={search}
                onSearch={onSearch}
                placeholder="Search..."
              />
            </Box>
          )}

          <Button
            variant="outlined"
            size="small"
            startIcon={<Upload />}
            onClick={onImport}
            disabled={!onImport}
            sx={{
              minHeight: 38,
              px: 2,
              borderRadius: 2,
              textTransform: "none",
              fontWeight: 600,

              color: "#EA580C",
              backgroundColor: "#FFF7ED",
              borderColor: "#FED7AA",

              "&:hover": {
                backgroundColor: "#FFEDD5",
                borderColor: "#FDBA74",
              },

              "& .MuiSvgIcon-root": {
                color: "#EA580C",
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
              px: 2,
              borderRadius: 2,
              textTransform: "none",
              fontWeight: 600,

              color: "#059669",
              backgroundColor: "#ECFDF5",
              borderColor: "#A7F3D0",

              "&:hover": {
                backgroundColor: "#D1FAE5",
                borderColor: "#6EE7B7",
              },
            }}
          >
            Export
          </Button>

          {selectedRowsCount > 0 ? (
            <Button
              variant="contained"
              size="small"
              startIcon={<Delete />}
              onClick={onDelete}
              sx={{
                minHeight: 38,
                px: 2,
                borderRadius: 2,
                textTransform: "none",
                fontWeight: 600,
                color: "#DC2626",
                backgroundColor: "#FEE2E2",
                boxShadow: "none",

                "&:hover": {
                  backgroundColor: "#FECACA",
                  boxShadow: "none",
                },

                "& .MuiSvgIcon-root": {
                  color: "#DC2626",
                },
              }}
            >
              Delete ({selectedRowsCount})
            </Button>
          ) : null}
        </Box>

        {/* Right Section */}

        <Button
          variant="contained"
          size="small"
          startIcon={<Delete />}
          onClick={onDelete}
          sx={{
            minHeight: 38,
            px: 2,

            borderRadius: 2,

            textTransform: "none",
            fontWeight: 600,

            color: "#DC2626",
            backgroundColor: "#FEE2E2",

            boxShadow: "none",

            "&:hover": {
              backgroundColor: "#FECACA",
              boxShadow: "none",
            },
          }}
        >
          Trash
        </Button>
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
          checkboxSelection={checkboxSelection}
          checkboxSelectionVisibleOnly
          keepNonExistentRowsSelected
          disableRowSelectionExcludeModel
          rowSelectionModel={rowSelectionModel}
          onRowSelectionModelChange={(model) => {
            if (model.type === "exclude") {
              onRowSelectionModelChange({
                type: "include",
                ids: new Set(rows.map((row) => row.id)),
              });

              return;
            }

            onRowSelectionModelChange(model);
          }}
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
              outline: "none",
            },

            "& .MuiDataGrid-columnHeaderTitle": {
              fontSize: 13,
              fontWeight: 700,
              color: "#475569",
            },

            "& .MuiDataGrid-row.Mui-selected": {
              backgroundColor: "rgba(37, 99, 235, 0.04) !important",
            },

            "& .MuiDataGrid-row:hover": {
              backgroundColor: "#F8FAFC",
            },

            "& .MuiDataGrid-cell": {
              borderBottom: "1px solid #F1F5F9",
              fontSize: 14,
              color: "#0F172A",
              outline: "none",
            },

            "& .MuiCheckbox-root": {
              color: "#94A3B8",
            },

            "& .MuiCheckbox-root.Mui-checked": {
              color: "#2563EB",
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
        {/* <DataGrid
          rows={rows}
          columns={columns}
          loading={loading}
          rowCount={rowCount}
          checkboxSelection={checkboxSelection}
          checkboxSelectionVisibleOnly
          keepNonExistentRowsSelected
          disableRowSelectionExcludeModel
          rowSelectionModel={rowSelectionModel}
          onRowSelectionModelChange={(model) => {
            if (model.type === "exclude") {
              onRowSelectionModelChange({
                type: "include",
                ids: new Set(rows.map((row) => row.id)),
              });

              return;
            }

            onRowSelectionModelChange(model);
          }}
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

            "& .MuiDataGrid-row.Mui-selected": {
              backgroundColor: "rgba(37, 99, 235, 0.04)",
            },

            "& .MuiDataGrid-row.Mui-selected:hover": {
              backgroundColor: "#F8FAFC",
            },

            "& .MuiDataGrid-cell": {
              px: 2,
              display: "flex",
              alignItems: "center",
              borderBottom: "1px solid #F1F5F9",
              fontSize: 14,
              color: "#0F172A",
              outline: "none",
              boxSizing: "border-box",
            },

            "& .MuiDataGrid-cellCheckbox": {
              width: 80,
              minWidth: 80,
              maxWidth: 80,
              // justifyContent: "center",
            },

            "& .MuiDataGrid-columnHeaderCheckbox": {
              width: 80,
              minWidth: 80,
              maxWidth: 80,
              // justifyContent: "center",
            },

            "& .MuiDataGrid-row:hover": {
              backgroundColor: "#F8FAFC",
            },

            "& .MuiCheckbox-root": {
              color: "#94A3B8",
            },

            "& .MuiCheckbox-root.Mui-checked": {
              color: "#2563EB",
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
        /> */}
      </Box>
    </Paper>
  );
};

export default DataGridTable;
