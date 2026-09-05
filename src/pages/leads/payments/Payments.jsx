import { useEffect, useState } from "react";

import { Add } from "@mui/icons-material";
import { Card } from "@mui/material";

import PageHeader from "../../../components/common/PageHeader";
import DataGridTable from "../../../components/common/DataGridTable";

import { getPayments } from "../../../api/payments";

import { errorAlert } from "../../../utils/alerts";
import { Columns } from "./Columns";
import useImport from "../../../hooks/useImport";
import useExport from "../../../hooks/useExport";

const Payments = ({ leadId }) => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(false);

  const [params, setParams] = useState({
    page: 1,
    limit: 10,
  });

  const { handleImport, loading: importLoading } = useImport([]);
  const { handleExport, loading: exportLoading } = useExport([]);

  const [selectedRows, setSelectedRows] = useState({
    type: "include",
    ids: new Set(),
  });

  const [totalRecords, setTotalRecords] = useState(0);

  const getAllPayments = async () => {
    try {
      setLoading(true);

      const response = await getPayments({
        leadid: leadId,
        page: params.page,
        limit: params.limit,
      });

      const data = response.data.data || [];

      setPayments(data);

      setTotalRecords(response.data.pagination?.totalRecords || 0);
    } catch (error) {
      errorAlert(error.response?.data?.message || "Failed to fetch payments.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (leadId) {
      getAllPayments();
    }
  }, [leadId, params.page, params.limit]);

  const handleCreate = () => {
    console.log("Create payment");
  };

  const handleEdit = (row) => {
    console.log("Edit payment", row);
  };

  const handleBulkDelete = async () => {
    const selectedIds = Array.from(selectedRows.ids);

    if (!selectedIds.length) return;

    const result = await confirmDelete(
      "Delete Subscription?",
      `Are you sure you want to delete ${selectedIds.length} selected Subscription?`,
    );

    if (!result.isConfirmed) return;

    try {
      setLoading(true);

      // for (const id of selectedIds) {
      //   await deleteEnquiry(id);
      // }

      successAlert("Selected Subscription deleted successfully.");

      setSelectedRows({
        type: "include",
        ids: new Set(),
      });

      await getAllSubscriptions();
    } catch (error) {
      errorAlert(
        error.response?.data?.message || "Failed to delete Subscription.",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSelectionChange = (model) => {
    console.log(model);
    setSelectedRows(model);
  };

  return (
    <>
      <PageHeader
        title="Payments"
        subtitle="Manage payments for this lead."
        buttonText="Create Payment"
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
          rows={payments}
          columns={Columns(handleEdit)}
          loading={loading}
          page={params.page - 1}
          pageSize={params.limit}
          rowCount={totalRecords}
          hideSearch
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
    </>
  );
};

export default Payments;
