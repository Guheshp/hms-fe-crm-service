import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";

import { Card, Tab, Tabs } from "@mui/material";

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
  const { id } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();

  const [lead, setLead] = useState(null);
  const [subscriptions, setSubscriptions] = useState([]);
  const [loadingSubscriptions, setLoadingSubscriptions] = useState(false);

  const tab = searchParams.get("tab") || "details";

  // --------------------------------
  // Get Lead
  // --------------------------------
  useEffect(() => {
    if (!id) return;

    const getLead = async () => {
      try {
        const response = await getLeadById(id);

        setLead(response?.data?.data || null);
      } catch (error) {
        errorAlert(error?.response?.data?.message || "Failed to fetch lead.");
      }
    };

    getLead();
  }, [id]);

  // --------------------------------
  // Get Subscriptions
  // --------------------------------
  useEffect(() => {
    if (!id) return;

    const getLeadSubscriptions = async () => {
      try {
        setLoadingSubscriptions(true);

        const response = await getSubscriptions({
          leadid: id,
          page: 1,
          limit: 100,
        });

        const data = response?.data?.data;

        setSubscriptions(Array.isArray(data) ? data : []);
      } catch (error) {
        setSubscriptions([]);

        errorAlert(
          error?.response?.data?.message || "Failed to fetch subscriptions.",
        );
      } finally {
        setLoadingSubscriptions(false);
      }
    };

    getLeadSubscriptions();
  }, [id]);

  // --------------------------------
  // Active Subscription
  // --------------------------------
  const hasActiveSubscription = subscriptions.some(
    (subscription) => Number(subscription?.subscriptionstatus) === 1,
  );

  // --------------------------------
  // Tab Change
  // --------------------------------
  const handleTabChange = (_, value) => {
    if (
      value === "payments" &&
      (loadingSubscriptions || !hasActiveSubscription)
    ) {
      return;
    }

    setSearchParams({ tab: value });
  };

  // --------------------------------
  // Protect Payments Tab
  // --------------------------------
  useEffect(() => {
    if (tab === "payments" && !loadingSubscriptions && !hasActiveSubscription) {
      setSearchParams({ tab: "details" }, { replace: true });
    }
  }, [tab, loadingSubscriptions, hasActiveSubscription, setSearchParams]);

  // --------------------------------
  // Lead Name
  // --------------------------------
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
      />

      {/* Tabs */}
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
              px: 3,
              mr: 1,
              borderRadius: 2,
              textTransform: "none",
              fontSize: 14,
              fontWeight: 500,
              color: COLORS.textSecondary,
            },

            "& .MuiTab-root.Mui-selected": {
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

      {/* Tab Content */}
      {tab === "details" && <Details id={id} />}

      {tab === "followups" && <FollowUps id={id} />}

      {tab === "subscriptions" && <Subscriptions leadId={id} />}

      {tab === "payments" && !loadingSubscriptions && hasActiveSubscription && (
        <Payments leadId={id} />
      )}
    </>
  );
};

export default LeadView;
