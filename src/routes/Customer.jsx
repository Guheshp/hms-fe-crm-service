import Customer from "../pages/customer/Customer";
import CustomerEdit from "../pages/customer/CustomerEdit";
import CustomerView from "../pages/customer/CustomerView";
import CreateEnquiry from "../pages/enquiries/CreateEnquiry";
import Enquiries from "../pages/enquiries/Enquiries";

const customerRoutes = [
  {
    path: "/customers",
    element: <Customer />,
  },
  {
    path: "customers/:id",
    element: <CustomerView />,
  },
  {
    path: "customers/edit/:id",
    element: <CustomerEdit />,
  },
  // {
  //   path: "/enquiries/create",
  //   element: <CreateEnquiry />,
  // },
];

export default customerRoutes;
