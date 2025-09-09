import "./ItemModal.css";

function ItemModal({ activeModal, card, onClose, isOpen }) {
  return (
    <div className={`modal ${isOpen ? "modal_is-opened" : ""}`}>
      <div className="modal__content modal__content_type_image">
        <button
          type="button"
          onClick={onClose}
          className="modal__close"
        ></button>
        <img src={card.link} alt={card.name} className="modal__image" />
        <div className="modal__footer">
          <p className="modal__caption">{card.name}</p>
          <p className="modal__weather">Weather: {card.weather}</p>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
