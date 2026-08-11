import { API } from "../constants/api";
import api from "./axios";

export const getCountries = () => {
  return api.post(`${API.MASTER}/countries`);
};

export const getStates = (countryid) => {
  return api.post(`${API.MASTER}/states`, {
    countryid,
  });
};
