import { useEffect, useState } from "react";
import { Add } from "@mui/icons-material";
import { Card, Drawer } from "@mui/material";

import FollowUpForm from "./FollowUpForm";

import { columns } from "./Columns";

import PageHeader from "../../../../components/common/PageHeader";
import {
  getCustomerFollowUps,
  deleteCustomerFollowUp,
} from "../../../../api/customerFollowUps";
import useImport from "../../../../hooks/useImport";
import useExport from "../../../../hooks/useExport";
import DataGridTable from "../../../../components/common/DataGridTable";
import { successAlert, errorAlert } from "../../../../utils/alerts";
import { confirmDelete } from "../../../../utils/confirm";

const FollowUps = ({ id }) => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [loading, setLoading] = useState(false);

  const [selectedRows, setSelectedRows] = useState({
    type: "include",
    ids: new Set(),
  });

  const { handleImport, loading: importLoading } = useImport([]);
  const { handleExport, loading: exportLoading } = useExport([]);

  const [followUps, setFollowUps] = useState([]);
  const [search, setSearch] = useState("");

  const [params, setParams] = useState({
    page: 1,
    limit: 10,
  });

  const [totalRecords, setTotalRecords] = useState(0);

  const [selectedFollowUp, setSelectedFollowUp] = useState(null);

  // --------------------------------
  // Create
  // --------------------------------
  const handleCreate = () => {
    setSelectedFollowUp(null);
    setOpenDrawer(true);
  };

  // --------------------------------
  // Edit
  // --------------------------------
  const handleEdit = (row) => {
    setSelectedFollowUp(row);
    setOpenDrawer(true);
  };

  // --------------------------------
  // Get All Follow Ups
  // --------------------------------
  const getAllFollowUps = async () => {
    try {
      setLoading(true);

      const response = await getCustomerFollowUps({
        leadid: id,
        page: params.page,
        limit: params.limit,
      });

      setFollowUps(response?.data?.data || []);

      setTotalRecords(response?.data?.pagination?.totalRecords || 0);
    } catch (error) {
      errorAlert(
        error.response?.data?.message || "Failed to fetch follow ups.",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      getAllFollowUps();
    }
  }, [id, params.page, params.limit]);

  // --------------------------------
  // Delete
  // --------------------------------
  const handleDelete = async (row) => {
    const result = await confirmDelete(
      "Delete Follow Up?",
      "Are you sure you want to delete this follow up?",
    );

    if (!result.isConfirmed) return;

    try {
      setLoading(true);

      const response = await deleteCustomerFollowUp({
        id: row.id,
      });

      successAlert(response.data.message);

      await getAllFollowUps();
    } catch (error) {
      errorAlert(
        error.response?.data?.message || "Failed to delete follow up.",
      );
    } finally {
      setLoading(false);
    }
  };

  // --------------------------------
  // Search
  // --------------------------------
  const filteredFollowUps = followUps.filter((item) =>
    JSON.stringify(item).toLowerCase().includes(search.toLowerCase()),
  );

  // --------------------------------
  // Selection
  // --------------------------------
  const handleSelectionChange = (model) => {
    setSelectedRows(model);
  };

  // --------------------------------
  // Bulk Delete
  // --------------------------------
  const handleBulkDelete = async () => {
    const selectedIds = Array.from(selectedRows.ids);

    if (!selectedIds.length) return;

    const result = await confirmDelete(
      "Delete Follow Ups?",
      `Are you sure you want to delete ${selectedIds.length} selected Follow Ups?`,
    );

    if (!result.isConfirmed) return;

    try {
      setLoading(true);

      // Add bulk delete API later.

      successAlert("Selected Follow Ups deleted successfully.");

      setSelectedRows({
        type: "include",
        ids: new Set(),
      });

      await getAllFollowUps();
    } catch (error) {
      errorAlert(
        error.response?.data?.message || "Failed to delete Follow Ups.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <PageHeader
        title="Follow Ups"
        buttonText="Create Follow Up"
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
          rows={filteredFollowUps}
          columns={columns(handleEdit, handleDelete)}
          loading={loading}
          page={params.page - 1}
          pageSize={params.limit}
          rowCount={filteredFollowUps.length}
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

      {/* Follow Up Drawer */}
      <Drawer
        anchor="right"
        open={openDrawer}
        onClose={() => {
          setOpenDrawer(false);
          setSelectedFollowUp(null);
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
        <FollowUpForm
          leadId={id}
          followUp={selectedFollowUp}
          isEdit={Boolean(selectedFollowUp)}
          getAllFollowUps={getAllFollowUps}
          onClose={() => {
            setOpenDrawer(false);
            setSelectedFollowUp(null);
          }}
        />
      </Drawer>
    </>
  );
};

export default FollowUps;
