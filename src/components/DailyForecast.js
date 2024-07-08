import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTemperatureHigh, faCloudSun, faSun, faCloudRain, faDroplet, faWind } from '@fortawesome/free-solid-svg-icons';

const DailyForecast = ({ dailyData }) => {
  if (!dailyData || dailyData.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>7-Day Forecast</h2>
      <div className="daily-forecast">
        {dailyData.map((day, index) => (
          <div key={index} className="forecast-day">
            <p>Date: {day.date}</p>
            <p>
              <FontAwesomeIcon icon={faTemperatureHigh} /> Temperature: {day.day.avgtemp_c}°C
            </p>
            <p>
              <FontAwesomeIcon icon={faCloudSun} /> Condition: {day.day.condition.text}
            </p>
            <p>
              <FontAwesomeIcon icon={faSun} /> UV Index: {day.day.uv}
            </p>
            <p>
              <FontAwesomeIcon icon={faCloudRain} /> Rainfall: {day.day.daily_chance_of_rain}%
            </p>
            <p>
              <FontAwesomeIcon icon={faDroplet} /> Humidity: {day.day.avghumidity}%
            </p>
            <p>
              <FontAwesomeIcon icon={faWind} /> Wind Speed: {day.day.maxwind_kph} kph
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DailyForecast;
