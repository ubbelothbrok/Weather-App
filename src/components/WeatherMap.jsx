import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icon in React Leaflet
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

const LocationMarker = ({ onLocationSelect }) => {
    const [position, setPosition] = useState(null);

    // Get user's current position on load if available
    useEffect(() => {
        if (navigator.geolocation && !position) {
            navigator.geolocation.getCurrentPosition(
                (pos) => {
                    const { latitude, longitude } = pos.coords;
                    setPosition({ lat: latitude, lng: longitude });
                },
                () => {
                    // Default to London if permission denied
                    setPosition({ lat: 51.505, lng: -0.09 });
                }
            );
        }
    }, []);

    const map = useMapEvents({
        click(e) {
            setPosition(e.latlng);
            onLocationSelect(e.latlng); // Notify parent immediately or wait for confirm
        },
    });

    // Fly to position when it changes initially
    useEffect(() => {
        if (position) {
            map.flyTo(position, map.getZoom());
        }
    }, [position, map]);

    return position === null ? null : (
        <Marker position={position}></Marker>
    );
};

const WeatherMap = ({ onSelect, onClose }) => {
    const [selectedLocation, setSelectedLocation] = useState(null);

    const handleConfirm = () => {
        if (selectedLocation) {
            onSelect(selectedLocation);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
            <div className="bg-white rounded-2xl overflow-hidden w-full max-w-4xl h-[600px] flex flex-col shadow-2xl animate-fade-in-up">
                <div className="p-4 bg-slate-800 text-white flex justify-between items-center">
                    <h2 className="text-xl font-bold">Select Location</h2>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-white/10 rounded-full transition-colors"
                    >
                        ✕
                    </button>
                </div>

                <div className="flex-1 relative">
                    <MapContainer
                        center={[51.505, -0.09]}
                        zoom={13}
                        style={{ height: '100%', width: '100%' }}
                    >
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <LocationMarker onLocationSelect={setSelectedLocation} />
                    </MapContainer>
                </div>

                <div className="p-4 bg-slate-100 flex justify-end gap-3 border-t">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 rounded-lg text-slate-600 hover:bg-slate-200 font-medium transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleConfirm}
                        disabled={!selectedLocation}
                        className={`px-6 py-2 rounded-lg font-bold text-white transition-all ${selectedLocation
                                ? 'bg-blue-600 hover:bg-blue-700 shadow-lg hover:shadow-blue-500/30'
                                : 'bg-gray-400 cursor-not-allowed'
                            }`}
                    >
                        Select Location
                    </button>
                </div>
            </div>
        </div>
    );
};

export default WeatherMap;
