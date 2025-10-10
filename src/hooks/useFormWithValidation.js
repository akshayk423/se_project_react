import { useState, useEffect } from "react";
import { flushSync } from "react-dom";

export function useFormWithValidation(defaultValues) {
  const [values, setValues] = useState(defaultValues);
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    handleReset();
  }, []); // Empty dependency array = runs once on mount

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
    const defaultErrors = {
      name: "Name is required",
      imageUrl: "Image URL is required",
      weather: "Weather type is required",
    };
    setErrors(defaultErrors);
    setIsValid(false);
    setValues(defaultValues);
  };

  const validateField = (inputElement) => {
    // Use browser's built-in validation (like your original code!)
    if (!inputElement.validity.valid) {
      return inputElement.validationMessage;
    }
    return "";
  };

  return { values, handleChange, setValues, errors, isValid, handleReset };
}
