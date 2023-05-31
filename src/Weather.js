import React, { useState }  from "react";
import FormattedDate from "./FormattedDate";
import WeatherIcon from "./WeatherIcon";
import WeatherTemperature from "./WeatherTemperature";
import WeatherForecast from "./WeatherForecast";
import axios from "axios";
import "./Weather.css";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Weather(props) {
  const [weatherData, setWeatherData] = useState({ ready: false });
  const [city, setCity] = useState(props.defaultCity);

  function handleResponse(response) {
    console.log(response.data);
    setWeatherData({
      ready: true,
      coordinates: response.data.coord,
      city: response.data.name,
      date: new Date(response.data.dt * 1000),
      description: response.data.weather[0].description,
      icon: response.data.weather[0].icon,
      temperature: response.data.main.temp,
      humidity: response.data.main.humidity,
      wind: response.data.wind.speed,
      feelsLike: response.data.main.feels_like,
      tempMin: response.data.main.temp_min,
      tempMax: response.data.main.temp_max
    });
  }

  function search() {
    const apiKey = "ded93636eb7b5fe9e7d49e20c4422f20";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    axios.get(apiUrl).then(handleResponse);
  }

  function hendleSubmit(event) {
    event.preventDefault()
    search(city);
  }

  function handleCityChange(event) {
    setCity(event.target.value);
  }

  if (weatherData.ready){
    return (
    <div className="Weather">
      <div className="box">
        <div className="container">
          <div className="row">
            <form className="row mb-3" onSubmit={hendleSubmit}>
              <div className="col-5">
                <h1>{weatherData.city}</h1>
                <div className="text-uppercase">
                  <FormattedDate date={weatherData.date} />
                </div>
              </div>
              <div className="col-3 search-window">
                <input
                  type="search"
                  className="form-control"
                  placeholder="Tipe a city..."
                  autocomplete="off"
                  onChange={handleCityChange}
                ></input>
              </div>
              <div className="col search-button">
                <button type="submit" className="btn btn-primary mb-3">
                  Search
                </button>
              </div>
              <div class="col current-button">
              </div>
            </form>
          </div>
          <div className="row align-items-start">
            <div className="col-4">
              <div>
                <WeatherIcon code={weatherData.icon} size={70}/>
              </div>
              <span className="text-capitalize">{weatherData.description}</span>
            </div>
            <div className="col-5">
              <div className="temp-today">
                <WeatherTemperature celsius={weatherData.temperature}/>
              </div>
              Feels Like <span>{Math.round(weatherData.feelsLike)}</span> &deg;
            </div>
            <div className="col p-0">
              &#709; <span>{Math.round(weatherData.tempMin)}</span>&deg; &#708; <span>{Math.round(weatherData.tempMax)}</span>&deg;
              <br />
              Wind: <span>{Math.round(weatherData.wind)}</span> km/h
              <br />
              &#128167; <span>{weatherData.humidity}</span>%
            </div>
          </div>
          <WeatherForecast coordinates={weatherData.coordinates}/>
        </div>
      </div>
    </div>
  );
  } else {
    search();
    return "Loading...";
  }
}
