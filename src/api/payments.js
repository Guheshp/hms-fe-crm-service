import api from "./axios";

export const createRazorpayOrder = (data) => {
  return api.post(`payments/createorder`, data);
};

export const verifyRazorpayPayment = (data) => {
  return api.post(`payments/verifypayment`, data);
};
