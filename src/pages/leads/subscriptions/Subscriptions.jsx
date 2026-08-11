import { useEffect, useState } from "react";

import { Add } from "@mui/icons-material";

import { Card } from "@mui/material";

import PageHeader from "../../../components/common/PageHeader";
import DataGridTable from "../../../components/common/DataGridTable";

import { getSubscriptions } from "../../../api/subscriptions";

import { errorAlert } from "../../../utils/alerts";

import { subscriptionColumns } from "./subscriptionColumns";
import { useNavigate } from "react-router-dom";

const Subscriptions = ({ leadId }) => {
  const [subscriptions, setSubscriptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [params, setParams] = useState({
    page: 1,
    limit: 10,
  });

  const [totalRecords, setTotalRecords] = useState(0);

  const getAllSubscriptions = async () => {
    try {
      setLoading(true);

      const response = await getSubscriptions({
        leadid: leadId,
        page: params.page,
        limit: params.limit,
      });

      setSubscriptions(response.data.data || []);

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
    if (leadId) {
      getAllSubscriptions();
    }
  }, [leadId, params.page, params.limit]);

  const handleCreate = () => {
    navigate(`/subscriptions/${leadId}/create`);
  };

  const handleEdit = (row) => {
    console.log("Edit subscription", row);
  };

  return (
    <>
      <PageHeader
        title="Subscriptions"
        subtitle="Manage subscriptions for this lead."
        buttonText="Create Subscription"
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
          rows={subscriptions}
          columns={subscriptionColumns(handleEdit)}
          loading={loading}
          page={params.page - 1}
          pageSize={params.limit}
          rowCount={totalRecords}
          hideSearch
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
