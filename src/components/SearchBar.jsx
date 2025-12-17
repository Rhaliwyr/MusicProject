import { useState, useRef, useEffect } from 'react';

const SearchBar = ({ onArtistSelect, artists }) => {
    const [query, setQuery] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const searchRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (searchRef.current && !searchRef.current.contains(event.target)) {
                setShowSuggestions(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleSearch = (e) => {
        const value = e.target.value;
        setQuery(value);
        setShowSuggestions(true);

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
        setShowSuggestions(false);
        onArtistSelect(artist);
    };

    const handleFocus = () => {
        setShowSuggestions(true);
        // Re-trigger search logic if query exists but suggestions were empty/closed
        if (query.length > 0) {
            const filtered = artists.filter(artist =>
                artist.name.toLowerCase().startsWith(query.toLowerCase())
            );
            setSuggestions(filtered);
        }
    };

    return (
        <div className="search-container" ref={searchRef}>
            <input
                type="text"
                value={query}
                onChange={handleSearch}
                onFocus={handleFocus}
                placeholder="Search for an artist..."
                className="search-input"
            />
            {showSuggestions && suggestions.length > 0 && (
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
