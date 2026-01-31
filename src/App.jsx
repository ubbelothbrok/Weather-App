import React, { useState, useEffect } from 'react';
import SearchBar from './components/SearchBar';
import CurrentWeather from './components/CurrentWeather';
import WeatherDetails from './components/WeatherDetails';
import ForecastCard from './components/ForecastCard';
import WeatherMap from './components/WeatherMap';
import { getCurrentWeather, getWeatherByCoords, getAirQuality } from './services/weatherApi';
import { getTenDayForecast } from './services/openMeteoApi';
import { getWeatherBackgroundImage } from './utils/weatherUtils';
import { Loader2, AlertCircle } from 'lucide-react';

function App() {
    const [weather, setWeather] = useState(null);
    const [forecast, setForecast] = useState(null);
    const [aqi, setAqi] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [bgImage, setBgImage] = useState('');
    const [showMap, setShowMap] = useState(false);

    useEffect(() => {
        // Try to get location on first load
        handleLocationClick();
    }, []);

    useEffect(() => {
        if (weather) {
            updateBackground(weather.weather[0].id);
        }
    }, [weather]);

    const updateBackground = (weatherId) => {
        const image = getWeatherBackgroundImage(weatherId);
        setBgImage(image);
    };

    const fetchWeather = async (city) => {
        setLoading(true);
        setError(null);
        try {
            const weatherData = await getCurrentWeather(city);
            // Use coordinates from weatherData to get 10-day forecast
            const forecastData = await getTenDayForecast(weatherData.coord.lat, weatherData.coord.lon);
            const aqiData = await getAirQuality(weatherData.coord.lat, weatherData.coord.lon);

            setWeather(weatherData);
            setForecast(forecastData);
            setAqi(aqiData);
        } catch (err) {
            setError("City not found. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleLocationClick = () => {
        setLoading(true);
        setError(null);
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    try {
                        const { latitude, longitude } = position.coords;

                        // Fetch Current + AQI from OWM, Forecast from Open-Meteo
                        const { current, aqi } = await getWeatherByCoords(latitude, longitude);
                        const forecast = await getTenDayForecast(latitude, longitude);

                        setWeather(current);
                        setForecast(forecast);
                        setAqi(aqi);
                    } catch (err) {
                        setError("Failed to fetch location data.");
                        // Fallback to default
                        fetchWeather("New York");
                    } finally {
                        setLoading(false);
                    }
                },
                (err) => {
                    setError("Location access denied. Showing default city.");
                    fetchWeather("New York");
                }
            );
        } else {
            setError("Geolocation is not supported by this browser.");
            fetchWeather("New York");
        }
    };


    const handleMapSelect = async (location) => {
        setShowMap(false);
        setLoading(true);
        setError(null);
        try {
            const { current, aqi } = await getWeatherByCoords(location.lat, location.lng);
            const forecast = await getTenDayForecast(location.lat, location.lng);

            setWeather(current);
            setForecast(forecast);
            setAqi(aqi);
        } catch (err) {
            setError("Failed to fetch weather for selected location.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            className="min-h-screen w-full flex flex-col items-center py-8 px-4 font-sans transition-all duration-1000 bg-cover bg-center bg-no-repeat relative"
            style={{ backgroundImage: `url(${bgImage})` }}
        >
            {/* Overlay for better text visibility */}
            <div className="absolute inset-0 bg-black/40 z-0"></div>

            <div className="w-full max-w-6xl flex flex-col items-center space-y-8 relative z-10">

                {/* Header / Search */}
                <header className="w-full flex justify-between items-center p-4">
                    <div className="flex-1 max-w-md mx-auto relative">
                        <SearchBar
                            onSearch={fetchWeather}
                            onLocation={handleLocationClick}
                            onMapClick={() => setShowMap(true)}
                        />
                        {error && (
                            <div className="absolute top-14 left-0 right-0 flex items-center text-red-100 bg-red-900/60 px-4 py-2 rounded-lg backdrop-blur-md animate-pulse border border-red-500/30">
                                <AlertCircle className="w-4 h-4 mr-2" />
                                <span className="text-sm font-medium">{error}</span>
                            </div>
                        )}
                    </div>
                </header>

                {showMap && (
                    <WeatherMap
                        onSelect={handleMapSelect}
                        onClose={() => setShowMap(false)}
                    />
                )}

                {loading ? (
                    <div className="flex-1 flex items-center justify-center min-h-[50vh]">
                        <Loader2 className="w-12 h-12 text-white animate-spin" />
                    </div>
                ) : (
                    weather && (
                        <div className="w-full flex flex-col gap-6 animate-fade-in-up px-4">

                            {/* Top Section: Main Weather & Forecast */}
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                                {/* Current Weather Card - Takes 1 column */}
                                <div className="lg:col-span-1 flex justify-center lg:justify-start">
                                    <CurrentWeather data={weather} />
                                </div>

                                {/* Forecast Card - Takes 2 columns */}
                                <div className="lg:col-span-2 w-full">
                                    <ForecastCard data={forecast} />
                                </div>
                            </div>

                            {/* Bottom Section: Highlights */}
                            <div className="w-full">
                                <h3 className="text-white/90 text-xl font-bold mb-4 px-2">Today's Highlights</h3>
                                <WeatherDetails data={weather} aqi={aqi} />
                            </div>

                        </div>
                    )
                )}
            </div>

            <footer className="mt-12 text-white/40 text-xs text-center">
                <p>Built with React, Tailwind & Vite • Weather Data by OpenWeatherMap</p>
            </footer>
        </div>
    );
}

export default App;
