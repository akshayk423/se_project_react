import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useFormWithValidation } from "../../hooks/useFormWithValidation.js";
import { useContext, useEffect } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext.js";

const EditProfileModal = ({ isOpen, onClose }) => {
  const { currentUser, onUpdateUser } = useContext(CurrentUserContext);

  const {
    values,
    handleChange,
    errors,
    isValid,
    setValues,
    handleReset,
    resetErrors,
  } = useFormWithValidation({
    name: currentUser?.name || "",
    avatar: currentUser?.avatar || "",
  });

  useEffect(() => {
    if (isOpen && currentUser) {
      setValues({
        name: currentUser.name || "",
        avatar: currentUser.avatar || "",
      });
      resetErrors();
    }
  }, [isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateUser(values, handleReset);
  };

  return (
    <ModalWithForm
      title={"Edit Profile"}
      name={"edit-profile"}
      onSubmit={handleSubmit}
      onClose={onClose}
      isValid={isValid}
      isOpen={isOpen}
      buttonText={"Save"}
    >
      <label htmlFor="edit-name-input" className="modal__label">
        Name
        <input
          id="edit-name-input"
          type="text"
          className="modal__input"
          placeholder="Name"
          name="name"
          minLength="2"
          maxLength="40"
          value={values.name || ""}
          onChange={handleChange}
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
      <label htmlFor="edit-avatar-input" className="modal__label">
        Avatar URL
        <input
          id="edit-avatar-input"
          type="url"
          className="modal__input"
          placeholder="Avatar URL"
          name="avatar"
          value={values.avatar || ""}
          onChange={handleChange}
          required
        />
        <span
          className={`modal__error ${
            errors.avatar ? "modal__error_visible" : ""
          }`}
          id="avatar-error"
        >
          {errors.avatar}
        </span>
      </label>
    </ModalWithForm>
  );
};
export default EditProfileModal;
