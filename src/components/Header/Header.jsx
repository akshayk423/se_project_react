import "./Header.css";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch.jsx";
import { Link } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../../contexts/CurrentUserContext.js";

const currentDate = new Date().toLocaleString("default", {
  month: "long",
  day: "numeric",
});

function Header({ handleAddGarment, city, openLoginModal, openRegisterModal }) {
  const { isLoggedIn, currentUser } = useContext(AuthContext);

  return (
    <header className="header">
      <Link className="header__logo" to="/">
        wtwr°
      </Link>
      <p className="header__date-and-location">
        {currentDate}, {city}
      </p>

      <div className="header__buttons">
        <ToggleSwitch />

        {isLoggedIn ? (
          <>
            <button
              type="button"
              className="header__add-clothes-btn"
              onClick={handleAddGarment}
            >
              + Add Clothes
            </button>
            <Link className="header__user-container" to="/profile">
              <p className="header__username">{currentUser?.name}</p>
              <img
                src={currentUser?.avatar}
                alt="user avatar"
                className="header__avatar"
              />
            </Link>{" "}
          </>
        ) : (
          <>
            <button
              type="button"
              className="header__register-btn"
              onClick={openRegisterModal}
            >
              Sign Up
            </button>
            <button
              type="button"
              className="header__login-btn"
              onClick={openLoginModal}
            >
              Log In
            </button>
          </>
        )}
      </div>
    </header>
  );
}

export default Header;
