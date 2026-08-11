import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import PublicHeader from "./layout/PublicHeader";
import Footer from "./layout/Footer";

const App = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <PublicHeader />

      <main className="flex-1">
        <Outlet />
      </main>

      <Footer />

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
        theme="colored"
      />
    </div>
  );
};

export default App;
