import React, { useEffect, useRef, useState } from "react";

const Weather = () => {
  const inputRef = useRef();
  const [weatherData, setWeatherData] = useState(null);

  const search = async (city) => {
    if (!city.trim()) {
      alert("Please enter a city name");
      return;
    }

    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_API_ID }`;

      const response = await fetch(url);
      const data = await response.json();

      console.log(data);

      if (data.cod !== 200) {
        alert("City not found");
        setWeatherData(null);
        return;
      }

      setWeatherData({
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        temp: Math.round(data.main.temp),
        location: data.name,
        icon: `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
      });
    } catch (error) {
      alert("Error fetching weather data");
      console.error(error);
      setWeatherData(null);
    }

    inputRef.current.value = "";
  };

  useEffect(() => {
    search("Pune");
  }, []);

  return (
    <div className="w-[320px] h-[520px] rounded-2xl bg-linear-to-b from-indigo-600 to-purple-700 p-6 text-white shadow-xl flex flex-col">
      
      {/* Search */}
      <div className="flex items-center gap-3">
        <input
          ref={inputRef}
          type="text"
          placeholder="Search city"
          className="flex-1 px-4 py-2 rounded-full bg-white/30 placeholder-white text-white outline-none"
          onKeyDown={(e) => e.key === "Enter" && search(inputRef.current.value)}
        />
        <button
          className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-black"
          onClick={() => search(inputRef.current.value)}
        >
          🔍
        </button>
      </div>

      {weatherData && (
        <>
          {/* Weather Icon */}
          <div className="flex justify-center mt-14">
            <img
              src={weatherData.icon}
              alt="weather icon"
              className="w-32 h-32"
            />
          </div>

          {/* Temperature */}
          <p className="text-center text-6xl font-light mt-6">
            {weatherData.temp}°C
          </p>

          {/* Location */}
          <p className="text-center font-bold text-2xl mt-1">
            {weatherData.location}
          </p>

          <div className="grow" />

          {/* Humidity */}
          <div className="flex items-center gap-3">
            <span className="text-xl">💧</span>
            <div>
              <p className="text-sm font-medium">{weatherData.humidity}%</p>
              <p className="text-xs opacity-80">Humidity</p>
            </div>
          </div>

          {/* Wind */}
          <div className="flex items-center gap-3 mt-2">
            <span className="text-xl">🌬️</span>
            <div>
              <p className="text-sm font-medium">
                {weatherData.windSpeed} m/s
              </p>
              <p className="text-xs opacity-80">Wind Speed</p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Weather;
