import { API } from "../constants/api";
import api from "./axios";

// Create Lead
export const createLead = (data) => {
  return api.post(`${API.LEADS}/create`, data);
};

// Get All Leads
export const getLeads = (data) => {
  return api.post(`${API.LEADS}/get`, data);
};
export const getCustomer = (data) => {
  return api.post(`${API.LEADS}/getcustomer`, data);
};

// Get Lead By Id
export const getLeadById = (id) => {
  return api.post(`${API.LEADS}/getById`, {
    id,
  });
};

// Update Lead
export const updateLead = (id, data) => {
  return api.post(`${API.LEADS}/update`, {
    id,
    ...data,
  });
};
export const updateLeadStatus = (data) => {
  return api.post(`${API.LEADS}/updateleadstatus`, data);
};
// Delete Lead
export const deleteLead = (id) => {
  return api.post(`${API.LEADS}/delete`, {
    id,
  });
};
