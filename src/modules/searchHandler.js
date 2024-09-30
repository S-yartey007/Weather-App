import { weatherDataModel } from "./DataModel";
import { UIhandler } from "./UIHandler";
import { WeatherAPI } from "./WeatherAPI";

const Search = (function () {
  function getSearchInput() {
    const location = document.querySelector("#location").value;
    return location;
  }
  function getUnitInput() {
    let unitGroup = document.querySelectorAll("input[name=unit]");
    unitGroup = [...unitGroup];
    const unit = unitGroup.find((input) => input.checked === true).value;
    return unit;
  }

  function validateInput(location) {
    if (!location) {
      UIhandler.displayErrors("Location may be empty");
      return false;
    }
    return true;
  }
  async function handleSearch() {
    const location = getSearchInput();
    const unit = getUnitInput();
    if (!validateInput(location)) return;
    try {
      UIhandler.showLoading();
      const weatherData = await WeatherAPI.getWeatherData(location, unit);
      weatherDataModel.setCurrentWeather(weatherData);
      weatherDataModel.setForecast(weatherData);
      UIhandler.renderCurrentWeather(weatherDataModel.getCurrentWeather());
      UIhandler.renderForecast(weatherDataModel.getForecast());
    } catch (error) {
      UIhandler.displayErrors("Failed to fetch weather data");
    } finally {
      UIhandler.hideLoading();
    }
  }

  function bindSearchEvent() {
    const searchForm = document.querySelector("form");
    searchForm.addEventListener("submit", (e) => {
      e.preventDefault();

      handleSearch();
    });
  }
  bindSearchEvent();
})();

export { Search };
