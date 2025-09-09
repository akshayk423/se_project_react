import "./ModalWithForm.css";
import { useEffect } from "react";

function ModalWithForm({
  children,
  buttonText,
  title,
  activeModal,
  onClose,
  isOpen,
  name,
}) {
  const handleCloseEscape = (evt) => {
    if (evt.key === "Escape") {
      onClose();
    }
  };

  const handleCloseClick = (evt) => {
    if (evt.target.classList.contains("modal")) {
      onClose();
    }
  };
  useEffect(() => {
    if (activeModal !== "") {
      window.addEventListener("click", handleCloseClick);
      window.addEventListener("keydown", handleCloseEscape);
      return () => {
        window.removeEventListener("click", handleCloseClick);
        window.removeEventListener("keydown", handleCloseEscape);
      };
    }
  }, [activeModal]);

  return (
    <div
      className={`modal modal_type_${name} ${isOpen ? "modal_is-opened" : ""} `}
    >
      <div className="modal__content">
        <form className="modal__form" name={name}>
          <h2 className="modal__title">{title}</h2>
          <button
            type="button"
            onClick={onClose}
            className="modal__close"
          ></button>
          {children}
          <button type="submit" className="modal__submit">
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
