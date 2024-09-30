import { weatherDataModel } from "./DataModel.js";
import { UIhandler } from "./UIHandler.js";
const WeatherAPI = (function weatherAPI() {
  function buildUrl(location, unit) {
    const API_KEY = "YVCJAP7KPRB8ZPY38Z6QGYQ8C";
    return `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=${unit}&key=${API_KEY}`;
  }

  async function getWeatherData(location, unitGroup = "metric") {
    weatherDataModel.setUnitGroup(unitGroup);
    const url = buildUrl(location, unitGroup === "metric" ? "metric" : "us");
    try {
      UIhandler.showLoading();
      UIhandler.clearUI();
      const response = await fetch(url, { mode: "cors" });
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
      const body = await response.json();
      console.log(body);
      return dataParser(body);
    } catch (error) {
      console.error(error);
      UIhandler.displayErrors(errorHandler(error));
    } finally {
      UIhandler.hideLoading();
    }
  }
  function errorHandler(error) {
    if (error.message.includes("Network")) {
      return "Network error, please check your connection";
    } else if (error.message.includes("404")) {
      return "Location not found. Please a try a different search";
    } else {
      return "An unexpected error occured.";
    }
  }
  function dataParser(data) {
    return {
      location: data.address,
      temperature: data.currentConditions.temp,
      description: data.currentConditions.conditions,
      humidity: data.currentConditions.humidity,
      windspeed: data.currentConditions.windspeed,
      forecast: data.days.map((day) => ({
        date: day.datetime,
        high: day.tempmax,
        low: day.tempmin,
        humidity: day.humidity,
        condition: day.conditions,
      })),
    };
  }

  return {
    getWeatherData,
  };
})();

export { WeatherAPI };
