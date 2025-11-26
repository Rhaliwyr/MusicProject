import { useState } from 'react';

const SearchBar = ({ onArtistSelect, artists }) => {
    const [query, setQuery] = useState('');
    const [suggestions, setSuggestions] = useState([]);

    const handleSearch = (e) => {
        const value = e.target.value;
        setQuery(value);

        if (value.length > 0) {
            const filtered = artists.filter(artist =>
                artist.name.toLowerCase().startsWith(value.toLowerCase())
            );
            setSuggestions(filtered);
        } else {
            setSuggestions([]);
        }
    };

    const handleSelect = (artist) => {
        setQuery(artist.name);
        setSuggestions([]);
        onArtistSelect(artist);
    };

    return (
        <div className="search-container">
            <input
                type="text"
                value={query}
                onChange={handleSearch}
                placeholder="Search for an artist..."
                className="search-input"
            />
            {suggestions.length > 0 && (
                <ul className="suggestions-list">
                    {suggestions.map(artist => (
                        <li key={artist.id} onClick={() => handleSelect(artist)}>
                            {artist.name}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default SearchBar;
