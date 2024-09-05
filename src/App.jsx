import React, { useState } from "react";
import axios from "axios";
import "./app.css";

function formatTime(date) {
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }

  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${hours}:${minutes}`;
}

function formatDay(date) {
  const dayArray = date.getDay();
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const day = days[dayArray];
  return day;
}

function WeatherApp() {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);

  function displayWeatherInfo(response) {
    setWeatherData(response.data);
  }

  function searchCity() {
    const apiKey = "2b5fc755ac2ec59250868b5527df31c4";
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
    axios.get(apiUrl).then(displayWeatherInfo);
  }

  function handleSubmit(event) {
    event.preventDefault();
    searchCity();
  }

  return (
    <>
        
      <main>
     
        <section className="container">
          <div className="row">
            <form className="col" id="search-form" onSubmit={handleSubmit}>
              <h1  className="">cual es tu ciudad ?</h1>
            
                <input
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                 type="text"
                 id="search-input"
                 aria-describedby="searchCity"
                 placeholder="cual es tu ciudad ..."
                 className="search-form"
                 autoComplete="on"
              />
              <button type="submit">buscar</button>
          
            </form>
        
          </div>
        </section>
        <section className="current-weather">
          <div className="container">
            {weatherData && (
              <div className="row">
                <p className="col temp-title" id="current-temperature">
                  {Math.round(weatherData.main.temp)}°
                </p>
                <div className="col todays-info">
                  <h2 id="current-day">Today</h2>
                  <p>{weatherData.weather[0].main} weather</p>
                </div>
                <div className="col d-flex align-items-center side-info">
                  <ul>
                    <li>
                      Humidity: {weatherData.main.humidity}%
                    </li>
                    <li>
                      Wind: {Math.round(weatherData.wind.speed)} km/h
                    </li>
                  </ul>
                </div>
              </div>
            )}
          </div>
          <hr />
        </section>
            
        
           
        {/* 5-day forecast */}
        <section className="container">
          <div className="row week-forecast">
            {/* Repeat the following for each day */}
            <div className="col">
              <h3>Fri</h3>
              <br />
              <img
                src="https://img.icons8.com/color-glass/42/000000/rain.png"
                alt="Rain"
              />
              <br />
              <p className="weather">Rain</p>
              <span>2°</span>
            </div>
            {/* ... Repeat for other days */}

            <div class="col">
              <h3>Sat</h3>
              <br />
              <img src="https://img.icons8.com/color-glass/42/000000/cloud.png" />
              <br />
              <p class="weather">Cloudy</p>
              <span>4°</span>
            </div>
            <div class="col">
              <h3>Sun</h3>
              <br />
              <img src="https://img.icons8.com/color-glass/42/000000/partly-cloudy-day.png" />
              <br />
              <p class="weather">Partly cloudy</p>
              <span>6°</span>
            </div>
            <div class="col">
              <h3>Mon</h3>
              <br />
              <img src="https://img.icons8.com/color-glass/42/000000/sun.png" />
              <br />
              <p class="weather">Sunny</p>
              <span>8°</span>
            </div>
            <div class="col">
              <h3>Tues</h3>
              <br />
              <img src="https://img.icons8.com/color-glass/42/000000/wind.png" />
              <br />
              <p class="weather">Windy</p>
              <span>5°</span>
            </div>
          </div>
        </section>
 

   
      </main>
   

        
    </>
  );
}

export default WeatherApp;
