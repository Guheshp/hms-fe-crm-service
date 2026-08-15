import { useEffect, useState } from "react";
import { Add } from "@mui/icons-material";
import { Card } from "@mui/material";

import PageHeader from "../../components/common/PageHeader";
import DataGridTable from "../../components/common/DataGridTable";

import { Columns } from "./Columns";

import { getPayments, deletePayment } from "../../api/payments";

import useImport from "../../hooks/useImport";
import useExport from "../../hooks/useExport";
import useDebounce from "../../hooks/useDebounce";

import { errorAlert, successAlert } from "../../utils/alerts";

import { confirmDelete } from "../../utils/confirm";

const Payments = ({ leadId }) => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(false);

  const [selectedRows, setSelectedRows] = useState({
    type: "include",
    ids: new Set(),
  });

  const [params, setParams] = useState({
    page: 1,
    limit: 10,
    search: "",
  });

  const debouncedSearch = useDebounce(params.search);

  const [totalRecords, setTotalRecords] = useState(0);

  const { handleImport, importLoading } = useImport(
    // importPayments
    async () => {
      return {
        data: {
          message: "Import functionality will be implemented soon.",
        },
      };
    },
  );

  const { handleExport, exportLoading } = useExport(
    // exportPayments
    async () => {
      return {
        data: {
          message: "Export functionality will be implemented soon.",
        },
      };
    },
  );

  const getAllPayments = async () => {
    try {
      setLoading(true);

      const response = await getPayments({
        page: params.page,
        limit: params.limit,
        search: debouncedSearch,
      });

      setPayments(response.data.data || []);

      setTotalRecords(response.data.pagination?.totalRecords || 0);
    } catch (error) {
      errorAlert(error.response?.data?.message || "Failed to fetch payments.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllPayments();
  }, [params.page, params.limit, debouncedSearch]);

  const handleCreate = () => {
    console.log("Create payment");
  };

  const handleEdit = (row) => {
    console.log("Edit payment", row);
  };

  const handleSearch = (search) => {
    setParams((prev) => ({
      ...prev,
      page: 1,
      search,
    }));
  };

  const handleSelectionChange = (model) => {
    setSelectedRows(model);
  };

  const handleBulkDelete = async () => {
    const selectedIds = Array.from(selectedRows.ids);

    if (!selectedIds.length) return;

    const result = await confirmDelete(
      "Delete Payments?",
      `Are you sure you want to delete ${selectedIds.length} selected payments?`,
    );

    if (!result.isConfirmed) return;

    try {
      setLoading(true);

      // for (const id of selectedIds) {
      //   await deletePayment(id);
      // }

      successAlert("Selected payments deleted successfully.");

      setSelectedRows({
        type: "include",
        ids: new Set(),
      });

      await getAllPayments();
    } catch (error) {
      errorAlert(error.response?.data?.message || "Failed to delete payments.");
    } finally {
      setLoading(false);
    }
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
          overflow: "hidden",
          borderRadius: 4,
          border: "1px solid",
          borderColor: "divider",
        }}
      >
        <DataGridTable
          rows={payments}
          columns={Columns(handleEdit)}
          loading={loading || importLoading || exportLoading}
          page={params.page - 1}
          pageSize={params.limit}
          rowCount={totalRecords}
          search={params.search}
          onSearch={handleSearch}
          onImport={handleImport}
          onExport={handleExport}
          onDelete={handleBulkDelete}
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
