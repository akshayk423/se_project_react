import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useFormWithValidation } from "../../hooks/useFormWithValidation.js";
import { useEffect } from "react";

const AddItemModal = ({ isOpen, onAddItem, onClose }) => {
  const { values, handleChange, setValues, errors, isValid, handleReset } =
    useFormWithValidation({
      name: "",
      weather: "",
      imageUrl: "",
    });

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddItem(values, handleReset);
  };

  useEffect(() => {
    if (isOpen) {
      handleReset();
    }
  }, [isOpen]);

  return (
    <ModalWithForm
      title={"New Garment"}
      name={"add-garment"}
      onClose={onClose}
      onSubmit={handleSubmit}
      isOpen={isOpen}
      buttonText={"Add Garment"}
      isValid={isValid}
    >
      <label htmlFor="clothing-name-input" className="modal__label">
        Name
        <input
          id="clothing-name-input"
          type="text"
          className="modal__input"
          placeholder="Name"
          name="name"
          value={values.name}
          onChange={handleChange}
          minLength={2}
          maxLength={30}
          required
        />
        <span
          className={`modal__error ${
            errors.name ? "modal__error_visible" : ""
          }`}
          id="name-error"
        >
          {errors.name}
        </span>
      </label>
      <label htmlFor="clothing-image-url-input" className="modal__label">
        Image
        <input
          id="clothing-image-url-input"
          type="url"
          className="modal__input"
          placeholder="Image"
          name="imageUrl"
          value={values.imageUrl}
          onChange={handleChange}
          required
        />
        <span
          className={`modal__error ${
            errors.imageUrl ? "modal__error_visible" : ""
          }`}
          id="url-error"
        >
          {errors.imageUrl}
        </span>
      </label>
      <fieldset className="modal__radio-buttons">
        <legend className="modal__legend">Select Weather Type:</legend>
        <span
          className={`modal__error ${
            errors.weather ? "modal__error_visible" : ""
          }`}
          id="weather-error"
        >
          {errors.weather}
        </span>
        <label htmlFor="hot" className="modal__label modal__label_type_radio">
          <input
            id="hot"
            type="radio"
            value="hot"
            name="weather"
            className=" modal__input_type_radio"
            required
            checked={values.weather === "hot"}
            onChange={handleChange}
          />
          <span className="modal__radio-text">Hot</span>
        </label>
        <label htmlFor="warm" className="modal__label modal__label_type_radio">
          <input
            id="warm"
            type="radio"
            name="weather"
            value="warm"
            className=" modal__input_type_radio"
            checked={values.weather === "warm"}
            required
            onChange={handleChange}
          />
          <span className="modal__radio-text">Warm</span>
        </label>
        <label htmlFor="cold" className="modal__label modal__label_type_radio">
          <input
            id="cold"
            type="radio"
            value="cold"
            name="weather"
            className=" modal__input_type_radio"
            checked={values.weather === "cold"}
            required
            onChange={handleChange}
          />
          <span className="modal__radio-text">Cold</span>
        </label>
      </fieldset>
    </ModalWithForm>
  );
};

export default AddItemModal;
