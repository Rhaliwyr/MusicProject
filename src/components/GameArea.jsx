import React, { useState, useEffect } from 'react';

const GameArea = ({ artist, mode, onGameOver, onQuit }) => {
    const [currentSong, setCurrentSong] = useState(null);
    const [revealedLines, setRevealedLines] = useState(1);
    const [guess, setGuess] = useState('');
    const [feedback, setFeedback] = useState('');
    const [secondsElapsed, setSecondsElapsed] = useState(0);
    const [timerActive, setTimerActive] = useState(false);

    useEffect(() => {
        if (artist) {
            startNewRound();
        }
    }, [artist, mode]);

    // Timer & Auto-Reveal Logic for Chrono Mode
    useEffect(() => {
        let interval = null;
        if (timerActive) {
            interval = setInterval(() => {
                setSecondsElapsed(prev => {
                    const newTime = prev + 1;
                    // Auto-reveal every 3 seconds in Chrono mode
                    if (mode === 'chrono' && newTime % 3 === 0) {
                        handleReveal(true); // Pass true to indicate auto-reveal
                    }
                    return newTime;
                });
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [timerActive, mode, currentSong]); // Added currentSong dependency for handleReveal access if needed, though handleReveal uses state. 
    // Actually handleReveal inside effect might be stale closure if not careful. 
    // Better to put logic inside setSecondsElapsed or separate effect.
    // Let's separate auto-reveal logic to ensure fresh state access or use functional updates carefully.

    // Refined Auto-Reveal Effect
    useEffect(() => {
        if (mode === 'chrono' && timerActive && secondsElapsed > 0 && secondsElapsed % 3 === 0) {
            setRevealedLines(prev => {
                if (currentSong && prev < currentSong.lyrics.length) {
                    return prev + 1;
                }
                return prev;
            });
        }
    }, [secondsElapsed, mode, timerActive, currentSong]);


    const startNewRound = () => {
        const randomSong = artist.songs[Math.floor(Math.random() * artist.songs.length)];
        setCurrentSong(randomSong);
        setRevealedLines(1);
        setGuess('');
        setFeedback('');
        setSecondsElapsed(0);
        setTimerActive(true);
    };

    const getContent = () => {
        if (!currentSong) return [];
        if (mode === 'emoji') return currentSong.title_emoji || [];

        switch (mode) {
            case 'fr': return currentSong.lyrics_fr || currentSong.lyrics;
            case 'synonym': return currentSong.lyrics_synonym || currentSong.lyrics;
            default: return currentSong.lyrics;
        }
    };

    const currentContent = getContent();
    const isEmojiMode = mode === 'emoji';

    const handleReveal = (isAuto = false) => {
        if (currentSong && revealedLines < currentContent.length) {
            setRevealedLines(prev => prev + 1);
        }
    };

    const maskLyrics = (text, title) => {
        if (!title || isEmojiMode) return text;
        const escapedTitle = title.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const regex = new RegExp(escapedTitle, 'gi');
        return text.replace(regex, '[***]');
    };

    const handleGuess = () => {
        if (!currentSong) return;

        if (guess.toLowerCase().trim() === currentSong.title.toLowerCase().trim()) {
            setFeedback('Correct!');
            setTimerActive(false);

            // Scoring Logic
            let baseScore = 100;

            if (mode === 'chrono') {
                // Chrono: Score based on speed (seconds)
                // Example: 100 - seconds. Min 10.
                baseScore = Math.max(100 - secondsElapsed, 10);
            } else {
                // Standard: Score based on revealed lines.
                baseScore = Math.max(100 - (revealedLines * 10), 10);
            }

            onGameOver(baseScore, currentSong.title, artist.name);
        } else {
            setFeedback('Try again!');
        }
    };

    return (
        <div className="game-area">
            <div className="game-header">
                <button className="quit-btn" onClick={onQuit}>Quit</button>
                <h2>Guess the song by {artist.name}</h2>
                <div className="mode-badge">{mode ? mode.toUpperCase() : 'ORIGINAL'}</div>
                {mode === 'chrono' && <div className="timer">Time: {secondsElapsed}s</div>}
            </div>

            <div className={`lyrics-box ${isEmojiMode ? 'emoji-box' : ''}`}>
                {isEmojiMode ? (
                    <div className="emoji-clues">
                        {currentContent.map((emoji, index) => (
                            <span key={index} className="emoji-clue">{emoji}</span>
                        ))}
                    </div>
                ) : (
                    <>
                        {currentContent.slice(0, revealedLines).map((line, index) => (
                            <p key={index} className="lyric-line">
                                {maskLyrics(line, currentSong.title)}
                            </p>
                        ))}
                        {revealedLines < currentContent.length && (
                            <div className="blur-overlay"></div>
                        )}
                    </>
                )}
            </div>

            <div className="controls">
                {!isEmojiMode && mode !== 'chrono' && (
                    <button onClick={() => handleReveal()} disabled={revealedLines >= currentContent.length}>
                        Reveal More (- Points)
                    </button>
                )}
            </div>

            <div className="guess-input-area">
                <input
                    type="text"
                    value={guess}
                    onChange={(e) => setGuess(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleGuess()}
                    placeholder="Enter song title..."
                />
                <button onClick={handleGuess}>Submit Guess</button>
            </div>

            {feedback && <div className={`feedback ${feedback === 'Correct!' ? 'success' : 'error'}`}>{feedback}</div>}
        </div >
    );
};

export default GameArea;
