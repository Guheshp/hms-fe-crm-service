import { API } from "../constants/api";
import api from "./axios";

export const createRazorpayOrder = (data) => {
  return api.post(`payments/createorder`, data);
};

export const verifyRazorpayPayment = (data) => {
  return api.post(`payments/verifypayment`, data);
};

export const createPayment = (data) => {
  return api.post(`${API.PAYMENTS}/create`, data);
};

export const getPayments = (data) => {
  return api.post(`${API.PAYMENTS}/get`, data);
};

export const getPaymentById = (data) => {
  return api.post(`${API.PAYMENTS}/getById`, data);
};

export const updatePayment = (data) => {
  return api.post(`${API.PAYMENTS}/update`, data);
};

export const deletePayment = (id) => {
  return api.post(`${API.PAYMENTS}/delete`, {
    id,
  });
};
