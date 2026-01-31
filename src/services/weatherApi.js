const API_KEY = "839e7f0fac9bf535bae0a12f96ba765e";
const BASE_URL = "https://api.openweathermap.org/data/2.5";

export const getCurrentWeather = async (city) => {
    try {
        const response = await fetch(
            `${BASE_URL}/weather?q=${city}&units=metric&appid=${API_KEY}`
        );
        if (!response.ok) {
            throw new Error("City not found");
        }
        return await response.json();
    } catch (error) {
        throw error;
    }
};

export const getForecast = async (city) => {
    try {
        // Note: The free API returns 5 day / 3 hour forecast.
        const response = await fetch(
            `${BASE_URL}/forecast?q=${city}&units=metric&appid=${API_KEY}`
        );
        if (!response.ok) {
            throw new Error("City not found");
        }
        return await response.json();
    } catch (error) {
        throw error;
    }
};


export const getAirQuality = async (lat, lon) => {
    try {
        const response = await fetch(
            `${BASE_URL}/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`
        );
        if (!response.ok) {
            throw new Error("Failed to fetch AQI data");
        }
        return await response.json();
    } catch (error) {
        throw error;
    }
};

export const getWeatherByCoords = async (lat, lon) => {
    try {
        const currentResponse = await fetch(
            `${BASE_URL}/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
        );
        const forecastResponse = await fetch(
            `${BASE_URL}/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
        );
        const aqiResponse = await fetch(
            `${BASE_URL}/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`
        );

        if (!currentResponse.ok || !forecastResponse.ok) {
            throw new Error("Failed to fetch weather data");
        }

        const current = await currentResponse.json();
        const forecast = await forecastResponse.json();
        const aqi = aqiResponse.ok ? await aqiResponse.json() : null;

        return { current, forecast, aqi };
    } catch (error) {
        throw error;
    }
}

