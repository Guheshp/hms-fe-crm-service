import { API } from "../constants/api";
import api from "./axios";

export const register = (data) => {
  return api.post(`${API.USERS}/create`, data);
};

export const login = (data) => {
  return api.post(`${API.AUTH}/login`, data);
};

export const verifyOtp = (data) => {
  return api.post(`${API.AUTH}/verify-otp`, data);
};

export const resendOtp = (data) => {
  return api.post(`${API.AUTH}/resend-otp`, data);
};

export const logOut = (data) => {
  return api.post(`${API.AUTH}/logout`, data);
};
