import "./App.css";
import Header from "../Header/Header.jsx";
import Main from "../Main/Main.jsx";
import { useEffect, useState } from "react";
import Footer from "../Footer/Footer.jsx";
import ItemModal from "../ItemModal/ItemModal.jsx";
import { fetchWeatherData, filterWeatherData } from "../../utils/weatherApi.js";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext.js";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";

import AddItemModal from "../AddItemModal/AddItemModal.jsx";
import Profile from "../Profile/Profile.jsx";
import clothingItemCards from "../../contexts/ClothingCardsContext.js";
import WeatherDataContext from "../../contexts/WeatherDataContext.js";
import ConfirmationModal from "../ConfirmationModal/ConfirmationModal.jsx";
import {
  getItems,
  addItem,
  deleteItem,
  editUserProfile,
  likeItem,
  unlikeItem,
} from "../../utils/api.js";
import CurrentUserContext from "../../contexts/CurrentUserContext.js";
import { signIn, signUp, validateUser } from "../../utils/auth.js";
import * as token from "../../utils/token.js";
import LoginModal from "../LoginModal/LoginModal.jsx";
import RegisterModal from "../RegisterModal/RegisterModal.jsx";
import EditProfileModal from "../EditProfileModal/EditProfileModal.jsx";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute.jsx";

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

  const [clothingItems, setClothingItems] = useState([]);
  const [currentUser, setCurrentUser] = useState({
    name: "",
    email: "",
    avatar: "",
    _id: "",
  });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  const navigate = useNavigate();

  // check geolocation on refresh
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
      },
    );
  }, []);

  // if geolocation is allowed, fetch weather data
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

  // fetch clothing items from backend on initial render
  useEffect(() => {
    getItems()
      .then((data) => {
        if (JSON.stringify(data.data) !== JSON.stringify(clothingItems)) {
          setClothingItems(data.data);
        }
      })
      .catch((error) => console.error(error));
  }, [clothingItems]);

  useEffect(() => {
    if (token.getToken())
      validateUser()
        .then((data) => {
          setIsLoggedIn(true);
          setCurrentUser({
            name: data.data.name,
            email: data.data.email,
            avatar: data.data.avatar,
            _id: data.data._id,
          });
        })
        .catch(() => {
          console.log("No authenticated user found");
        })
        .finally(() => {
          setIsCheckingAuth(false);
        });
  }, []);

  const handleEditProfile = () => {
    setActiveModal("edit-profile");
  };

  const handleAddGarment = () => {
    setActiveModal("add-garment");
  };

  const closeModal = () => {
    setActiveModal("");
  };

  const handleCardClick = (card) => {
    setActiveModal("preview");

    setSelectedCard(card);
    console.log("Selected card:", card);
    console.log(clothingItems);
  };

  const handleDeleteClick = () => {
    setActiveModal("delete-item");
  };

  const handleTemperatureUnitToggle = () => {
    currentTemperatureUnit === "F"
      ? setCurrentTemperatureUnit("C")
      : setCurrentTemperatureUnit("F");
  };

  const onDeleteItem = () => {
    deleteItem(selectedCard.cardId)
      .then(() => {
        const updatedClothingItems = clothingItems.filter(
          (item) => item._id !== selectedCard.cardId,
        );
        setClothingItems(updatedClothingItems);
        closeModal();
      })
      .catch((error) => console.log(error));
  };

  const onAddItem = (inputValues, resetFunction) => {
    const newData = {
      name: inputValues.name,
      imageUrl: inputValues.imageUrl,
      weather: inputValues.weather,
    };

    addItem(newData)
      .then((response) => {
        // Handle both response.data and direct response
        const newItem = response.data || response;
        setClothingItems([newItem, ...clothingItems]);
        console.log("Item added:", newItem);
        closeModal();
        resetFunction();
      })
      .catch((error) => console.log(error));
  };

  const handleSignUp = ({ email, password, avatar, name }, resetFunction) => {
    // Sign-up logic here
    // After successful sign-up, you might want to log the user in automatically and close the modal
    const input = { email, password, avatar, name };
    signUp(input.email, input.password, input.name, input.avatar)
      .then(() => {
        // Handle successful sign-up (e.g., store token, update UI)
        handleLogIn(
          { email: input.email, password: input.password },
          resetFunction,
        );
      })
      .catch((error) => {
        // Handle sign-up error (e.g., display error message)
        console.error(error);
      });
  };

  const handleLogIn = ({ email, password }, resetFunction) => {
    // Log-in logic here
    signIn(email, password)
      .then((data) => {
        // Handle successful log-in (e.g., store token, update UI)
        console.log("Log-in successful, received data:", data);
        token.setToken(data.token);
        setIsLoggedIn(true);
        setCurrentUser({
          name: data.data.name,
          email: data.data.email,
          avatar: data.data.avatar,
          _id: data.data._id,
        });
        resetFunction();
        closeModal();
      })
      .catch(() => {
        // Handle log-in error (e.g., display error message)
        console.error("Invalid credentials");
      });
  };

  const handleCardLike = ({ id, isLiked }) => {
    !isLiked
      ? likeItem(id)
          .then((response) => {
            const updatedCard = response.data || response;
            setClothingItems((cards) =>
              cards.map((item) => (item._id === id ? updatedCard : item)),
            );
          })
          .catch((err) => console.log(err))
      : unlikeItem(id)
          .then((response) => {
            const updatedCard = response.data || response;
            setClothingItems((cards) =>
              cards.map((item) => (item._id === id ? updatedCard : item)),
            );
          })
          .catch((err) => console.log(err));
  };

  const onUpdateUser = ({ name, avatar }) => {
    // Edit profile logic here
    editUserProfile(name, avatar)
      .then((data) => {
        setCurrentUser({
          ...currentUser,
          name: data.data.name,
          avatar: data.data.avatar,
        });
        closeModal();
      })
      .catch(() => console.log("Error updating profile"));
  };

  const openLoginModal = () => {
    setActiveModal("login");
  };

  const openRegisterModal = () => {
    setActiveModal("register");
  };

  const handleLogOut = () => {
    token.removeToken();
    setIsLoggedIn(false);
    setCurrentUser({ name: "", email: "", avatar: "" });
    navigate("/", { replace: true });
  };

  const handleSwitchForm = (formName) => {
    setActiveModal(formName);
  };

  return (
    <div className="page">
      <CurrentUserContext.Provider
        value={{
          handleLogIn,
          handleSignUp,
          isLoggedIn,
          currentUser,
          handleLogOut,
          handleEditProfile,
          onUpdateUser,
        }}
      >
        <WeatherDataContext.Provider value={{ weatherData }}>
          <clothingItemCards.Provider
            value={{
              clothingItems,
              handleCardClick,
              handleAddGarment,
              handleCardLike,
            }}
          >
            <CurrentTemperatureUnitContext.Provider
              value={{ currentTemperatureUnit, handleTemperatureUnitToggle }}
            >
              <div className="page__content">
                <Routes>
                  <Route
                    path={`/`}
                    element={
                      <ProtectedRoute
                        isLoggedIn={isLoggedIn}
                        anonymous={true}
                        isCheckingAuth={isCheckingAuth}
                      >
                        <>
                          <Header
                            handleAddGarment={handleAddGarment}
                            city={weatherData.city}
                            openLoginModal={openLoginModal}
                            openRegisterModal={openRegisterModal}
                          />
                          <Main weatherData={weatherData} />
                          <Footer />
                        </>
                      </ProtectedRoute>
                    }
                  />

                  <Route
                    path={`/profile`}
                    element={
                      <ProtectedRoute
                        isLoggedIn={isLoggedIn}
                        isCheckingAuth={isCheckingAuth}
                      >
                        <>
                          <Header
                            handleAddGarment={handleAddGarment}
                            city={weatherData.city}
                            openLoginModal={openLoginModal}
                            openRegisterModal={openRegisterModal}
                          />
                          <Profile />
                          <Footer />
                        </>
                      </ProtectedRoute>
                    }
                  />

                  <Route path={`*`} element={<Navigate to="/" replace />} />
                </Routes>
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
                onDeleteItem={onDeleteItem}
              />

              <LoginModal
                isOpen={activeModal === "login"}
                onClose={closeModal}
                onLogin={handleLogIn}
                onSwitchForm={handleSwitchForm}
              />

              <RegisterModal
                isOpen={activeModal === "register"}
                onClose={closeModal}
                onRegister={handleSignUp}
                onSwitchForm={handleSwitchForm}
              />

              <EditProfileModal
                isOpen={activeModal === "edit-profile"}
                onClose={closeModal}
              />
            </CurrentTemperatureUnitContext.Provider>
          </clothingItemCards.Provider>
        </WeatherDataContext.Provider>
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
