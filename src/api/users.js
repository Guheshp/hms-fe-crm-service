import { API } from "../constants/api";
import api from "./axios";

// Get Users (Pagination + Search)
export const get = (data) => {
  return api.post(`${API.USERS}/get`, data);
};

// Get User By Id
export const getById = (id) => {
  return api.post(`${API.USERS}/getById`, {
    id,
  });
};

// Update User
export const updateUser = (data) => {
  return api.post(`${API.USERS}/update`, data);
};

// Delete User
export const deleteUser = (id) => {
  return api.post(`${API.USERS}/delete`, {
    id,
  });
};
