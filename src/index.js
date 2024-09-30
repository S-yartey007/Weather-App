import { WeatherAPI } from "./modules/WeatherAPI.js";
import { weatherDataModel } from "./modules/DataModel.js";
import { UIhandler } from "./modules/UIHandler.js";
async function AppController() {
  const data = await WeatherAPI.getWeatherData("Accra,Weija");
  weatherDataModel.setCurrentWeather(data);
  weatherDataModel.setForecast(data);
  const weatherData = weatherDataModel.getCurrentWeather();
  UIhandler.renderCurrentWeather(weatherData);
  UIhandler.renderForecast(weatherDataModel.getForecast());
}

AppController();
