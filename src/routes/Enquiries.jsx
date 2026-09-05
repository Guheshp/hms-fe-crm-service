import CreateEnquiry from "../pages/enquiries/CreateEnquiry";
import Enquiries from "../pages/enquiries/Enquiries";

const enquiriesRoutes = [
  {
    path: "/enquiries",
    element: <Enquiries />,
  },
  {
    path: "/enquiries/create",
    element: <CreateEnquiry />,
  },
];

export default enquiriesRoutes;
