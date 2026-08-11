import { API } from "../constants/api";
import api from "./axios";

// Create Enquiry
export const createEnquiry = (data) => {
  return api.post(`${API.ENQUIRIES}/create`, data);
};

// Get All Enquiries
export const getEnquiries = (data) => {
  return api.post(`${API.ENQUIRIES}/get`, data);
};

// Get Enquiry By Id
export const getEnquiryById = (id) => {
  return api.post(`${API.ENQUIRIES}/getById`, {
    id,
  });
};

// Update Enquiry
export const updateEnquiry = (data) => {
  return api.post(`${API.ENQUIRIES}/update`, data);
};

// Delete Enquiry
export const deleteEnquiry = (id) => {
  return api.delete(`${API.ENQUIRIES}/delete`, {
    data: { id },
  });
};
