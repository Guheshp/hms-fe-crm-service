import { API } from "../constants/api";
import api from "./axios";

export const createCall = (data) => {
  return api.post(`${API.CALLS}/create`, data);
};

export const getCalls = (data) => {
  return api.post(`${API.CALLS}/get`, data);
};

export const getCallById = (data) => {
  return api.post(`${API.CALLS}/getById`, data);
};

export const updateCall = (data) => {
  return api.post(`${API.CALLS}/update`, data);
};

export const deleteCall = (data) => {
  return api.post(`${API.CALLS}/delete`, data);
};
