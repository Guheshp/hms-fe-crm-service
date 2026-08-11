import api from "./axios";
import { API } from "../constants/api";

export const createLeadStatus = (data) => {
  return api.post(`${API.LEADSTATUS}/create`, data);
};

export const getLeadStatuses = (data) => {
  return api.post(`${API.LEADSTATUS}/get`, data);
};

export const getLeadStatusById = (id) => {
  return api.post(`${API.LEADSTATUS}/getById`, {
    id,
  });
};

export const updateLeadStatus = (data) => {
  return api.post(`${API.LEADSTATUS}/update`, data);
};

export const deleteLeadStatus = (id) => {
  return api.post(`${API.LEADSTATUS}/delete`, {
    id,
  });
};
