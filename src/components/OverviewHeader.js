import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTemperatureHigh, faCloudSun, faSun, faCloudRain, faDroplet, faWind } from '@fortawesome/free-solid-svg-icons';

const Overview = ({ monthlyData }) => {
  if (!monthlyData || monthlyData.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Monthly Overview</h2>
      <div className="monthly-overview">
        {monthlyData.map((day, index) => (
          <div key={index} className="overview-day">
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

export default Overview;
