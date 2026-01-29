import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useFormWithValidation } from "../../hooks/useFormWithValidation.js";
import { useEffect } from "react";

const LoginModal = ({ isOpen, onLogin, onClose, onSwitchForm }) => {
  const { values, handleChange, errors, isValid, handleReset } =
    useFormWithValidation({
      email: "",
      password: "",
    });

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(values, handleReset);
  };

  useEffect(() => {
    if (isOpen) {
      handleReset();
    }
  }, [isOpen]);

  const handleSwitchToSignUp = () => {
    onClose();
    onSwitchForm("register");
  };

  return (
    <ModalWithForm
      title={"Login"}
      name={"login"}
      onSubmit={handleSubmit}
      onClose={onClose}
      isValid={isValid}
      isOpen={isOpen}
      buttonText={"Log In"}
      isAuthForm={true}
      onSwitchForm={handleSwitchToSignUp}
    >
      <label htmlFor="login-email-input" className="modal__label">
        Email
        <input
          id="login-email-input"
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

      <label htmlFor="login-password-input" className="modal__label">
        Password
        <input
          id="login-password-input"
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
    </ModalWithForm>
  );
};

export default LoginModal;
