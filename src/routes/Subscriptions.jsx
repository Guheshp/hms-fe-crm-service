import CreateSubscription from "../pages/leads/subscriptions/CreateSubscription";

const subscriptionsRoutes = [
  {
    path: "/subscriptions/:leadid/create",
    element: <CreateSubscription />,
  },
  // {
  //   path: "/plans/create",
  //   element: <CreatePlan />,
  // },
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
