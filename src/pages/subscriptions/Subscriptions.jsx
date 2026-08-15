import { useEffect, useMemo, useState } from "react";
import { Add } from "@mui/icons-material";
import { Alert, Card, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import moment from "moment";

import { Columns } from "./Columns";
import PageHeader from "../../components/common/PageHeader";
import DataGridTable from "../../components/common/DataGridTable";
import { getSubscriptions } from "../../api/subscriptions";
import { errorAlert } from "../../utils/alerts";
import useImport from "../../hooks/useImport";
import useExport from "../../hooks/useExport";
import useDebounce from "../../hooks/useDebounce";

const Subscriptions = ({ leadId }) => {
  const { handleImport, loading: importLoading } = useImport([]);

  const { handleExport, loading: exportLoading } = useExport([]);
  const [selectedRows, setSelectedRows] = useState({
    type: "include",
    ids: new Set(),
  });
  const [subscriptions, setSubscriptions] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const [params, setParams] = useState({
    page: 1,
    limit: 10,
    search: "",
  });
  const debouncedSearch = useDebounce(params.search);

  const [totalRecords, setTotalRecords] = useState(0);

  const getAllSubscriptions = async () => {
    try {
      setLoading(true);

      const response = await getSubscriptions({
        page: params.page,
        limit: params.limit,
        search: debouncedSearch,
      });

      const data = response.data.data || [];

      setSubscriptions(data);
      setTotalRecords(response.data.pagination?.totalRecords || 0);
    } catch (error) {
      errorAlert(
        error.response?.data?.message || "Failed to fetch subscriptions.",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllSubscriptions();
  }, [params.page, params.limit, debouncedSearch]);

  const handleCreate = () => {
    navigate(`/subscriptions/${leadId}/create`);
  };

  const handleEdit = (row) => {
    navigate(`/subscriptions/${leadId}/edit/${row.id}`);
  };

  const handleSearch = (search) => {
    setParams((prev) => ({
      ...prev,
      page: 1,
      search,
    }));
  };

  const activeSubscription = useMemo(() => {
    const today = moment();

    return subscriptions.find((subscription) => {
      const isActive = Number(subscription.subscriptionstatus) === 1;

      if (!isActive) {
        return false;
      }

      if (!subscription.enddate) {
        return true;
      }

      const endDate = moment(Number(subscription.enddate));

      return endDate.isSameOrAfter(today, "day");
    });
  }, [subscriptions]);

  const hasActiveSubscription = subscriptions.some(
    (item) => Number(item.subscriptionstatus) === 1,
  );

  const formattedEndDate = activeSubscription?.enddate
    ? moment(Number(activeSubscription.enddate)).format("DD/MM/YYYY")
    : null;

  const handleSelectionChange = (model) => {
    console.log(model);
    setSelectedRows(model);
  };
  const handleBulkDelete = async () => {
    const selectedIds = Array.from(selectedRows.ids);

    if (!selectedIds.length) return;

    const result = await confirmDelete(
      "Delete Subscriptions?",
      `Are you sure you want to delete ${selectedIds.length} selected Subscriptions?`,
    );

    if (!result.isConfirmed) return;

    try {
      setLoading(true);

      // for (const id of selectedIds) {
      //   await deleteEnquiry(id);
      // }

      successAlert("Selected Subscriptions deleted successfully.");

      setSelectedRows({
        type: "include",
        ids: new Set(),
      });

      await getAllSubscriptions();
    } catch (error) {
      errorAlert(
        error.response?.data?.message || "Failed to delete Subscriptions.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <PageHeader
        title="Subscriptions"
        buttonText="Create Subscription"
        buttonIcon={<Add />}
        onButtonClick={handleCreate}
      />
      <Card
        elevation={0}
        sx={{
          overflow: "hidden",
          borderRadius: 4,
          border: "1px solid #E2E8F0",
        }}
      >
        <DataGridTable
          rows={subscriptions}
          columns={Columns(handleEdit)}
          loading={loading}
          page={params.page - 1}
          pageSize={params.limit}
          rowCount={totalRecords}
          onSearch={handleSearch}
          search={params.search}
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

export default Subscriptions;
