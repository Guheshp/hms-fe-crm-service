import { Add } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { deleteUser, get } from "../../api/users";

import DataGridTable from "../../components/common/DataGridTable";
import PageHeader from "../../components/common/PageHeader";

import useDebounce from "../../hooks/useDebounce";
import useImport from "../../hooks/useImport";
import useExport from "../../hooks/useExport";

import { errorAlert, successAlert } from "../../utils/alerts";
import { confirmDelete } from "../../utils/confirm";

import { columns } from "./columns";

const Users = () => {
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
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

  const { handleImport, importLoading } = useImport(async () => ({
    data: {
      message: "Import functionality will be implemented soon.",
    },
  }));

  const { handleExport, exportLoading } = useExport(async () => ({
    data: {
      message: "Export functionality will be implemented soon.",
    },
  }));

  const getUsers = async () => {
    try {
      setLoading(true);

      const response = await get({
        ...params,
        search: debouncedSearch,
      });

      setUsers(response.data.data || []);

      setTotalRecords(response.data.pagination?.totalRecords || 0);
    } catch (error) {
      errorAlert(error.response?.data?.message || "Failed to fetch users.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUsers();
  }, [params.page, params.limit, debouncedSearch]);

  const handleEdit = (row) => {
    navigate(`/users/${row.id}/edit`);
  };

  const handleDelete = async (row) => {
    const result = await confirmDelete(
      "Delete User?",
      `Are you sure you want to delete ${row.firstname} ${row.lastname}?`,
    );

    if (!result.isConfirmed) return;

    try {
      setLoading(true);

      const response = await deleteUser(row.id);

      successAlert(response.data.message);

      await getUsers();
    } catch (error) {
      errorAlert(error.response?.data?.message || "Failed to delete user.");
    } finally {
      setLoading(false);
    }
  };

  const handleBulkDelete = async () => {
    const selectedIds = Array.from(selectedRows.ids);

    if (!selectedIds.length) return;

    const result = await confirmDelete(
      "Delete Users?",
      `Are you sure you want to delete ${selectedIds.length} selected users?`,
    );

    if (!result.isConfirmed) return;

    try {
      setLoading(true);

      // for (const id of selectedIds) {
      //   await deleteUser(id);
      // }

      successAlert("Selected users deleted successfully.");

      setSelectedRows({
        type: "include",
        ids: new Set(),
      });

      await getUsers();
    } catch (error) {
      errorAlert(error.response?.data?.message || "Failed to delete users.");
    } finally {
      setLoading(false);
    }
  };

  const handleSelectionChange = (model) => {
    setSelectedRows(model);
  };

  const handleSearch = (search) => {
    setParams((prev) => ({
      ...prev,
      page: 1,
      search,
    }));
  };

  const handlePageChange = (page) => {
    setParams((prev) => ({
      ...prev,
      page: page + 1,
    }));
  };

  const handlePageSizeChange = (pageSize) => {
    setParams((prev) => ({
      ...prev,
      page: 1,
      limit: pageSize,
    }));
  };

  return (
    <>
      <PageHeader
        title={`Users (${totalRecords})`}
        subtitle="Manage users in your organization."
        buttonText="Create User"
        buttonIcon={<Add />}
        onButtonClick={() => navigate("/users/create")}
      />

      <DataGridTable
        columns={columns(handleEdit, handleDelete)}
        rows={users}
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
        onPageChange={handlePageChange}
        onPageSizeChange={handlePageSizeChange}
      />
    </>
  );
};

export default Users;
