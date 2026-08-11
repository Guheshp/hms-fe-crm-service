import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { Button, Card, Tab, Tabs } from "@mui/material";
import { Edit } from "@mui/icons-material";

import PageHeader from "../../components/common/PageHeader";
import Details from "./Details";
import FollowUps from "../followups/FollowUps";
import Subscriptions from "./subscriptions/Subscriptions";

const LeadView = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [searchParams, setSearchParams] = useSearchParams();

  const tab = searchParams.get("tab") || "details";

  const handleTabChange = (_, value) => {
    setSearchParams({ tab: value });
  };

  return (
    <>
      <PageHeader
        title="Lead Details"
        showBackButton
        backPath="/leads"
        actions={
          <Button
            variant="contained"
            startIcon={<Edit />}
            onClick={() => navigate(`/leads/edit/${id}`)}
          >
            Edit Lead
          </Button>
        }
      />

      <Card
        elevation={0}
        sx={{
          mb: 3,
          borderRadius: 3,
          border: "1px solid",
          borderColor: "divider",
        }}
      >
        <Tabs
          value={tab}
          onChange={handleTabChange}
          variant="scrollable"
          scrollButtons="auto"
          sx={{
            px: 2,
            "& .MuiTab-root": {
              textTransform: "none",
              minHeight: 56,
              fontWeight: 600,
            },
          }}
        >
          <Tab value="details" label="Details" />

          <Tab value="followups" label="Follow Ups" />

          <Tab value="subscriptions" label="Subscriptions" />
        </Tabs>
      </Card>

      {tab === "details" && <Details id={id} />}

      {tab === "followups" && <FollowUps id={id} />}

      {tab === "subscriptions" && <Subscriptions leadId={id} />}
    </>
  );
};

export default LeadView;
