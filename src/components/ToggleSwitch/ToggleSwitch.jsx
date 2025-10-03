import "./ToggleSwitch.css";
import CurrentTemperaturUnitContext from "../../contexts/CurrentTemperaturUnitContext";
import { useState, useEffect, useContext } from "react";

const ToggleSwitch = () => {
  const { currentTemperatureUnit, handleTemperatureUnitToggle } = useContext(
    CurrentTemperaturUnitContext
  );

  const [isChecked, setIsChecked] = useState(currentTemperatureUnit === "C");
  useEffect(
    () => setIsChecked(currentTemperatureUnit === "C"),
    [currentTemperatureUnit]
  );

  return (
    <label className="toggle-switch">
      <input
        checked={isChecked}
        type="checkbox"
        className="toggle-switch__checkbox"
        onChange={handleTemperatureUnitToggle}
        value={isChecked}
      />
      <span className="toggle-switch__circle"> </span>
      <span className="toggle-switch__text toggle-switch__text_F">F</span>
      <span className="toggle-switch__text toggle-switch__text_C">C</span>
    </label>
  );
};

export default ToggleSwitch;
