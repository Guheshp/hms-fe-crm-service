import CreateLead from "../pages/leads/Createlead";
import LeadEdit from "../pages/leads/LeadEdit";
import Leads from "../pages/leads/Leads";
import LeadView from "../pages/leads/LeadView";
import CreatePlan from "../pages/plans/CreatePlan";
import PlanEdit from "../pages/plans/PlanEdit";
import Plans from "../pages/plans/Plans";

const planRoutes = [
  {
    path: "/plans",
    element: <Plans />,
  },
  {
    path: "/plans/create",
    element: <CreatePlan />,
  },
  {
    path: "plans/edit/:id",
    element: <PlanEdit />,
  },
  //   {
  //     path: "leads/edit/:id",
  //     element: <LeadEdit />,
  //   },
  //   {
  //     path: "users/:id",
  //     element: <UserDetails />,
  //   },
  //   {
  //     path: "users/:id/edit",
  //     element: <EditUser />,
  //   },
];

export default planRoutes;
