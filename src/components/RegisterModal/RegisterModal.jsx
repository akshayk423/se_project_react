import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useFormWithValidation } from "../../hooks/useFormWithValidation.js";
import { useEffect } from "react";

const RegisterModal = ({ isOpen, onRegister, onClose, onSwitchForm }) => {
  const { values, handleChange, errors, isValid, handleReset } =
    useFormWithValidation({
      email: "",
      password: "",
      name: "",
      avatar: "",
    });

  const handleSubmit = (e) => {
    e.preventDefault();
    onRegister(values, handleReset);
  };

  useEffect(() => {
    if (isOpen) {
      handleReset();
    }
  }, [isOpen]);

  const handleSwitchToLogin = () => {
    onClose();
    onSwitchForm("login");
  };

  return (
    <ModalWithForm
      title={"Register"}
      name={"register"}
      onSubmit={handleSubmit}
      onClose={onClose}
      isValid={isValid}
      isOpen={isOpen}
      buttonText={"Sign Up"}
      isAuthForm={true}
      onSwitchForm={handleSwitchToLogin}
    >
      <label htmlFor="register-email-input" className="modal__label">
        Email
        <input
          id="register-email-input"
          type="email"
          className="modal__input"
          placeholder="Email"
          name="email"
          value={values.email}
          onChange={handleChange}
          required
        />
        <span
          className={`modal__error ${
            errors.email ? "modal__error_visible" : ""
          }`}
          id="email-error"
        >
          {errors.email}
        </span>
      </label>
      <label htmlFor="register-password-input" className="modal__label">
        Password
        <input
          id="register-password-input"
          type="password"
          className="modal__input"
          placeholder="Password"
          name="password"
          value={values.password}
          onChange={handleChange}
          minLength={6}
          required
        />
        <span
          className={`modal__error ${
            errors.password ? "modal__error_visible" : ""
          }`}
          id="password-error"
        >
          {errors.password}
        </span>
      </label>
      <label htmlFor="register-name-input" className="modal__label">
        Name
        <input
          id="register-name-input"
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
      <label htmlFor="register-avatar-input" className="modal__label">
        Avatar URL
        <input
          id="register-avatar-input"
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

export default RegisterModal;
