import { toast } from "react-toastify";

const config = {
  position: "top-right",
  autoClose: 2500,
  hideProgressBar: true,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: false,
  theme: "light",
};

export const successAlert = (message) => {
  toast.success(message, config);
};

export const errorAlert = (message) => {
  toast.error(message, config);
};

export const warningAlert = (message) => {
  toast.warning(message, config);
};

export const infoAlert = (message) => {
  toast.info(message, config);
};
