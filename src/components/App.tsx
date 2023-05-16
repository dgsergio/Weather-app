import React, { useEffect, useState } from 'react';
import { Forecast } from '../App.model';
import useFetch from '../hooks/useFetch';

interface Weather {
  windspeed: string;
  temperature: string;
  isDay: boolean;
}

const App = () => {
  const [weather, setWeather] = useState<Weather>();
  const { sendRequest, status } = useFetch();

  const transformData = (data: Forecast): void => {
    setWeather({
      isDay: data.current_weather.is_day === 1 ? true : false,
      temperature: data.current_weather.temperature.toString(),
      windspeed: data.current_weather.windspeed.toString(),
    });
  };

  useEffect(() => {
    sendRequest(
      'https://api.open-meteo.com/v1/forecast?latitude=36.81&longitude=-2.57&current_weather=true',
      transformData
    );
  }, []);

  return (
    <>
      {status.lodaing && <div>Loading...</div>}
      {!status.lodaing && status.error && (
        <div style={{ color: 'red' }}>{status.error}</div>
      )}
      {weather && !status.lodaing && !status.error && (
        <div className={weather.isDay ? 'card day' : 'card'}>
          <h1>Weather App</h1>
          <div>
            <div className="temperature">
              <p>Current temperature</p>
              <span>{weather.temperature} °C</span>
            </div>
            <div className="windspeed">
              <p>Wind speed</p>
              <span>{weather.windspeed} km/h</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default App;
