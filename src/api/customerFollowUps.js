import { API } from "../constants/api";
import api from "./axios";

export const createCustomerFollowUp = (data) => {
  return api.post(`${API.CUSTOMER_FOLLOWUPS}/create`, data);
};

export const getCustomerFollowUps = (data) => {
  return api.post(`${API.CUSTOMER_FOLLOWUPS}/get`, data);
};

export const getCustomerFollowUpById = (data) => {
  return api.post(`${API.CUSTOMER_FOLLOWUPS}/getById`, data);
};

export const updateCustomerFollowUp = (data) => {
  return api.post(`${API.CUSTOMER_FOLLOWUPS}/update`, data);
};

export const deleteCustomerFollowUp = (data) => {
  return api.post(`${API.CUSTOMER_FOLLOWUPS}/delete`, data);
};
