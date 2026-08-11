import PageHeader from "../../components/common/PageHeader";
import LeadForm from "./LeadForm";

const CreateLead = () => {
  return (
    <>
      <PageHeader
        showBackButton
        backText="Leads"
        backPath="/leads"
        title="Create Lead"
        // subtitle="Create a new lead from an enquiry."
      />

      <LeadForm />
    </>
  );
};

export default CreateLead;
