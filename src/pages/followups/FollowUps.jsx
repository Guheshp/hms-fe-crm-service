import { useEffect, useState } from "react";
import { Add } from "@mui/icons-material";
import { Card, CardContent, Drawer, Typography } from "@mui/material";

import PageHeader from "../../components/common/PageHeader";
import FollowUpForm from "./FollowUpForm";
import { deleteLeadFollowUp, getLeadFollowUps } from "../../api/leadFollowUps";
import DataGridTable from "../../components/common/DataGridTable";
import { columns } from "./Columns";
import { errorAlert, successAlert } from "../../utils/alerts";
import { confirmDelete } from "../../utils/confirm";
// import FollowUpForm from "./FollowUpForm";

const FollowUps = ({ id }) => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [loading, setLoading] = useState(false);

  const [followUps, setFollowUps] = useState([]);

  const [params, setParams] = useState({
    page: 1,
    limit: 10,
  });

  const [totalRecords, setTotalRecords] = useState(0);

  const [selectedFollowUp, setSelectedFollowUp] = useState(null);

  const handleCreate = () => {
    setSelectedFollowUp(null);
    setOpenDrawer(true);
  };

  const handleEdit = (row) => {
    setSelectedFollowUp(row);
    setOpenDrawer(true);
  };

  const getAllFollowUps = async () => {
    try {
      setLoading(true);

      const response = await getLeadFollowUps({
        leadid: id,
        page: params.page,
        limit: params.limit,
      });

      setFollowUps(response.data.data);

      setTotalRecords(response.data.pagination.totalRecords);
    } catch (error) {
      errorAlert(
        error.response?.data?.message || "Failed to fetch follow ups.",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      getAllFollowUps();
    }
  }, [id, params.page, params.limit]);

  const handleDelete = async (row) => {
    const result = await confirmDelete(
      "Delete Follow Up?",
      "Are you sure you want to delete this follow up?",
    );

    if (!result.isConfirmed) return;

    try {
      setLoading(true);

      const response = await deleteLeadFollowUp(row.id);

      successAlert(response.data.message);

      await getAllFollowUps();
    } catch (error) {
      errorAlert(
        error.response?.data?.message || "Failed to delete follow up.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <PageHeader
        title="Follow Ups"
        subtitle="Manage all follow ups for this lead."
        buttonText="Create Follow Up"
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
          rows={followUps}
          columns={columns(handleEdit, handleDelete)}
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

      <Drawer
        anchor="right"
        open={openDrawer}
        onClose={() => {
          setOpenDrawer(false);
          setSelectedFollowUp(null);
        }}
        slotProps={{
          paper: {
            sx: {
              width: "30vw",
              maxWidth: 1200,
            },
          },
        }}
      >
        <FollowUpForm
          leadId={id}
          followUp={selectedFollowUp}
          isEdit={Boolean(selectedFollowUp)}
          getAllFollowUps={getAllFollowUps}
          onClose={() => {
            setOpenDrawer(false);
            setSelectedFollowUp(null);
          }}
        />
      </Drawer>
    </>
  );
};

export default FollowUps;
