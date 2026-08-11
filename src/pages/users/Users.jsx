import { Add } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { deleteUser, get } from "../../api/users";
import { errorAlert, successAlert } from "../../utils/alerts";

import CustomTable from "../../components/common/CustomTable";
import PageHeader from "../../components/common/PageHeader";
import { columns } from "./columns";
import { confirmDelete } from "../../utils/confirm";
import TableToolbar from "../../components/common/TableToolbar";
import useDebounce from "../../hooks/useDebounce";

const Users = () => {
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const [params, setParams] = useState({
    page: 1,
    limit: 10,
    search: "",
  });

  const debouncedSearch = useDebounce(params.search);
  const [totalRecords, setTotalRecords] = useState(0);

  const getUsers = async () => {
    try {
      setLoading(true);

      const response = await get({
        ...params,
        search: debouncedSearch,
      });

      setUsers(response.data.data);
      setTotalRecords(response.data.pagination.totalRecords);
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

  const handleDelete = async (row) => {
    const result = await confirmDelete(
      "Delete User?",
      `Are you sure you want to delete ${row.firstname} ${row.lastname}?`,
    );

    if (!result.isConfirmed) return;

    try {
      setLoading(true);

      const response = await deleteUser(row.id);

      console.log("Before Success Alert");

      successAlert(response.data.message);

      console.log("After Success Alert");

      await getUsers();
    } catch (error) {
      console.log(error);
      console.log(error.response);

      errorAlert(error.response?.data?.message || "Failed to delete user.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <PageHeader
        title="Users"
        // subtitle="Manage all users in your organization."
        buttonText="Create User"
        buttonIcon={<Add />}
        onButtonClick={() => navigate("/users/create")}
      />

      <CustomTable
        columns={columns(handleEdit, handleDelete)}
        rows={users}
        loading={loading}
        page={params.page}
        rowsPerPage={params.limit}
        totalRecords={totalRecords}
        search={params.search}
        onSearch={handleSearch}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleRowsPerPageChange}
      />
    </>
  );
};

export default Users;
