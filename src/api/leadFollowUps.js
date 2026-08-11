import axios from "./axios";

export const createLeadFollowUp = (data) => {
  return axios.post("/leadfollowups/create", data);
};

export const getLeadFollowUps = (data) => {
  return axios.post("/leadfollowups/get", data);
};

export const getLeadFollowUpById = (id) => {
  return axios.post("/leadfollowups/getById", { id });
};

export const updateLeadFollowUp = (data) => {
  return axios.post("/leadfollowups/update", data);
};

export const deleteLeadFollowUp = (id) => {
  return axios.post("/leadfollowups/delete", { id });
};
