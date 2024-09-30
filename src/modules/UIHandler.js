import { weatherDataModel } from "./DataModel.js";
import { Search } from "./searchHandler.js";

const UIhandler = (function () {
  const main = document.querySelector("main");

  function renderCurrentWeather(weatherData) {
    const weatherContainer = main.querySelector(".current-weather");
    weatherContainer.innerHTML = "";
    const location = document.createElement("div");
    const temperature = document.createElement("div");
    const description = document.createElement("div");
    weatherContainer.appendChild(location);
    weatherContainer.appendChild(temperature);
    weatherContainer.appendChild(description);
    location.textContent = weatherData.location;
    temperature.textContent = `Temperature : ${
      weatherData.temperature
    }, using ${weatherDataModel.getUnitGroup()} unit group`;
    description.textContent = `Conditions : ${weatherData.description}`;
  }

  function renderForecast(forecastData) {
    const forecastContainer = main.querySelector(".forecast-section");
    forecastContainer.innerHTML = "";

    forecastData.forEach((day) => {
      const dayElem = document.createElement("div");
      dayElem.classList.add("forecast-div");
      dayElem.innerHTML = `
        <h2>${day.date}</h2>
        <p>High: ${day.high}</p>
        <p>Low: ${day.low}</p>
        <p>Humidity: ${day.humidity}</p>
        <p>${day.condition}</p>
        `;
      forecastContainer.appendChild(dayElem);
    });
  }

  function clearUI() {
    const weatherContainer = main.querySelector(".current-weather");
    const forecastContainer = main.querySelector(".forecast-section");
    weatherContainer.innerHTML = "";
    forecastContainer.innerHTML = "";
  }

  function updateWeatherDisplay() {
    const weatherData = weatherDataModel.getCurrentWeather();
    const forecastData = weatherDataModel.getForecast();
    renderCurrentWeather(weatherData);
    renderForecast(forecastData);
  }

  function displayErrors(message) {
    const errorDialog = main.querySelector(".error-dialog");
    const megElement = main.querySelector(".message");
    megElement.textContent = message;
    errorDialog.showModal();
  }

  function showLoading() {
    const loader = main.querySelector(".loading-spinner");
    loader.style.display = "block";
  }

  function hideLoading() {
    const loader = main.querySelector(".loading-spinner");
    loader.style.display = "none";
  }

  return {
    renderCurrentWeather,
    renderForecast,
    displayErrors,
    updateWeatherDisplay,
    showLoading,
    hideLoading,
    clearUI,
  };
})();

export { UIhandler };
