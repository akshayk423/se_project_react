import "./Header.css";
import avatar from "../../assets/Avatar.png";
import "../ToggleSwitch/ToggleSwitch.jsx";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch.jsx";
import { Link, useNavigate } from "react-router-dom";

const currentDate = new Date().toLocaleString("default", {
  month: "long",
  day: "numeric",
});

const username = "Terrence Tegegne";

function Header({ handleAddGarment, city }) {
  const navigate = useNavigate();
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
        <button
          type="button"
          className="header__add-clothes-btn"
          onClick={handleAddGarment}
        >
          + Add Clothes
        </button>
      </div>

      <Link className="header__user-container" to="/profile">
        <p className="header__username">{username}</p>
        <img src={avatar} alt="user avatar" className="header__avatar" />
      </Link>
    </header>
  );
}

export default Header;
