import CreateSubscription from "../pages/leads/subscriptions/CreateSubscription";
import Subscriptions from "../pages/subscriptions/Subscriptions";

const subscriptionsRoutes = [
  {
    path: "/subscriptions/:leadid/create",
    element: <CreateSubscription />,
  },
  {
    path: "/subscriptions",
    element: <Subscriptions />,
  },
  // {
  //   path: "plans/edit/:id",
  //   element: <PlanEdit />,
  // },
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

export default subscriptionsRoutes;
