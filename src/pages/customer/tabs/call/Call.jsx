import { Add } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { columns } from "./Columns";

import { getCalls, deleteCall } from "../../../../api/call";
import { errorAlert, successAlert } from "../../../../utils/alerts";
import { confirmDelete } from "../../../../utils/confirm";
import useDebounce from "../../../../hooks/useDebounce";
import PageHeader from "../../../../components/common/PageHeader";
import DataGridTable from "../../../../components/common/DataGridTable";
import useImport from "../../../../hooks/useImport";
import useExport from "../../../../hooks/useExport";
import { Drawer, Card } from "@mui/material";
import CallForm from "./CallForm";
const Call = ({ id }) => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [loading, setLoading] = useState(false);

  const [selectedRows, setSelectedRows] = useState({
    type: "include",
    ids: new Set(),
  });

  const { handleImport, loading: importLoading } = useImport([]);
  const { handleExport, loading: exportLoading } = useExport([]);

  const [calls, setCalls] = useState([]);
  const [search, setSearch] = useState("");

  const [params, setParams] = useState({
    page: 1,
    limit: 10,
  });

  const [totalRecords, setTotalRecords] = useState(0);

  const [selectedCall, setSelectedCall] = useState(null);

  // --------------------------------
  // Create
  // --------------------------------
  const handleCreate = () => {
    setSelectedCall(null);
    setOpenDrawer(true);
  };

  // --------------------------------
  // Edit
  // --------------------------------
  const handleEdit = (row) => {
    setSelectedCall(row);
    setOpenDrawer(true);
  };

  // --------------------------------
  // Get All Calls
  // --------------------------------
  const getAllCalls = async () => {
    try {
      setLoading(true);

      const response = await getCalls({
        leadid: id,
        page: params.page,
        limit: params.limit,
      });

      setCalls(response?.data?.data || []);

      setTotalRecords(response?.data?.pagination?.totalRecords || 0);
    } catch (error) {
      errorAlert(error.response?.data?.message || "Failed to fetch calls.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      getAllCalls();
    }
  }, [id, params.page, params.limit]);

  // --------------------------------
  // Delete
  // --------------------------------
  const handleDelete = async (row) => {
    const result = await confirmDelete(
      "Delete Call?",
      "Are you sure you want to delete this call?",
    );

    if (!result.isConfirmed) return;

    try {
      setLoading(true);

      const response = await deleteCall({
        id: row.id,
      });

      successAlert(response.data.message);

      await getAllCalls();
    } catch (error) {
      errorAlert(error.response?.data?.message || "Failed to delete call.");
    } finally {
      setLoading(false);
    }
  };

  // --------------------------------
  // Search
  // --------------------------------
  const filteredCalls = calls.filter((item) =>
    JSON.stringify(item).toLowerCase().includes(search.toLowerCase()),
  );

  // --------------------------------
  // Selection
  // --------------------------------
  const handleSelectionChange = (model) => {
    console.log(model);
    setSelectedRows(model);
  };

  // --------------------------------
  // Bulk Delete
  // --------------------------------
  const handleBulkDelete = async () => {
    const selectedIds = Array.from(selectedRows.ids);

    if (!selectedIds.length) return;

    const result = await confirmDelete(
      "Delete Calls?",
      `Are you sure you want to delete ${selectedIds.length} selected Calls?`,
    );

    if (!result.isConfirmed) return;

    try {
      setLoading(true);

      // Bulk delete API can be added here later.

      successAlert("Selected Calls deleted successfully.");

      setSelectedRows({
        type: "include",
        ids: new Set(),
      });

      await getAllCalls();
    } catch (error) {
      errorAlert(error.response?.data?.message || "Failed to delete Calls.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <PageHeader
        title="Calls"
        buttonText="Create Call"
        buttonIcon={<Add />}
        onButtonClick={handleCreate}
      />

      <Card
        elevation={0}
        sx={{
          borderRadius: 3,
          border: "1px solid",
          borderColor: "divider",
        }}
      >
        <DataGridTable
          rows={filteredCalls}
          columns={columns(handleEdit, handleDelete)}
          loading={loading}
          page={params.page - 1}
          pageSize={params.limit}
          rowCount={filteredCalls.length}
          search={search}
          onSearch={setSearch}
          onDelete={handleBulkDelete}
          onImport={handleImport}
          onExport={handleExport}
          checkboxSelection
          rowSelectionModel={selectedRows}
          onRowSelectionModelChange={handleSelectionChange}
          onPageChange={(page) =>
            setParams((prev) => ({
              ...prev,
              page: page + 1,
            }))
          }
          onPageSizeChange={(pageSize) =>
            setParams((prev) => ({
              ...prev,
              page: 1,
              limit: pageSize,
            }))
          }
        />
      </Card>

      {/* Call Drawer */}
      <Drawer
        anchor="right"
        open={openDrawer}
        onClose={() => {
          setOpenDrawer(false);
          setSelectedCall(null);
        }}
        slotProps={{
          paper: {
            sx: {
              width: "30vw",
              maxWidth: 1200,
            },
          },
        }}
      >
        <CallForm
          leadId={id}
          call={selectedCall}
          isEdit={Boolean(selectedCall)}
          getAllCalls={getAllCalls}
          onClose={() => {
            setOpenDrawer(false);
            setSelectedCall(null);
          }}
        />
      </Drawer>
    </>
  );
};

export default Call;
