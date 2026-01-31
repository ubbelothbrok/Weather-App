import React from 'react';
import { format } from 'date-fns';
import { getWeatherIcon } from '../utils/weatherUtils';

const ForecastCard = ({ data }) => {
    if (!data || !data.list) return null;

    // Open-Meteo returns daily data directly, no need to filter by time
    // OWM returns 3-hour intervals

    let dailyForecasts = [];

    // Check if data is already daily (from Open-Meteo service) or needs filtering (fallback)
    // My Open-Meteo service structures it with `dt` but without `dt_txt` usually, or just checks structure
    // Simplify: Just take the list and slice 10.

    // If it has dt_txt, it might be OWM data (fallback or mixed), let's assume we are using the new service strictly for now
    // But for robustness:
    if (data.list[0].dt_txt) {
        dailyForecasts = data.list.filter((reading) =>
            reading.dt_txt.includes("12:00:00")
        );
    } else {
        dailyForecasts = data.list;
    }

    const displayedForecasts = dailyForecasts.slice(0, 10);

    return (
        <div className="w-full bg-white/10 backdrop-blur-md rounded-3xl p-6 border border-white/10 h-full">
            <h3 className="text-white font-semibold mb-4 flex items-center sticky top-0">
                <span className="mr-2">📅</span> 10-Day Forecast
            </h3>
            <div className="space-y-3 overflow-y-auto max-h-[400px] pr-2 custom-scrollbar">
                {displayedForecasts.map((day) => (
                    <div key={day.dt} className="flex items-center justify-between hover:bg-white/5 p-2 rounded-xl transition-colors group">
                        <div className="w-20 font-medium text-white">
                            {format(new Date(day.dt * 1000), 'EEE, MMM d')}
                        </div>
                        <div className="flex items-center flex-1 justify-center">
                            <div className="w-8 h-8 mr-2 group-hover:scale-110 transition-transform">
                                {getWeatherIcon(day.weather[0].id)}
                            </div>
                            <span className="text-sm text-white/70 capitalize hidden sm:block">
                                {day.weather[0].main}
                            </span>
                        </div>
                        <div className="text-right w-24 flex justify-end items-center gap-2">
                            <span className="text-white font-bold text-lg">
                                {Math.round(day.main.temp_max || day.main.temp)}°
                            </span>
                            <span className="text-white/50 text-sm">
                                {Math.round(day.main.temp_min)}°
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ForecastCard;
