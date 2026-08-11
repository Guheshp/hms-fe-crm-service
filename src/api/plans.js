import { API } from "../constants/api";
import api from "./axios";

export const createPlan = (data) => {
  return api.post(`${API.PLANS}/create`, data);
};

export const getPlans = (data) => {
  return api.post(`${API.PLANS}/get`, data);
};

export const getPlanById = (id) => {
  return api.post(`${API.PLANS}/getById`, {
    id,
  });
};

export const updatePlan = (data) => {
  return api.post(`${API.PLANS}/update`, data);
};

export const deletePlan = (id) => {
  return api.post(`${API.PLANS}/delete`, {
    id,
  });
};
