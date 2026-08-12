import { useEffect, useMemo, useState } from "react";

import { Add } from "@mui/icons-material";
import { Alert, Box, Card, Stack, Typography } from "@mui/material";

import moment from "moment";

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
    if (leadId) {
      getAllSubscriptions();
    }
  }, [leadId, params.page, params.limit]);

  const handleCreate = () => {
    navigate(`/subscriptions/${leadId}/create`);
  };

  const handleEdit = (row) => {
    navigate(`/subscriptions/${leadId}/edit/${row.id}`);
  };

  /*
   * Find the current active subscription.
   *
   * subscriptionstatus:
   * 1 = Active
   * 2 = Inactive
   */
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

  const hasActiveSubscription = subscriptions?.some(
    (item) => Number(item.subscriptionstatus) === 1,
  );

  const formattedEndDate = activeSubscription?.enddate
    ? moment(Number(activeSubscription.enddate)).format("DD/MM/YYYY")
    : null;

  return (
    <>
      <PageHeader
        title="Subscriptions"
        // subtitle={`${totalRecords} subscription${totalRecords !== 1 ? "s" : ""} found`}
        buttonText="Create Subscription"
        buttonIcon={<Add />}
        onButtonClick={handleCreate}
        buttonDisabled={hasActiveSubscription}
      />

      {hasActiveSubscription && (
        <Alert
          severity="info"
          sx={{
            mb: 3,
            borderRadius: 3,
            border: "1px solid #BFDBFE",
            backgroundColor: "#EFF6FF",

            "& .MuiAlert-icon": {
              alignItems: "center",
            },
          }}
        >
          <Stack spacing={0.5}>
            <Typography fontSize={14} fontWeight={600}>
              Active subscription found
            </Typography>

            <Typography fontSize={13}>
              This subscription is valid until
              <strong> {formattedEndDate}</strong>.
            </Typography>
          </Stack>
        </Alert>
      )}

      {!hasActiveSubscription &&
        subscriptions.some(
          (subscription) => Number(subscription.subscriptionstatus) === 1,
        ) && (
          <Alert
            severity="success"
            sx={{
              mb: 3,
              borderRadius: 3,
              border: "1px solid #BBF7D0",
              backgroundColor: "#F0FDF4",
            }}
          >
            The previous subscription has expired. You can create a new
            subscription.
          </Alert>
        )}

      <Card
        elevation={0}
        sx={{
          overflow: "hidden",
          borderRadius: 4,
          border: "1px solid #E2E8F0",
          backgroundColor: "#FCFCFD",
        }}
      >
        <DataGridTable
          rows={subscriptions}
          columns={subscriptionColumns(handleEdit)}
          loading={loading}
          page={params.page - 1}
          pageSize={params.limit}
          rowCount={totalRecords}
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
