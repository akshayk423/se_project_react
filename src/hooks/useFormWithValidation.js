import { useState, useEffect } from "react";

export function useFormWithValidation(defaultValues) {
  const [values, setValues] = useState(defaultValues);
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    validateAllFields();
  }, []); // Empty dependency array = runs once on mount

  const validateAllFields = () => {
    const newErrors = {};
    let formIsValid = true;

    Object.keys(values).forEach((fieldname) => {
      if (fieldname === "name" && values[fieldname].trim() === "") {
        newErrors[fieldname] = "Name is required";
        formIsValid = false;
      }
      if (fieldname === "link" && values[fieldname].trim() === "") {
        newErrors[fieldname] = "Image link is required";
        formIsValid = false;
      }
      if (fieldname === "weather" && values[fieldname].trim() === "") {
        newErrors[fieldname] = "Weather type is required";
        formIsValid = false;
      }
    });

    setErrors(newErrors);
    setIsValid(formIsValid);
  };

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

  const validateField = (inputElement) => {
    // Use browser's built-in validation (like your original code!)
    if (!inputElement.validity.valid) {
      return inputElement.validationMessage;
    }
    return "";
  };

  return { values, handleChange, setValues, errors, isValid };
}
