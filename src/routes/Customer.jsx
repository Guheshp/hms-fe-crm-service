import Customer from "../pages/customer/Customer";
import CreateEnquiry from "../pages/enquiries/CreateEnquiry";
import Enquiries from "../pages/enquiries/Enquiries";

const customerRoutes = [
  {
    path: "/customers",
    element: <Customer />,
  },
  // {
  //   path: "/enquiries/create",
  //   element: <CreateEnquiry />,
  // },
];

export default customerRoutes;
