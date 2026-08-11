import { useEffect, useState } from "react";
import { getCountries, getStates } from "../api/master";

const useCountryState = (countryId, setValue) => {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadCountries = async () => {
      setLoading(true);

      try {
        const data = await getCountries();
        console.log("staete", data?.data?.data);

        setCountries(data?.data?.data);
      } finally {
        setLoading(false);
      }
    };

    loadCountries();
  }, []);

  useEffect(() => {
    const loadStates = async () => {
      setValue("stateid", "");
      setStates([]);

      if (!countryId) return;

      try {
        const data = await getStates(countryId);
        console.log("staete", data?.data?.data);
        setStates(data?.data?.data);
      } catch {
        setStates([]);
      }
    };

    loadStates();
  }, [countryId, setValue]);

  return {
    countries,
    states,
    loading,
  };
};

export default useCountryState;
