import "./App.css";
import Header from "../Header/Header.jsx";
import Main from "../Main/Main.jsx";
import { useEffect, useState } from "react";
import Footer from "../Footer/Footer.jsx";
import ModalWithForm from "../ModalWithForm/ModalWithForm.jsx";
import ItemModal from "../ItemModel/ItemModal.jsx";
import { fetchWeatherData, filterWeatherData } from "../../utils/weatherApi.js";
import { defaultClothingItems } from "../../utils/defaultClothing.js";
import CurrentTemperaturUnitContext from "../../contexts/CurrentTemperaturUnitContext.js";
import { Routes, Route } from "react-router-dom";
import PageNotFound from "../PageNotFound/PageNotFounder.jsx";

const defaultWeather = {
  temp: { f: 78, c: Math.round((78 - 32) * (5 / 9)) },
  type: "hot",
  city: "New York City",
};

function App() {
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [weatherData, setWeatherData] = useState(defaultWeather);
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [currLocation, setCurrLocation] = useState({
    latitude: 99999,
    longitude: 99999,
  });
  const [clothingItems, setClothingItems] = useState(defaultClothingItems);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setCurrLocation({
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
        });
      },
      (err) => {
        console.warn("Geolocation error:", err);
      }
    );
  }, []);

  useEffect(() => {
    if (currLocation.longitude != 99999 && currLocation.latitude != 99999) {
      fetchWeatherData(currLocation)
        .then((data) => {
          const filteredData = filterWeatherData(data);
          setWeatherData(filteredData);
        })
        .catch((err) => console.error(err));
    }
  }, [currLocation]);

  const handleAddGarment = () => {
    setActiveModal("add-garment");
  };

  const closeModal = () => {
    setActiveModal("");
  };

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const handleTemperatureUnitToggle = () => {
    currentTemperatureUnit === "F"
      ? setCurrentTemperatureUnit("C")
      : setCurrentTemperatureUnit("F");
  };

  return (
    <div className="page">
      <CurrentTemperaturUnitContext.Provider
        value={{ currentTemperatureUnit, handleTemperatureUnitToggle }}
      >
        <div className="page__content">
          <Header handleAddGarment={handleAddGarment} city={weatherData.city} />
          <Routes>
            <Route
              path={`/`}
              element={
                <Main
                  weatherData={weatherData}
                  handleCardClick={handleCardClick}
                  defaultClothingItems={clothingItems}
                />
              }
            />

            <Route path={`*`} element={<PageNotFound />} />

            <Route path={`/profile`} />
          </Routes>

          <Footer />
        </div>
        <ModalWithForm
          title="New Garment"
          buttonText="Add Garment"
          activeModal={activeModal}
          onClose={closeModal}
          name={"add-garment"}
          isOpen={activeModal == "add-garment"}
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
            <label
              htmlFor="hot"
              className="modal__label modal__label_type_radio"
            >
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
      </CurrentTemperaturUnitContext.Provider>
      <Routes>
        <Route></Route>
      </Routes>
    </div>
  );
}

export default App;
