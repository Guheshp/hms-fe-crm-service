import { useState } from "react";

import { errorAlert, successAlert } from "../utils/alerts";

const useExport = (exportApi) => {
  const [exportLoading, setExportLoading] = useState(false);

  const handleExport = async (params) => {
    try {
      setExportLoading(true);

      //   const response = await exportApi(params);

      successAlert(response?.data?.message || "Data exported successfully.");

      return response;
    } catch (error) {
      errorAlert(error.response?.data?.message || "Failed to export data.");

      throw error;
    } finally {
      setExportLoading(false);
    }
  };

  return {
    handleExport,
    exportLoading,
  };
};

export default useExport;
