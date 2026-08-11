import { Box, Paper } from "@mui/material";
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
}) => {
  return (
    <Paper
      elevation={0}
      sx={{
        borderRadius: 3,
        border: "1px solid",
        borderColor: "divider",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        height: "calc(100vh - 170px)", // Adjust if needed
      }}
    >
      {onSearch && (
        <TableToolbar
          search={search}
          onSearch={onSearch}
          placeholder="Search..."
        />
      )}

      <Box
        sx={{
          flex: 1,
          minHeight: 0,
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
              onPageChange(model.page);
            }

            if (model.pageSize !== pageSize) {
              onPageSizeChange(model.pageSize);
            }
          }}
          pageSizeOptions={[10, 25, 50, 100]}
          disableRowSelectionOnClick
          getRowId={(row) => row.id}
          rowHeight={72}
          columnHeaderHeight={56}
          sx={{
            border: 0,

            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: "#F3F4F6", // Slightly darker grey
              borderBottom: "1px solid #E5E7EB",
            },

            "& .MuiDataGrid-columnHeader": {
              backgroundColor: "#F3F4F6",
              px: 2,
            },

            "& .MuiDataGrid-columnHeaderTitle": {
              fontWeight: 700,
              fontSize: 14,
              color: "#374151",
            },

            "& .MuiDataGrid-cell": {
              px: 2,
              display: "flex",
              alignItems: "center",
              borderBottom: "1px solid #F3F4F6",
            },

            "& .MuiDataGrid-row:hover": {
              backgroundColor: "#F9FAFB",
            },
          }}
        />
      </Box>
    </Paper>
  );
};

export default DataGridTable;
