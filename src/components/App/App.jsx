import "./App.css";
import Header from "../Header/Header.jsx";
import Main from "../Main/Main.jsx";
import { useEffect, useState } from "react";
import Footer from "../Footer/Footer.jsx";
import ItemModal from "../ItemModel/ItemModal.jsx";
import { fetchWeatherData, filterWeatherData } from "../../utils/weatherApi.js";
import { defaultClothingItems } from "../../utils/defaultClothing.js";
import CurrentTemperaturUnitContext from "../../contexts/CurrentTemperaturUnitContext.js";
import { Routes, Route } from "react-router-dom";
import PageNotFound from "../PageNotFound/PageNotFounder.jsx";
import AddItemModal from "../AddItemModal/AddItemModal.jsx";
import Profile from "../Profile/Profile.jsx";
import clothingItemCards from "../../contexts/ClothingCardsContext.js";
import WeatherDataContext from "../../contexts/WeatherDataContext.js";
import ConfirmationModal from "../ConfirmationModal/ConfirmationModal.jsx";

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

  const handleDeleteClick = () => {
    setActiveModal("delete-item");
  };

  const handleTemperatureUnitToggle = () => {
    currentTemperatureUnit === "F"
      ? setCurrentTemperatureUnit("C")
      : setCurrentTemperatureUnit("F");
  };

  const onAddItem = () => {};

  return (
    <div className="page">
      <WeatherDataContext.Provider value={{ weatherData }}>
        <clothingItemCards.Provider
          value={{ clothingItems, handleCardClick, handleAddGarment }}
        >
          <CurrentTemperaturUnitContext.Provider
            value={{ currentTemperatureUnit, handleTemperatureUnitToggle }}
          >
            <div className="page__content">
              <Header
                handleAddGarment={handleAddGarment}
                city={weatherData.city}
              />
              <Routes>
                <Route
                  path={`/`}
                  element={<Main weatherData={weatherData} />}
                />

                <Route path={`*`} element={<PageNotFound />} />

                <Route path={`/profile`} element={<Profile />} />
              </Routes>

              <Footer />
            </div>

            <AddItemModal
              isOpen={activeModal == "add-garment"}
              onClose={closeModal}
              onAddItem={onAddItem}
            />

            <ItemModal
              activeModal={activeModal}
              card={selectedCard}
              onClose={closeModal}
              isOpen={activeModal == "preview"}
              handleDeleteClick={handleDeleteClick}
            />

            <ConfirmationModal
              activeModal={activeModal}
              onClose={closeModal}
              isOpen={activeModal == "delete-item"}
            />
          </CurrentTemperaturUnitContext.Provider>
        </clothingItemCards.Provider>
      </WeatherDataContext.Provider>
    </div>
  );
}

export default App;
