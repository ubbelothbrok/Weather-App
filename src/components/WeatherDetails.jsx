import React from 'react';
import { Wind, Droplets, Eye, Gauge, Sunrise, Sunset, Activity } from 'lucide-react';
import { formatTime } from '../utils/weatherUtils';

const DetailCard = ({ icon: Icon, title, value, unit, color = "text-white" }) => (
    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 flex flex-col items-center justify-center border border-white/10 hover:bg-white/20 hover:scale-105 transition-all duration-300 animate-fade-in group cursor-default">
        <div className="bg-white/20 p-2 rounded-full mb-2 group-hover:rotate-12 transition-transform duration-300">
            <Icon className={`w-5 h-5 ${color}`} />
        </div>
        <p className="text-white/60 text-xs font-medium uppercase mb-1">{title}</p>
        <p className="text-white text-lg font-bold text-center leading-tight">
            {value} <span className="text-xs font-normal text-white/70">{unit}</span>
        </p>
    </div>
);

const getAqiDescription = (aqi) => {
    switch (aqi) {
        case 1: return { text: "Good", color: "text-green-400" };
        case 2: return { text: "Fair", color: "text-lime-400" };
        case 3: return { text: "Moderate", color: "text-yellow-400" };
        case 4: return { text: "Poor", color: "text-orange-400" };
        case 5: return { text: "Very Poor", color: "text-red-400" };
        default: return { text: "Unknown", color: "text-gray-400" };
    }
};

const WeatherDetails = ({ data, aqi }) => {
    if (!data) return null;
    const { wind, main, visibility, sys, timezone } = data;

    // Helper to format time
    const getTime = (timestamp) => {
        const date = formatTime(timestamp, timezone);
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    const aqiData = aqi?.list?.[0]?.main?.aqi;
    const { text: aqiText, color: aqiColor } = getAqiDescription(aqiData);

    return (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full">
            <DetailCard icon={Wind} title="Wind Speed" value={wind.speed} unit="m/s" />
            <DetailCard icon={Droplets} title="Humidity" value={main.humidity} unit="%" />
            <DetailCard icon={Eye} title="Visibility" value={(visibility / 1000).toFixed(1)} unit="km" />
            <DetailCard icon={Gauge} title="Pressure" value={main.pressure} unit="hPa" />

            <DetailCard icon={Sunrise} title="Sunrise" value={getTime(sys.sunrise)} unit="" color="text-yellow-300" />
            <DetailCard icon={Sunset} title="Sunset" value={getTime(sys.sunset)} unit="" color="text-orange-300" />

            {aqiData && (
                <div className="col-span-2 md:col-span-2">
                    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 flex items-center justify-between border border-white/10 hover:bg-white/20 transition-all duration-300 animate-fade-in h-full">
                        <div className="flex items-center space-x-3">
                            <div className="bg-white/20 p-2 rounded-full">
                                <Activity className={`w-5 h-5 ${aqiColor}`} />
                            </div>
                            <div className="flex flex-col">
                                <p className="text-white/60 text-xs font-medium uppercase">Air Quality</p>
                                <p className={`text-lg font-bold ${aqiColor}`}>{aqiText}</p>
                            </div>
                        </div>
                        <div className="text-right">
                            <p className="text-white/40 text-[10px] uppercase tracking-wider">Index</p>
                            <p className="text-2xl font-bold text-white">{aqiData}</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default WeatherDetails;
