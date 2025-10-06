import ModalWithForm from "../ModalWithForm/ModalWithForm";

const AddItemModal = ({ isOpen, onAddItem, onClose }) => {
  return (
    <ModalWithForm
      title={"New Garment"}
      name={"add-garment"}
      onClose={onClose}
      onSubmit={onAddItem}
      isOpen={isOpen}
      buttonText={"Add Garment"}
    >
      <label htmlFor="clothing-name-input" className="modal__label">
        Name
        <input
          id="clothing-name-input"
          type="text"
          className="modal__input"
          placeholder="Name"
        />
      </label>
      <label htmlFor="clothing-image-url-input" className="modal__label">
        Image
        <input type="url" className="modal__input" placeholder="Image" />
      </label>
      <fieldset className="modal__radio-buttons">
        <legend className="modal__legend">Select Weather Type:</legend>
        <label htmlFor="hot" className="modal__label modal__label_type_radio">
          <input
            id="hot"
            type="radio"
            value="hot"
            name="weather"
            className="modal__input modal__input_type_radio"
          />
          <span className="modal__radio-text">Hot</span>
        </label>
        <label htmlFor="warm" className="modal__label modal__label_type_radio">
          <input
            id="warm"
            type="radio"
            name="weather"
            value="warm"
            className="modal__input modal__input_type_radio"
          />
          <span className="modal__radio-text">Warm</span>
        </label>
        <label htmlFor="cold" className="modal__label modal__label_type_radio">
          <input
            id="cold"
            type="radio"
            value="cold"
            name="weather"
            className="modal__input modal__input_type_radio"
          />
          <span className="modal__radio-text">Cold</span>
        </label>
      </fieldset>
    </ModalWithForm>
  );
};

export default AddItemModal;
