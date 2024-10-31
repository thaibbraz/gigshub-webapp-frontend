export const validateForm = (formData) => {
  const errors = {};

  for (const field in formData) {
    if (!formData[field].trim()) {
      errors[field] = `${
        field[0].toUpperCase() + field.slice(1).split("_").join(" ")
      } is required`;
    }
  }

  return errors;
};

export const getValidationClass = (errors, field, submitted) => {
  if (!submitted) return null;
  return errors[field]
    ? "border-rose-600 border-6"
    : "border-green-600 border-6";
};
