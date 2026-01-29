import { useState } from "react";

export function useFormWithValidation(defaultValues) {
  const [values, setValues] = useState(defaultValues);
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    // Update values (same as before)
    setValues({ ...values, [name]: value });

    // Validate this field (React way!)
    const fieldError = validateField(event.target);
    setErrors({ ...errors, [name]: fieldError });

    // Check if whole form is valid
    const newErrors = { ...errors, [name]: fieldError };
    setIsValid(Object.values(newErrors).every((error) => !error));
  };

  const handleReset = () => {
    var defaultErrors = {};
    for (const key in defaultValues) {
      const fieldName = key.charAt(0).toUpperCase() + key.slice(1);
      defaultErrors[key] = `${fieldName} is required`;
    }
    setErrors(defaultErrors);
    setIsValid(false);
    setValues(defaultValues);
  };

  const resetErrors = () => {
    var defaultErrors = {};
    for (const key in defaultValues) {
      defaultErrors[key] = "";
    }
    setErrors(defaultErrors);
  };

  const validateField = (inputElement) => {
    // Use browser's built-in validation (like your original code!)
    if (!inputElement.validity.valid) {
      return inputElement.validationMessage;
    }
    return "";
  };

  return {
    values,
    handleChange,
    setValues,
    errors,
    isValid,
    handleReset,
    resetErrors,
  };
}
