import React, { useState } from 'react';
import { Search, MapPin, Map } from 'lucide-react';

const SearchBar = ({ onSearch, onLocation, onMapClick }) => {
    const [query, setQuery] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (query.trim()) {
            onSearch(query);
            setQuery('');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="w-full max-w-md relative">
            <div className="relative">
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search city..."
                    className="w-full h-12 pl-12 pr-4 text-white bg-white/20 backdrop-blur-md rounded-full border border-white/30 focus:outline-none focus:border-white/60 placeholder-white/70 shadow-lg transition-all"
                />
                <Search className="absolute left-4 top-3.5 text-white/80 w-5 h-5" />
                <button
                    type="button"
                    onClick={onLocation}
                    className="absolute right-3 top-2 p-1.5 bg-white/20 hover:bg-white/30 rounded-full text-white transition-colors"
                    title="Use current location"
                >
                    <MapPin className="w-4 h-4" />
                </button>
                <button
                    type="button"
                    onClick={onMapClick}
                    className="absolute right-12 top-2 p-1.5 bg-white/20 hover:bg-white/30 rounded-full text-white transition-colors"
                    title="Select on map"
                >
                    <Map className="w-4 h-4" />
                </button>
            </div>
        </form>
    );
};

export default SearchBar;
