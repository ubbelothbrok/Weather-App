
// WMO Weather interpretation codes (WW)
const getWeatherConditionByCode = (code) => {
    // 0: Clear sky
    if (code === 0) return { main: 'Clear', description: 'Clear sky', icon: '01d' };

    // 1, 2, 3: Mainly clear, partly cloudy, and overcast
    if (code >= 1 && code <= 3) return { main: 'Clouds', description: 'Partly cloudy', icon: '03d' };

    // 45, 48: Fog and depositing rime fog
    if (code === 45 || code === 48) return { main: 'Mist', description: 'Fog', icon: '50d' };

    // 51, 53, 55: Drizzle: Light, moderate, and dense intensity
    // 56, 57: Freezing Drizzle: Light and dense intensity
    if (code >= 51 && code <= 57) return { main: 'Drizzle', description: 'Drizzle', icon: '09d' };

    // 61, 63, 65: Rain: Slight, moderate and heavy intensity
    // 66, 67: Freezing Rain: Light and heavy intensity
    // 80, 81, 82: Rain showers: Slight, moderate, and violent
    if ((code >= 61 && code <= 67) || (code >= 80 && code <= 82)) return { main: 'Rain', description: 'Rain', icon: '10d' };

    // 71, 73, 75: Snow fall: Slight, moderate, and heavy intensity
    // 77: Snow grains
    // 85, 86: Snow showers slight and heavy
    if ((code >= 71 && code <= 77) || (code >= 85 && code <= 86)) return { main: 'Snow', description: 'Snow', icon: '13d' };

    // 95: Thunderstorm: Slight or moderate
    // 96, 99: Thunderstorm with slight and heavy hail
    if (code >= 95 && code <= 99) return { main: 'Thunderstorm', description: 'Thunderstorm', icon: '11d' };

    return { main: 'Clear', description: 'Clear sky', icon: '01d' };
};

export const getTenDayForecast = async (lat, lon) => {
    try {
        const response = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=auto&forecast_days=10`
        );

        if (!response.ok) {
            throw new Error("Failed to fetch forecast data");
        }

        const data = await response.json();

        // Transform Open-Meteo data structure to match our app's expected format (somewhat) implies a list of days
        /*
          Open-Meteo returns:
          {
            daily: {
              time: ["2024-01-01", ...],
              temperature_2m_max: [10.5, ...],
              temperature_2m_min: [5.2, ...],
              weather_code: [3, ...]
            }
          }
        */

        const dailyList = data.daily.time.map((date, index) => {
            const code = data.daily.weather_code[index];
            const condition = getWeatherConditionByCode(code);

            return {
                dt: new Date(date).getTime() / 1000, // Unix timestamp in seconds
                main: {
                    temp_max: data.daily.temperature_2m_max[index],
                    temp_min: data.daily.temperature_2m_min[index],
                },
                weather: [
                    {
                        id: code === 0 ? 800 : code * 10, // Rough mapping for ID based background logic if needed, or we just trust 'main'
                        main: condition.main,
                        description: condition.description,
                        icon: condition.icon
                    }
                ]
            };
        });

        return { list: dailyList };

    } catch (error) {
        throw error;
    }
};
