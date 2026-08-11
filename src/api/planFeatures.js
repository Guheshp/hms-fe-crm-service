import { API } from "../constants/api";
import api from "./axios";

export const createPlanFeature = (data) => {
  return api.post(`${API.PLANFEATURES}/create`, data);
};

export const getPlanFeatures = (data) => {
  return api.post(`${API.PLANFEATURES}/get`, data);
};

export const getPlanFeatureById = (id) => {
  return api.post(`${API.PLANFEATURES}/getById`, {
    id,
  });
};

export const updatePlanFeature = (data) => {
  return api.post(`${API.PLANFEATURES}/update`, data);
};

export const deletePlanFeature = (id) => {
  return api.post(`${API.PLANFEATURES}/delete`, {
    id,
  });
};
