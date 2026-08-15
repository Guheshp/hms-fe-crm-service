import React from "react";
import PageHeader from "../../components/common/PageHeader";
import PlanForm from "./PlanForm";

const CreatePlan = () => {
  return (
    <>
      <>
        <PageHeader
          showBackButton
          backText="Back"
          backPath="/plans"
          title="Create Plan"
          // subtitle="Create a new lead from an enquiry."
        />

        <PlanForm />
      </>
    </>
  );
};

export default CreatePlan;
