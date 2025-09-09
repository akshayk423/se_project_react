import "./Header.css";
import avatar from "../../assets/Avatar.png";

const currentDate = new Date().toLocaleString("default", {
  month: "long",
  day: "numeric",
});

function Header({ handleAddGarmet }) {
  return (
    <header className="header">
      <p className="header__logo">wtwr°</p>
      <p className="header__date-and-location">{currentDate}, New York</p>
      <button
        type="button"
        className="header__add-clothes-btn"
        onClick={handleAddGarmet}
      >
        + Add Clothes
      </button>
      <div className="header__user-container">
        <p className="header__username">Terrence Tegegne</p>
        <img src={avatar} alt="user avatar" className="header__avatar" />
      </div>
    </header>
  );
}

export default Header;
