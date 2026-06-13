import React, { useState } from "react";
import "./App.css";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);

  const apiKey = "bed30be2be8d1e4fec2d6f7ac97fe4fe";

  const getWeather = async () => {
    if (!city.trim()) {
      alert("Please enter a city name");
      return;
    }

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
      );

      const data = await response.json();
      console.log(data);

      if (response.ok) {
        setWeather(data);
      } else {
        alert(data.message || "City not found");
        setWeather(null);
      }
    } catch (error) {
      console.error(error);
      alert("Failed to fetch weather data");
    }
  };

  return (
    <div className="App">
      <h1>🌤 Weather App</h1>

      <input
        type="text"
        placeholder="Enter City Name"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />

      <button onClick={getWeather}>Get Weather</button>

      {weather && (
        <div className="weather-card">
          <h2>
            {weather?.name} {weather?.sys?.country ? `, ${weather.sys.country}` : ""}
          </h2>

          <p>🌡 Temperature: {weather?.main?.temp} °C</p>
           <p>💧 Humidity: {weather?.main?.humidity}%</p>
          <p>🌥 Weather: {weather?.weather?.[0]?.main}</p>
         
          
     
        </div>
      )}
    </div>
  );
}

export default App;
