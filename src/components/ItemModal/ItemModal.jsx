import "./ItemModal.css";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import { useContext } from "react";

function ItemModal({ card, onClose, isOpen, handleDeleteClick }) {
  const { currentUser, isLoggedIn } = useContext(CurrentUserContext);
  return (
    <div className={`modal ${isOpen ? "modal_is-opened" : ""}`}>
      <div className="modal__content modal__content_type_image">
        <button
          type="button"
          onClick={onClose}
          className="modal__close"
        ></button>
        <img src={card.imageUrl} alt={card.name} className="modal__image" />
        <div className="modal__footer">
          <div className="modal__garment-info">
            <p className="modal__caption">{card.name}</p>
            <p className="modal__weather">Weather: {card.weather}</p>
          </div>
          {isLoggedIn && currentUser._id === card.owner && (
            <button className="modal__delete-btn" onClick={handleDeleteClick}>
              Delete item
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
