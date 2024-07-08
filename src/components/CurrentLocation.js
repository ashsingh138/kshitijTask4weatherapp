import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTemperatureHigh, faCloudSun, faSun, faDroplet, faWind } from '@fortawesome/free-solid-svg-icons';

const CurrentLocation = ({ weatherData, onSaveLocation }) => {
  if (!weatherData) {
    return <div>Loading...</div>;
  }

  const { name, localtime } = weatherData.location;
  const { temp_c, condition, uv, humidity, wind_kph } = weatherData.current;

  const handleSaveLocation = () => {
    onSaveLocation(name);
  };

  return (
    <div>
      <h2>Current Weather in {name}</h2>
      <p>Date and Time: {localtime}</p>
      <div className="current-weather">
        <p>
          <FontAwesomeIcon icon={faTemperatureHigh} /> Temperature: {temp_c}°C
        </p>
        <p>
          <FontAwesomeIcon icon={faCloudSun} /> Condition: {condition.text}
        </p>
        <p>
          <FontAwesomeIcon icon={faSun} /> UV Index: {uv}
        </p>
        <p>
          <FontAwesomeIcon icon={faDroplet} /> Humidity: {humidity}%
        </p>
        <p>
          <FontAwesomeIcon icon={faWind} /> Wind Speed: {wind_kph} kph
        </p>
      </div>
      <button onClick={handleSaveLocation}>Save Location</button>
    </div>
  );
};

export default CurrentLocation;
