import "./ModalWithForm.css";
import { useEffect, useCallback } from "react";

function ModalWithForm({
  children,
  buttonText,
  title,
  activeModal,
  onClose,
  isOpen,
  name,
  isValid,
  onSubmit,
  isAuthForm = false,
  onSwitchForm,
}) {
  const handleCloseEscape = useCallback(
    (evt) => {
      if (evt.key === "Escape") {
        onClose();
      }
    },
    [onClose],
  );

  const handleCloseClick = useCallback(
    (evt) => {
      if (evt.target.classList.contains("modal")) {
        onClose();
      }
    },
    [onClose],
  );

  useEffect(() => {
    if (activeModal !== "") {
      window.addEventListener("click", handleCloseClick);
      window.addEventListener("keydown", handleCloseEscape);
      return () => {
        window.removeEventListener("click", handleCloseClick);
        window.removeEventListener("keydown", handleCloseEscape);
      };
    }
  }, [activeModal, handleCloseClick, handleCloseEscape]);

  return (
    <div
      className={`modal modal_type_${name} ${isOpen ? "modal_is-opened" : ""} `}
    >
      <div className="modal__content modal__content_type_form">
        <form className="modal__form" name={name} onSubmit={onSubmit}>
          <h2 className="modal__title">{title}</h2>
          <button
            type="button"
            onClick={onClose}
            className="modal__close"
          ></button>
          {children}
          <div className="modal__submit-container">
            <button
              type="submit"
              className={`modal__submit ${
                !isValid ? "modal__submit_type_disabled" : ""
              }`}
              disabled={!isValid}
            >
              {buttonText}
            </button>
            {isAuthForm ? (
              <button
                type="button"
                className="modal__switch-auth-form-btn"
                onClick={onSwitchForm}
              >
                {buttonText === "Log In" ? "Or Sign Up" : "Or Log In"}
              </button>
            ) : null}
          </div>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
