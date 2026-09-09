import { Add } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { getCustomer, deleteLead, updateLeadStatus } from "../../api/leads";

import { errorAlert, successAlert } from "../../utils/alerts";
import { confirmDelete } from "../../utils/confirm";

import useDebounce from "../../hooks/useDebounce";

import PageHeader from "../../components/common/PageHeader";
import CustomTable from "../../components/common/CustomTable";

import { columns } from "./Columns";
import DataGridTable from "../../components/common/DataGridTable";
import { getLeadStatuses } from "../../api/leadstatus";
import useImport from "../../hooks/useImport";
import useExport from "../../hooks/useExport";

const Customer = () => {
  const navigate = useNavigate();

  const { handleImport, loading: importLoading } = useImport([]);

  const { handleExport, loading: exportLoading } = useExport([]);
  const [selectedRows, setSelectedRows] = useState({
    type: "include",
    ids: new Set(),
  });
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(false);

  const [params, setParams] = useState({
    page: 1,
    limit: 10,
    search: "",
  });

  const debouncedSearch = useDebounce(params.search);

  const [totalRecords, setTotalRecords] = useState(0);
  const [leadStatuses, setLeadStatuses] = useState([]);

  const getAllCustomer = async () => {
    try {
      setLoading(true);

      const response = await getCustomer({
        ...params,
        search: debouncedSearch,
      });

      setLeads(response.data.data);
      setTotalRecords(response.data.pagination.totalRecords);
    } catch (error) {
      errorAlert(error.response?.data?.message || "Failed to fetch leads.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllCustomer();
  }, [params.page, params.limit, debouncedSearch]);

  const getAllLeadStatuses = async () => {
    try {
      const response = await getLeadStatuses({
        page: 1,
        limit: 100,
      });

      setLeadStatuses(response.data.data);
    } catch (error) {
      console.error(error);
      errorAlert(
        error.response?.data?.message || "Failed to fetch lead statuses.",
      );
    }
  };

  useEffect(() => {
    getAllLeadStatuses();
  }, []);

  const handleEdit = (row) => {
    navigate(`/customers/edit/${row.id}`);
  };

  const handleDelete = async (row) => {
    const result = await confirmDelete(
      "Delete Lead?",
      `Are you sure you want to delete ${row.hospitalname}?`,
    );

    if (!result.isConfirmed) return;

    try {
      setLoading(true);

      const response = await deleteLead(row.id);

      successAlert(response.data.message);

      await getAllCustomer();
    } catch (error) {
      errorAlert(error.response?.data?.message || "Failed to delete lead.");
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (row, status) => {
    try {
      await updateLeadStatus({
        id: row.id,
        leadstatusid: status.id,
      });

      successAlert("Lead status updated successfully.");

      getAllLeads();
    } catch (error) {
      errorAlert(
        error.response?.data?.message || "Failed to update lead status.",
      );
    }
  };
  const handlePageChange = (page) => {
    setParams((prev) => ({
      ...prev,
      page,
    }));
  };

  const handleRowsPerPageChange = (event) => {
    setParams((prev) => ({
      ...prev,
      page: 1,
      limit: Number(event.target.value),
    }));
  };

  const handleSearch = (search) => {
    setParams((prev) => ({
      ...prev,
      page: 1,
      search,
    }));
  };

  const handleSelectionChange = (model) => {
    console.log(model);
    setSelectedRows(model);
  };

  const handleBulkDelete = async () => {
    const selectedIds = Array.from(selectedRows.ids);

    if (!selectedIds.length) return;

    const result = await confirmDelete(
      "Delete Leads?",
      `Are you sure you want to delete ${selectedIds.length} selected Leads?`,
    );

    if (!result.isConfirmed) return;

    try {
      setLoading(true);

      // for (const id of selectedIds) {
      //   await deleteEnquiry(id);
      // }

      successAlert("Selected Leads deleted successfully.");

      setSelectedRows({
        type: "include",
        ids: new Set(),
      });

      await getAllLeads();
    } catch (error) {
      errorAlert(error.response?.data?.message || "Failed to delete Leads.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <PageHeader
        title={`All Customers (${totalRecords})`}
        // buttonText="Create Lead"
        buttonIcon={<Add />}
        onButtonClick={() => navigate("/leads/create")}
      />

      <DataGridTable
        rows={leads}
        columns={columns(
          handleEdit,
          handleDelete,
          leadStatuses,
          handleStatusChange,
        )}
        loading={loading}
        page={params.page - 1}
        pageSize={params.limit}
        rowCount={totalRecords}
        search={params.search}
        onSearch={handleSearch}
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
    </>
  );
};

export default Customer;
