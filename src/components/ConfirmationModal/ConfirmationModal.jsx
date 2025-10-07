import "./ConfirmationModal.css";

const ConfirmationModal = ({ activeModal, onClose, isOpen }) => {
  return (
    <div className={`modal ${isOpen ? "modal_is-opened" : ""}`}>
      <div className="modal__content modal__content_type_confirmation">
        <button
          type="button"
          onClick={onClose}
          className="modal__close"
        ></button>
        <p className="modal__prompt">
          Are you sure you want to delete this item?
        </p>
        <p className="modal__prompt">This action is irreversible.</p>
        <button className="modal__confirm-btn">Yes, delete this item</button>
        <button className="modal__cancel-btn">Cancel</button>
      </div>
    </div>
  );
};

export default ConfirmationModal;
