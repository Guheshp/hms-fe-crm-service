import CreateUser from "../pages/users/CreateUser";
import EditUser from "../pages/users/EditUser";
import Users from "../pages/users/Users";

const userRoutes = [
  {
    path: "users",
    element: <Users />,
  },
  {
    path: "users/create",
    element: <CreateUser />,
  },
  {
    path: "users/:id/edit",
    element: <EditUser />,
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

export default userRoutes;
