import "./App.css";
import Header from "../Header/Header.jsx";
import Main from "../Main/Main.jsx";
import { useState } from "react";
import Footer from "../Footer/Footer.jsx";
import ModalWithForm from "../ModalWithForm/ModalWithForm.jsx";
import ItemModal from "../ItemModel/ItemModal.jsx";

function App() {
  const [weatherData, setWeatherData] = useState({ temp: 75, type: "hot" });
  const [activeModal, setActiveModal] = useState("preview");
  const [selectedCard, setSelectedCard] = useState({});

  const handleAddGarmet = () => {
    setActiveModal("add-garmet");
  };

  const closeModal = () => {
    setActiveModal("");
  };

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  return (
    <div className="page">
      <div className="page__content">
        <Header handleAddGarmet={handleAddGarmet} />
        <Main weatherData={weatherData} handleCardClick={handleCardClick} />
        <Footer />
      </div>
      <ModalWithForm
        title="New Garmet"
        buttonText="Add Garmet"
        activeModal={activeModal}
        onClose={closeModal}
        name={"add-garmet"}
        isOpen={activeModal == "add-garmet"}
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
          <label
            htmlFor="warm"
            className="modal__label modal__label_type_radio"
          >
            <input
              id="warm"
              type="radio"
              name="weather"
              value="warm"
              className="modal__input modal__input_type_radio"
            />
            <span className="modal__radio-text">Warm</span>
          </label>
          <label
            htmlFor="cold"
            className="modal__label modal__label_type_radio"
          >
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
      <ItemModal
        activeModal={activeModal}
        card={selectedCard}
        onClose={closeModal}
        isOpen={activeModal == "preview"}
      />
    </div>
  );
}

export default App;
