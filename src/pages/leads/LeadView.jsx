import { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";

import {
  Avatar,
  Box,
  Button,
  Card,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";

import { Edit } from "@mui/icons-material";

import PageHeader from "../../components/common/PageHeader";

import Details from "./Details";
import FollowUps from "../followups/FollowUps";
import Subscriptions from "./subscriptions/Subscriptions";
import Payments from "./payments/Payments";

import { getLeadById } from "../../api/leads";
import { getSubscriptions } from "../../api/subscriptions";

import { errorAlert } from "../../utils/alerts";

import { COLORS } from "../../constants/theme";

const LeadView = () => {
  const navigate = useNavigate();

  const { id } = useParams();

  const [searchParams, setSearchParams] = useSearchParams();

  const [lead, setLead] = useState(null);

  const [subscriptions, setSubscriptions] = useState([]);

  const [loadingSubscriptions, setLoadingSubscriptions] = useState(false);

  const tab = searchParams.get("tab") || "details";

  const getLead = async () => {
    try {
      const response = await getLeadById(id);

      setLead(response.data.data);
    } catch (error) {
      errorAlert(error.response?.data?.message || "Failed to fetch lead.");
    }
  };

  const getLeadSubscriptions = async () => {
    try {
      setLoadingSubscriptions(true);

      const response = await getSubscriptions({
        leadid: id,
        page: 1,
        limit: 100,
      });

      setSubscriptions(response.data.data || []);
    } catch (error) {
      errorAlert(
        error.response?.data?.message || "Failed to fetch subscriptions.",
      );
    } finally {
      setLoadingSubscriptions(false);
    }
  };

  useEffect(() => {
    if (!id) return;

    getLead();
    getLeadSubscriptions();
  }, [id]);

  const hasActiveSubscription = subscriptions?.some(
    (subscription) => Number(subscription.subscriptionstatus) === 1,
  );

  const handleTabChange = (_, value) => {
    if (value === "payments" && !hasActiveSubscription) {
      return;
    }

    setSearchParams({
      tab: value,
    });
  };

  useEffect(() => {
    if (tab === "payments" && !loadingSubscriptions && !hasActiveSubscription) {
      setSearchParams({
        tab: "details",
      });
    }
  }, [tab, loadingSubscriptions, hasActiveSubscription]);

  const leadName =
    [lead?.firstname, lead?.lastname].filter(Boolean).join(" ") ||
    "Lead Details";

  return (
    <>
      <PageHeader
        title={leadName}
        subtitle={`${lead?.hospitalname || "-"} • ${lead?.leadnumber || "-"}`}
        showBackButton
        backPath="/leads"
        buttonText="Edit Lead"
        buttonIcon={<Edit />}
        onButtonClick={() => navigate(`/leads/edit/${id}`)}
      />

      <Card
        elevation={0}
        sx={{
          mb: 1,
          p: 1,
          borderRadius: 3,
          border: `1px solid ${COLORS.border}`,
        }}
      >
        <Tabs
          value={tab}
          onChange={handleTabChange}
          variant="scrollable"
          scrollButtons="auto"
          sx={{
            "& .MuiTabs-indicator": {
              display: "none",
            },

            "& .MuiTab-root": {
              // minHeight: 42,
              px: 3,
              mr: 1,
              borderRadius: 2,
              textTransform: "none",
              fontSize: 14,
              fontWeight: 500,
              color: COLORS.textSecondary,
            },

            "& .Mui-selected": {
              backgroundColor: COLORS.primaryLight,
              color: COLORS.primary,
              fontWeight: 600,
            },
          }}
        >
          <Tab value="details" label="Details" />

          <Tab value="followups" label="Follow Ups" />

          <Tab
            value="subscriptions"
            label={`Subscriptions (${subscriptions.length})`}
          />

          <Tab
            value="payments"
            label="Payments"
            disabled={loadingSubscriptions || !hasActiveSubscription}
          />
        </Tabs>
      </Card>

      {tab === "details" && <Details id={id} />}

      {tab === "followups" && <FollowUps id={id} />}

      {tab === "subscriptions" && <Subscriptions leadId={id} />}

      {tab === "payments" && hasActiveSubscription && <Payments leadId={id} />}
    </>
  );
};

export default LeadView;
