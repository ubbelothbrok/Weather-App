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

const calculateAQI = (pm25) => {
    // US EPA AQI Calculation for PM2.5
    // Breakpoints: [0, 12.0], [12.1, 35.4], [35.5, 55.4], [55.5, 150.4], [150.5, 250.4], [250.5, 350.4], [350.5, 500.4]
    // AQI Ranges: [0, 50], [51, 100], [101, 150], [151, 200], [201, 300], [301, 400], [401, 500]

    const calc = (Cp, Ih, Il, BPh, BPl) => Math.round(((Ih - Il) / (BPh - BPl)) * (Cp - BPl) + Il);

    if (pm25 <= 12.0) return calc(pm25, 50, 0, 12.0, 0);
    if (pm25 <= 35.4) return calc(pm25, 100, 51, 35.4, 12.1);
    if (pm25 <= 55.4) return calc(pm25, 150, 101, 55.4, 35.5);
    if (pm25 <= 150.4) return calc(pm25, 200, 151, 150.4, 55.5);
    if (pm25 <= 250.4) return calc(pm25, 300, 201, 250.4, 150.5);
    if (pm25 <= 350.4) return calc(pm25, 400, 301, 350.4, 250.5);
    if (pm25 <= 500.4) return calc(pm25, 500, 401, 500.4, 350.5);
    return 500;
};

const getAqiDescription = (aqiValue) => {
    if (aqiValue <= 50) return { text: "Good", color: "text-green-400" };
    if (aqiValue <= 100) return { text: "Moderate", color: "text-yellow-400" };
    if (aqiValue <= 150) return { text: "Unhealthy for Sensitive Groups", color: "text-orange-400" };
    if (aqiValue <= 200) return { text: "Unhealthy", color: "text-red-400" };
    if (aqiValue <= 300) return { text: "Very Unhealthy", color: "text-purple-400" };
    return { text: "Hazardous", color: "text-rose-900" };
};

const WeatherDetails = ({ data, aqi }) => {
    if (!data) return null;
    const { wind, main, visibility, sys, timezone } = data;

    // Helper to format time in IST
    const getTime = (timestamp) => {
        // Convert timestamp to milliseconds
        const date = new Date(timestamp * 1000);
        return date.toLocaleTimeString('en-IN', {
            hour: '2-digit',
            minute: '2-digit',
            timeZone: 'Asia/Kolkata'
        });
    };

    const pm25 = aqi?.list?.[0]?.components?.pm2_5;
    const aqiValue = (pm25 !== undefined && pm25 !== null) ? calculateAQI(pm25) : null;
    const { text: aqiText, color: aqiColor } = aqiValue !== null ? getAqiDescription(aqiValue) : { text: "Unknown", color: "text-gray-400" };

    return (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full">
            <DetailCard icon={Wind} title="Wind Speed" value={(wind.speed * 3.6).toFixed(1)} unit="km/h" />
            <DetailCard icon={Droplets} title="Humidity" value={main.humidity} unit="%" />
            <DetailCard icon={Eye} title="Visibility" value={(visibility / 1000).toFixed(1)} unit="km" />
            <DetailCard icon={Gauge} title="Pressure" value={main.pressure} unit="hPa" />

            <DetailCard icon={Sunrise} title="Sunrise" value={getTime(sys.sunrise)} unit="" color="text-yellow-300" />
            <DetailCard icon={Sunset} title="Sunset" value={getTime(sys.sunset)} unit="" color="text-orange-300" />

            {aqiValue !== null && (
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
                            <p className="text-white/40 text-[10px] uppercase tracking-wider">PM2.5: {pm25.toFixed(1)}</p>
                            <p className="text-2xl font-bold text-white">{aqiValue}</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default WeatherDetails;
