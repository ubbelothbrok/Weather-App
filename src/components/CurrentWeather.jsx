import React from 'react';
import { format } from 'date-fns';
import { getWeatherIcon } from '../utils/weatherUtils';
import { MapPin } from 'lucide-react';

const CurrentWeather = ({ data }) => {
    if (!data) return null;

    const { name, main, weather, dt, sys, timezone } = data;

    // Calculate local time for the city
    const localTime = new Date((dt + timezone) * 1000 + new Date().getTimezoneOffset() * 60000); // Approximate correction
    const formattedDate = format(new Date(), 'EEEE, d MMMM'); // Using user's current date for simplicity usually matches unless edge cases

    return (
        <div className="flex flex-col items-center justify-center text-white p-6">
            <div className="flex items-center space-x-2 mb-2 bg-white/10 px-4 py-1 rounded-full backdrop-blur-sm">
                <MapPin className="w-4 h-4" />
                <h2 className="text-xl font-semibold tracking-wide">{name}, {sys.country}</h2>
            </div>

            <p className="text-white/80 font-light text-sm mb-6">{formattedDate}</p>

            <div className="w-48 h-48 my-4 drop-shadow-2xl animate-pulse-slow">
                {getWeatherIcon(weather[0].id)}
            </div>

            <div className="text-center">
                <h1 className="text-8xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60">
                    {Math.round(main.temp)}°
                </h1>
                <p className="text-xl capitalize font-medium text-white/90 mt-2">{weather[0].description}</p>
            </div>

            <div className="flex space-x-8 mt-8 w-full max-w-md bg-white/10 rounded-3xl p-4 backdrop-blur-md justify-around">
                <div className="text-center">
                    <p className="text-xs text-white/60 uppercase font-semibold">High</p>
                    <p className="font-bold text-lg">{Math.round(main.temp_max)}°</p>
                </div>
                <div className="text-center">
                    <p className="text-xs text-white/60 uppercase font-semibold">Low</p>
                    <p className="font-bold text-lg">{Math.round(main.temp_min)}°</p>
                </div>
                <div className="text-center">
                    <p className="text-xs text-white/60 uppercase font-semibold">Feels Like</p>
                    <p className="font-bold text-lg">{Math.round(main.feels_like)}°</p>
                </div>
            </div>
        </div>
    );
};

export default CurrentWeather;
