import React, { useState } from "react";
import "./App.css";

const API_KEY = process.env.REACT_APP_API_KEY;
console.log("API Key:", API_KEY);

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  const getWeather = async () => {
    if (!city) return;

    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric&lang=sh`
      );
      const data = await res.json();

      if (data.cod === "404") {
        setError("Qyteti nuk u gjet!");
        setWeather(null);
      } else {
        setWeather(data);
        setError("");
      }
    } catch (err) {
      setError("Gabim gjatë marrjes së të dhënave.");
      setWeather(null);
    }
  };
  
  const handleSubmit = (e) => {
    e.preventDefault(); 
    getWeather();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="container">
        <h1 className="title">⛅ Aplikacioni i Motit</h1>
        <div className="search-box">
          <input
            type="text"
            placeholder="Shkruaj qytetin..."
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <button type="submit">🔍 Kërko</button>
        </div>

        {error && <p className="error">{error}</p>}

        {weather && (
          <div className="weather-box">
            <h2>{weather.name}</h2>
            <p className="description">{weather.weather?.[0]?.description}</p>
            <p className="temp">{weather.main?.temp}°C</p>
            <p>💧 Lagështia: {weather.main?.humidity}%</p>
            <p>🌬️ Era: {weather.wind?.speed} m/s</p>
          </div>
        )}
      </div>
    </form>
  );
}

export default App;
