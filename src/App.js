import React, { useState, useEffect, useCallback } from 'react';
import Header from './components/Header';
import CurrentLocation from './components/CurrentLocation';
import HourlyForecast from './components/HourlyForecast';
import DailyForecast from './components/DailyForecast';
import Overview from './components/OverviewHeader';
import axios from 'axios';
import './App.css';

const App = () => {
  const [currentWeatherData, setCurrentWeatherData] = useState(null);
  const [hourlyData, setHourlyData] = useState([]);
  const [dailyData, setDailyData] = useState([]);
  const [monthlyData, setMonthlyData] = useState([]);
  const [savedLocations, setSavedLocations] = useState([]);
  const [error, setError] = useState('');

  const API_KEY = '5062429b52a548e498a91917240807';

  const fetchWeatherData = useCallback(async (location) => {
    try {
      // Fetch current weather data
      const currentWeatherResponse = await axios.get(`https://api.weatherapi.com/v1/current.json`, {
        params: {
          key: API_KEY,
          q: location
        }
      });
      setCurrentWeatherData(currentWeatherResponse.data);

      // Fetch 7-day daily forecast data
      const forecastResponse = await axios.get(`https://api.weatherapi.com/v1/forecast.json`, {
        params: {
          key: API_KEY,
          q: location,
          days: 7
        }
      });
      setHourlyData(forecastResponse.data.forecast.forecastday[0].hour);
      setDailyData(forecastResponse.data.forecast.forecastday);

      // Fetch historical data for each month over the past year
      const monthlyDataPromises = [];
      for (let i = 0; i < 12; i++) {
        const pastDate = new Date();
        pastDate.setMonth(pastDate.getMonth() - i);
        const pastDateString = pastDate.toISOString().split('T')[0];

        monthlyDataPromises.push(
          axios.get(`https://api.weatherapi.com/v1/history.json`, {
            params: {
              key: API_KEY,
              q: location,
              dt: pastDateString
            }
          })
        );
      }

      const monthlyResponses = await Promise.all(monthlyDataPromises);
      const monthlyForecast = monthlyResponses.map(response => response.data.forecast.forecastday[0]);
      setMonthlyData(monthlyForecast);

      setError('');
    } catch (error) {
      console.error('Error fetching weather data:', error.response ? error.response.data : error.message);
      setError('Failed to fetch weather data. Please try again.');
    }
  }, [API_KEY]);

  const handleSearch = useCallback(async (location) => {
    try {
      await fetchWeatherData(location);
    } catch (error) {
      console.error('Error fetching geolocation data:', error.response ? error.response.data : error.message);
      setError('Failed to fetch geolocation data. Please try again.');
    }
  }, [fetchWeatherData]);

  useEffect(() => {
    handleSearch('New York'); // Default location on load
  }, [handleSearch]);

  const handleSaveLocation = (location) => {
    setSavedLocations([...savedLocations, location]);
  };

  const handleSave = async (location) => {
    if (!location) {
      setError('Please enter a valid location.');
      return;
    }
    try {
      const response = await axios.post('/api/location/save', { location });
      setSavedLocations([...savedLocations, response.data]);
      setError('');
    } catch (error) {
      console.error('Error saving location:', error.response ? error.response.data : error.message);
      setError('Failed to save location. Please try again.');
    }
  };

  const handleDelete = async (index, locationId) => {
    try {
      await axios.delete(`/api/location/delete/${locationId}`);
      const updatedLocations = savedLocations.filter((_, i) => i !== index);
      setSavedLocations(updatedLocations);
    } catch (error) {
      console.error('Error deleting location:', error.response ? error.response.data : error.message);
      setError('Failed to delete location. Please try again.');
    }
  };

  return (
    <div>
      <Header onSearch={handleSearch} onSave={handleSave} />
      {error && <span style={{ color: 'red' }}>{error}</span>}
      <CurrentLocation weatherData={currentWeatherData} onSaveLocation={handleSaveLocation} />
      <HourlyForecast hourlyData={hourlyData} />
      <DailyForecast dailyData={dailyData} />
      <Overview monthlyData={monthlyData} />
      <div className="saved-locations">
        {savedLocations.map((loc, index) => (
          <div key={index} className="saved-location">
            <p>{loc}</p>
            <button onClick={() => handleSearch(loc)}>Show Weather</button>
            <button onClick={() => handleDelete(index, loc._id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
