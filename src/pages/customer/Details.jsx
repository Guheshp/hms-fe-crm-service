import { useEffect, useMemo, useState } from "react";
import {
  Card,
  CardContent,
  Grid,
  Typography,
  CircularProgress,
  Box,
  Button,
} from "@mui/material";

import ReadOnlyField from "../../components/common/ReadOnlyField";

import { getLeadById } from "../../api/leads";
import { PRIORITY_OPTIONS, SOURCE_OPTIONS } from "../../constants/api";
import { errorAlert } from "../../utils/alerts";
import { BUTTON_STYLES, COLORS } from "../../constants/theme";
import { useNavigate } from "react-router-dom";

const Details = ({ id }) => {
  const [lead, setLead] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const getLead = async () => {
    try {
      setLoading(true);

      const response = await getLeadById(id);

      setLead(response.data.data);
    } catch (error) {
      errorAlert(error.response?.data?.message || "Failed to fetch lead.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      getLead();
    }
  }, [id]);

  const priority = useMemo(
    () => PRIORITY_OPTIONS.find((item) => item.id === Number(lead?.priority)),
    [lead],
  );

  const source = useMemo(
    () => SOURCE_OPTIONS.find((item) => item.id === Number(lead?.source)),
    [lead],
  );

  if (loading) {
    return (
      <Box py={10} display="flex" justifyContent="center">
        <CircularProgress />
      </Box>
    );
  }

  if (!lead) return null;

  return (
    <Card
      elevation={0}
      sx={{
        borderRadius: 3,
        border: "1px solid",
        borderColor: "divider",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          m: 2,
        }}
      >
        <Button
          onClick={() => navigate(`/customers/edit/${id}`)}
          // sx={BUTTON_STYLES}
          variant="contained"
        >
          Edit Lead
        </Button>
      </Box>
      <CardContent sx={{ p: 4 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <ReadOnlyField label="Customer Number" value={lead.leadnumber} />
          </Grid>
          <Grid item xs={12} md={4}>
            <ReadOnlyField label="Hospital Name" value={lead.hospitalname} />
          </Grid>

          <Grid item xs={12} md={4}>
            <ReadOnlyField label="First Name" value={lead.firstname} />
          </Grid>

          <Grid item xs={12} md={4}>
            <ReadOnlyField label="Last Name" value={lead.lastname} />
          </Grid>

          <Grid item xs={12} md={4}>
            <ReadOnlyField label="Email Address" value={lead.email} />
          </Grid>

          <Grid item xs={12} md={4}>
            <ReadOnlyField label="Phone Number" value={lead.phone} />
          </Grid>

          <Grid item xs={12} md={4}>
            <ReadOnlyField label="Assigned To" value={lead.assignedto} />
          </Grid>

          <Grid item xs={12} md={4}>
            <ReadOnlyField
              label="Assigned By"
              value={lead.assignedbyname || "-"}
            />
          </Grid>

          <Grid item xs={12} md={3}>
            <ReadOnlyField label="Country" value={lead.countryname} />
          </Grid>

          <Grid item xs={12} md={3}>
            <ReadOnlyField label="State" value={lead.statename} />
          </Grid>

          <Grid item xs={12} md={3}>
            <ReadOnlyField label="City" value={lead.city} />
          </Grid>
        </Grid>

        <Grid
          container
          spacing={3}
          sx={{
            py: 2,
          }}
        >
          <Grid size={{ xs: 12, md: 3 }}>
            <ReadOnlyField label="Pincode" value={lead.pincode} />
          </Grid>

          <Grid size={{ xs: 12, md: 9 }}>
            <ReadOnlyField
              label="Address"
              value={lead.address}
              //   multiline
              //   rows={1}
            />
          </Grid>
        </Grid>

        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 12 }}>
            <ReadOnlyField
              label="Remarks"
              value={lead.remarks}
              multiline
              rows={2}
            />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default Details;
