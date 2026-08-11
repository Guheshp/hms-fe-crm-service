import CreateLead from "../pages/leads/Createlead";
import LeadEdit from "../pages/leads/LeadEdit";
import Leads from "../pages/leads/Leads";
import LeadView from "../pages/leads/LeadView";

const leadsRoutes = [
  {
    path: "leads",
    element: <Leads />,
  },
  {
    path: "leads/create",
    element: <CreateLead />,
  },
  {
    path: "leads/:id",
    element: <LeadView />,
  },
  {
    path: "leads/edit/:id",
    element: <LeadEdit />,
  },
  //   {
  //     path: "users/:id",
  //     element: <UserDetails />,
  //   },
  //   {
  //     path: "users/:id/edit",
  //     element: <EditUser />,
  //   },
];

export default leadsRoutes;
