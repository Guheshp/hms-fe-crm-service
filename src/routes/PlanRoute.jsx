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
];

export default planRoutes;
