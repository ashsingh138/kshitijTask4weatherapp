import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTemperatureHigh, faCloudSun } from '@fortawesome/free-solid-svg-icons';

const HourlyForecast = ({ hourlyData }) => {
  if (!hourlyData || hourlyData.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Hourly Forecast</h2>
      <div className="hourly-forecast">
        {hourlyData.map((hour, index) => (
          <div key={index} className="forecast-hour">
            <p>Time: {new Date(hour.time).toLocaleTimeString()}</p>
            <p>
              <FontAwesomeIcon icon={faTemperatureHigh} /> Temperature: {hour.temp_c}°C
            </p>
            <p>
              <FontAwesomeIcon icon={faCloudSun} /> Condition: {hour.condition.text}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HourlyForecast;
