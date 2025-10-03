import "./Header.css";
import avatar from "../../assets/Avatar.png";
import "../ToggleSwitch/ToggleSwitch.jsx";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch.jsx";

const currentDate = new Date().toLocaleString("default", {
  month: "long",
  day: "numeric",
});

function Header({ handleAddGarment, city }) {
  return (
    <header className="header">
      <p className="header__logo">wtwr°</p>
      <p className="header__date-and-location">
        {currentDate}, {city}
      </p>
      <div className="header__buttons">
        <ToggleSwitch />
        <button
          type="button"
          className="header__add-clothes-btn"
          onClick={handleAddGarment}
        >
          + Add Clothes
        </button>
      </div>

      <div className="header__user-container">
        <p className="header__username">Terrence Tegegne</p>
        <img src={avatar} alt="user avatar" className="header__avatar" />
      </div>
    </header>
  );
}

export default Header;
