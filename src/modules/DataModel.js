class WeatherData {
  constructor(
    location,
    temperature,
    description,
    humidity,
    windSpeed,
    forecast
  ) {
    this.location = location;
    this.temperature = temperature;
    this.description = description;
    this.humidity = humidity;
    this.windSpeed = windSpeed;
    this.forecast = forecast;
  }
}

function normalizeWeatherData(apidata) {
  validateWeatherData(apidata);
  return new WeatherData(
    apidata.location,
    apidata.temperature,
    apidata.description,
    apidata.humidity,
    apidata.windSpeed,
    apidata.forecast
  );
}

function validateWeatherData(apidata) {
  if (!apidata.location || !apidata.description) {
    throw new Error("Invalid data from API");
  }
}

function convertTemperature(temp, toUnit) {
  if (toUnit === "F") {
    return (temp * 9) / 5 + 32; //to fahrenheit
  } else if (toUnit === "C") {
    return temp;
  }
}

class WeatherState {
  constructor() {
    this.currentWeather = null;
    this.forcast = [];
    this.unitGroup = "metric";
  }
  setCurrentWeather(data) {
    this.currentWeather = normalizeWeatherData(data);
  }

  setForecast(data) {
    this.forcast = normalizeWeatherData(data).forecast;
  }

  setUnitGroup(unitGroup) {
    this.unitGroup = unitGroup;
  }

  getCurrentWeather() {
    return this.currentWeather;
  }
  getForecast() {
    return this.forcast;
  }
  getUnitGroup() {
    return this.unitGroup;
  }
  convertTemperature(toUnit) {
    if (toUnit === "F") {
      return (this.currentWeather.temperature * 9) / 5 + 32; //to fahrenheit
    } else if (toUnit === "C") {
      return this.currentWeather.temperature;
    }
  }
}
const weatherDataModel = new WeatherState();
export { weatherDataModel };
