import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './WeatherComponent.css';

const WeatherComponent = () => {
    const API_KEY = 'd1e89e840b284ea499594437241103';
    const [cityName, setCityName] = useState('');
    const [weatherData, setWeatherData] = useState(null);
    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);

    useEffect(() => {
        navigator.geolocation.getCurrentPosition((position) => {
            setLatitude(position.coords.latitude);
            setLongitude(position.coords.longitude);
        });
    }, []);

    useEffect(() => {
        if (latitude && longitude) {
            fetchCurrentWeather();
        }
    }, [latitude, longitude]);

    const fetchCurrentWeather = async () => {
        try {
            const response = await axios.get(`https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${latitude},${longitude}`);
            console.log(response.data);
            setWeatherData(response.data);
        } catch (error) {
            console.error('Error fetching weather data:', error);
        }
    };

    const handleCityName = (event) => {
        setCityName(event.target.value);
    };

    const getCityWeather = async () => {
        try {
            const response = await axios.get(`https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${cityName}`);
            console.log(response.data);
            setWeatherData(response.data);
        } catch (error) {
            console.error('Error fetching city weather data:', error);
        }
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            getCityWeather();
        }
    };

    return (
        <div className="container">
            <div className="search">
                <div className="search-box">
                    <i className="fas fa-search search-icon"></i>
                    <input
                        placeholder='Enter the city'
                        value={cityName}
                        onChange={handleCityName}
                        onKeyDown={handleKeyDown} />
                </div>
                <button onClick={getCityWeather}>Get Weather</button>
            </div>
            {weatherData && (
                <div className="weather-info">
                    <h2>{weatherData.location.name}, {weatherData.location.region}, {weatherData.location.country}</h2>
                    <div className="weather-details">
                        <p><i className="fas fa-cloud-sun"></i> {weatherData.current.condition.text}</p>
                        <p><i className="fas fa-thermometer-half"></i> {weatherData.current.temp_c}°C</p>
                        <p><i className="fas fa-wind"></i> Wind: {weatherData.current.wind_kph} km/h</p>
                        <p><i className="fas fa-map-marker-alt"></i> Latitude: {latitude}, Longitude: {longitude}</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default WeatherComponent;
