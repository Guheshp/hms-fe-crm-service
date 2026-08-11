import api from "./axios";

export const createSubscription = (data) => {
  return api.post("/subscriptions/create", data);
};

export const getSubscriptions = (data) => {
  return api.post("/subscriptions/get", data);
};

export const getSubscriptionById = (data) => {
  return api.post("/subscriptions/getById", data);
};

export const updateSubscription = (data) => {
  return api.post("/subscriptions/update", data);
};

export const deleteSubscription = (id) => {
  return api.post("/subscriptions/delete", {
    id,
  });
};

export const updateSubscriptionOrganization = (data) => {
  return api.post("/subscriptions/updateOrganization", data);
};
