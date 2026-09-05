import { API } from "../constants/api";
import api from "./axios";

export const getDashboard = (data) => {
  return api.post(`${API.DASHBOARD}/get`, data);
};
