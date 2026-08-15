import { useState } from "react";

import { errorAlert, successAlert } from "../utils/alerts";

const useImport = (importApi) => {
  const [importLoading, setImportLoading] = useState(false);

  const handleImport = async (file) => {
    try {
      setImportLoading(true);

      //   const response = await importApi(file);

      successAlert(response?.data?.message || "Data imported successfully.");

      return response;
    } catch (error) {
      errorAlert(error.response?.data?.message || "Failed to import data.");

      throw error;
    } finally {
      setImportLoading(false);
    }
  };

  return {
    handleImport,
    importLoading,
  };
};

export default useImport;
