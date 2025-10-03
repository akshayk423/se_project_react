import WeatherCard from "../components/WeatherCard/WeatherCard";
import { weatherCardURLs } from "./weatherCardURLs";

const APIkey = import.meta.env.VITE_WEATHER_API_KEY;

export const fetchWeatherData = ({ latitude, longitude }) => {
  return fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${APIkey}`
  ).then((res) => {
    if (res.ok) {
      return res.json();
    } else return Promise.reject(`Error: ${res.status}`);
  });
};

export const filterWeatherData = (data) => {
  const weatherData = {};

  weatherData.city = data.name;
  weatherData.temp = {};
  weatherData.temp.f = Math.floor(data.main.temp);
  weatherData.temp.c = Math.round(((data.main.temp - 32) * 5) / 9);
  weatherData.type = getWeatherType(weatherData.temp);
  weatherData.condition = getCondition(data.weather[0].id);
  weatherData.isDay = isDay(data.sys, Date.now());
  weatherData.cardURL = getCardURL(weatherData.isDay, weatherData.condition);

  return weatherData;
};

const getWeatherType = (temperature) => {
  if (temperature >= 86) {
    return "hot";
  } else if (temperature >= 66 && temperature < 86) {
    return "warm";
  } else {
    return "cold";
  }
};

const isDay = ({ sunrise, sunset }, now) => {
  return sunrise * 1000 < now && sunset * 1000 > now;
};

const getCardURL = (day, category) => {
  const res = weatherCardURLs.filter((item) => item.category == category);
  if (day) return res[0].day;
  else return res[0].night;
};

const getCondition = (id) => {
  if (id >= 200 && id < 300) return "thunderstorm";

  if ((id >= 300 && id < 400) || (id >= 500 && id < 600)) return "rain";

  if (id >= 600 && id < 700) {
    return "snow";
  }

  if (id >= 700 && id < 800) {
    return "atmosphere";
  }
  if (id > 800 && id < 900) {
    return "clouds";
  }
  return "clear";
};
