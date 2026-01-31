import React from 'react';
import { Cloud, CloudRain, CloudSnow, CloudLightning, Sun, CloudDrizzle, CloudFog } from 'lucide-react';

export const getWeatherIcon = (weatherId) => {
    if (weatherId >= 200 && weatherId < 300) return <CloudLightning className="w-full h-full text-yellow-400" />;
    if (weatherId >= 300 && weatherId < 500) return <CloudDrizzle className="w-full h-full text-blue-300" />;
    if (weatherId >= 500 && weatherId < 600) return <CloudRain className="w-full h-full text-blue-500" />;
    if (weatherId >= 600 && weatherId < 700) return <CloudSnow className="w-full h-full text-white" />;
    if (weatherId >= 700 && weatherId < 800) return <CloudFog className="w-full h-full text-gray-300" />;
    if (weatherId === 800) return <Sun className="w-full h-full text-orange-400" />;
    if (weatherId > 800) return <Cloud className="w-full h-full text-gray-200" />;
    return <Cloud className="w-full h-full text-gray-200" />;
};

export const formatTime = (timestamp, timezoneOffset) => {
    // Timestamp is in seconds, timezoneOffset is in seconds
    const date = new Date((timestamp + timezoneOffset) * 1000);
    // Be careful with JS dates and manual offsets, simpler is usually relying on direct UTC helpers or just local time of user + string manipulation.
    // However, to show "Local time of City", we need to adjust.
    // The previous app used moment.js.
    // Date object is created in local system timezone.
    // We want to construct a date that represents the time at the location.

    // Quick hack for display:
    const utcTime = date.getTime() + (date.getTimezoneOffset() * 60000);
    const placeTime = new Date(utcTime + (timezoneOffset * 1000));
    return placeTime;
};

export const getWeatherBackgroundImage = (weatherId) => {
    // Unsplash source URLs for high quality weather images
    const images = {
        thunderstorm: 'https://images.unsplash.com/photo-1605727216801-e27ce1d0cc28?q=80&w=1920&auto=format&fit=crop', // Lightning
        drizzle: 'https://images.unsplash.com/photo-1541913485800-4b9538c82352?q=80&w=1920&auto=format&fit=crop', // Rainy window
        rain: 'https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?q=80&w=1920&auto=format&fit=crop', // Rain on glass
        snow: 'https://images.unsplash.com/photo-1491002052546-bf38f186af56?q=80&w=1920&auto=format&fit=crop', // Winter landscape
        atmosphere: 'https://images.unsplash.com/photo-1487621167305-5d248087c724?q=80&w=1920&auto=format&fit=crop', // Fog/Mist
        clear: 'https://images.unsplash.com/photo-1601297183305-6df142704ea2?q=80&w=1920&auto=format&fit=crop', // Blue sky
        clouds: 'https://images.unsplash.com/photo-1534088568595-a066f410bcda?q=80&w=1920&auto=format&fit=crop', // Cloudy sky
        default: 'https://images.unsplash.com/photo-1601297183305-6df142704ea2?q=80&w=1920&auto=format&fit=crop'
    };

    if (weatherId >= 200 && weatherId < 300) return images.thunderstorm;
    if (weatherId >= 300 && weatherId < 500) return images.drizzle;
    if (weatherId >= 500 && weatherId < 600) return images.rain;
    if (weatherId >= 600 && weatherId < 700) return images.snow;
    if (weatherId >= 700 && weatherId < 800) return images.atmosphere;
    if (weatherId === 800) return images.clear;
    if (weatherId > 800) return images.clouds;
    return images.default;
};


