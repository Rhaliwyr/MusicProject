import React from 'react';

const ModeSelector = ({ onModeSelect, onBack }) => {
    const modes = [
        { id: 'original', label: 'Original', icon: '🎵', description: 'Classic lyrics' },
        { id: 'chrono', label: 'Chrono', icon: '⏱️', description: 'Lyrics reveal over time' },
        { id: 'fr', label: 'Français', icon: '🇫🇷', description: 'Translated to French' },
        { id: 'synonym', label: 'Synonymes', icon: '📚', description: 'Complex synonyms' },
        { id: 'emoji', label: 'Emoji', icon: '🧩', description: 'Guess from title emojis' },
    ];

    return (
        <div className="mode-selector-container">
            <div className="mode-header">
                <button className="back-btn" onClick={onBack}>← Back</button>
                <h2>Select Game Mode</h2>
            </div>
            <div className="modes-grid">
                {modes.map((mode) => (
                    <button
                        key={mode.id}
                        className="mode-card"
                        onClick={() => onModeSelect(mode.id)}
                    >
                        <div className="mode-icon">{mode.icon}</div>
                        <h3>{mode.label}</h3>
                        <p>{mode.description}</p>
                    </button>
                ))}
            </div>
        </div>
    );
};

export default ModeSelector;
