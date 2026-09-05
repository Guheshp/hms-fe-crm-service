export const formatDate = (timestamp) => {
  if (!timestamp) return "—";

  const date = new Date(Number(timestamp));

  if (Number.isNaN(date.getTime())) return "—";

  return date.toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

export const uploadImage = async ({
  file,
  apiCall,
  fieldName = "image",
  fields = {},
  maxSize = 5,
}) => {
  if (!file) {
    throw new Error("Please select an image.");
  }

  if (!file.type?.startsWith("image/")) {
    throw new Error("Please select a valid image.");
  }

  if (file.size > maxSize * 1024 * 1024) {
    throw new Error(`Image size must be less than ${maxSize} MB.`);
  }

  const formData = new FormData();

  Object.entries(fields).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      formData.append(key, String(value));
    }
  });

  formData.append(fieldName, file);

  console.log("FormData contents:");

  for (const [key, value] of formData.entries()) {
    console.log(key, value);
  }

  return apiCall(formData);
};
