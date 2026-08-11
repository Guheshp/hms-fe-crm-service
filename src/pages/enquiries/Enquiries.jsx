import { Add } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { getEnquiries, deleteEnquiry } from "../../api/enquiries";

import { errorAlert, successAlert } from "../../utils/alerts";

import useDebounce from "../../hooks/useDebounce";
import { confirmAction, confirmDelete } from "../../utils/confirm";

import PageHeader from "../../components/common/PageHeader";
import CustomTable from "../../components/common/CustomTable";
import { columns } from "./Columns";
import Swal from "sweetalert2";
import DataGridTable from "../../components/common/DataGridTable";

const Enquiries = () => {
  const navigate = useNavigate();

  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(false);

  const [params, setParams] = useState({
    page: 1,
    limit: 10,
    search: "",
  });

  const debouncedSearch = useDebounce(params.search);

  const [totalRecords, setTotalRecords] = useState(0);

  const getAllEnquiries = async () => {
    try {
      setLoading(true);

      const response = await getEnquiries({
        ...params,
        search: debouncedSearch,
      });

      setEnquiries(response.data.data);
      setTotalRecords(response.data.pagination.totalRecords);
    } catch (error) {
      errorAlert(error.response?.data?.message || "Failed to fetch enquiries.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllEnquiries();
  }, [params.page, params.limit, debouncedSearch]);

  const handleEdit = (row) => {
    navigate(`/enquiries/${row.id}/edit`);
  };

  const handleDelete = async (row) => {
    const result = await confirmDelete(
      "Delete Enquiry?",
      `Are you sure you want to delete ${row.hospitalname}?`,
    );

    if (!result.isConfirmed) return;

    try {
      setLoading(true);

      const response = await deleteEnquiry(row.id);

      successAlert(response.data.message);

      await getAllEnquiries();
    } catch (error) {
      errorAlert(error.response?.data?.message || "Failed to delete enquiry.");
    } finally {
      setLoading(false);
    }
  };

  const handleConvert = async (row) => {
    const result = await confirmAction({
      title: "Convert to Lead?",
      text: `You will be redirected to the Lead Creation page to continue converting "${row.hospitalname}" into a lead.`,
      confirmText: "Continue",
    });

    if (!result.isConfirmed) return;

    navigate(`/leads/create?enquiryid=${row.id}`);
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

  return (
    <>
      <PageHeader
        title={`Enquiries (${totalRecords})`}
        buttonText="Create Enquiry"
        buttonIcon={<Add />}
        onButtonClick={() => navigate("/enquiries/create")}
      />

      <DataGridTable
        rows={enquiries}
        columns={columns(handleEdit, handleDelete, handleConvert)}
        loading={loading}
        page={params.page - 1}
        pageSize={params.limit}
        rowCount={totalRecords}
        search={params.search}
        onSearch={handleSearch}
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

export default Enquiries;
