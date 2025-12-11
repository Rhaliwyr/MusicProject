import React, { useState, useEffect } from 'react';

const GameArea = ({ artist, mode, onGameOver, onQuit, triggerNewRound }) => {
    const [currentSong, setCurrentSong] = useState(null);
    const [revealedLines, setRevealedLines] = useState(1);
    const [guess, setGuess] = useState('');
    const [feedback, setFeedback] = useState('');
    const [secondsElapsed, setSecondsElapsed] = useState(0);
    const [timerActive, setTimerActive] = useState(false);
    const [playedSongs, setPlayedSongs] = useState(new Set());
    const [revealedTitleIndices, setRevealedTitleIndices] = useState(new Set());

    useEffect(() => {
        if (artist) {
            // Reset history when artist changes (or on initial mount)
            // But wait, if we are just triggering new round, we don't want to reset history.
            // This effect runs when artist changes.
            setPlayedSongs(new Set());
            startNewRound(true); // true = reset history
        }
    }, [artist]);

    useEffect(() => {
        if (triggerNewRound > 0) {
            startNewRound(false);
        }
    }, [triggerNewRound]);

    // Timer & Auto-Reveal Logic for Chrono Mode
    useEffect(() => {
        let interval = null;
        if (timerActive) {
            interval = setInterval(() => {
                setSecondsElapsed(prev => {
                    const newTime = prev + 1;
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
        if (!timerActive || secondsElapsed === 0) return;

        if (mode === 'chrono' && secondsElapsed % 3 === 0) {
            setRevealedLines(prev => {
                if (currentSong && prev < currentSong.lyrics.length) {
                    return prev + 1;
                }
                return prev;
            });
        } else if (mode === 'easy' && secondsElapsed % 5 === 0) {
            // Easy mode: reveal a letter every 5 seconds
            revealRandomLetter();
        }
    }, [secondsElapsed, mode, timerActive, currentSong]);


    const isSongValidForMode = (song, mode) => {
        switch (mode) {
            case 'emoji':
                return song.title_emoji && song.title_emoji.length > 0;
            case 'fr':
                return song.lyrics_fr && song.lyrics_fr.length > 0;
            case 'synonym':
                return song.lyrics_synonym && song.lyrics_synonym.length > 0;
            default:
                return true;
        }
    };

    const startNewRound = (resetHistory = false) => {
        let currentPlayed = resetHistory ? new Set() : playedSongs;

        // Filter available songs based on history AND mode compatibility
        const validSongsForMode = artist.songs.filter(song => isSongValidForMode(song, mode));

        if (validSongsForMode.length === 0) {
            alert("Aucune chanson disponible pour ce mode de jeu !");
            onQuit();
            return;
        }

        const availableSongs = validSongsForMode.filter(song => !currentPlayed.has(song.id));

        if (availableSongs.length === 0) {
            alert("Vous avez joué toutes les chansons disponibles pour ce mode !");
            onQuit(); // Go back to menu
            return;
        }

        const randomSong = availableSongs[Math.floor(Math.random() * availableSongs.length)];

        setCurrentSong(randomSong);
        setPlayedSongs(prev => {
            const newSet = resetHistory ? new Set() : new Set(prev);
            newSet.add(randomSong.id);
            return newSet;
        });

        setRevealedLines(1);
        setRevealedTitleIndices(new Set()); // Reset easy mode indices
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
    const isEasyMode = mode === 'easy';

    const handleReveal = (isAuto = false) => {
        if (currentSong && revealedLines < currentContent.length) {
            setRevealedLines(prev => prev + 1);
        }
    };

    const maskLyrics = (text, title) => {
        if (!title || isEmojiMode) return text;
        // Escape special regex characters
        const escapedTitle = title.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        // Replace spaces with \s+ to match newlines or multiple spaces
        const flexibleTitlePattern = escapedTitle.replace(/ /g, '\\s+');

        const regex = new RegExp(flexibleTitlePattern, 'gi');
        return text.replace(regex, '[***]');
    };

    const handleGiveUp = () => {
        if (!currentSong) return;
        setTimerActive(false);
        onGameOver(0, currentSong.title, artist.name);
    };

    const revealRandomLetter = () => {
        if (!currentSong) return;

        // Get all indices of letters (ignoring spaces/special chars if we want, but let's keep it simple)
        // Actually, we should only reveal letters that are not yet revealed.
        const title = currentSong.title;
        const unrevealedIndices = [];
        for (let i = 0; i < title.length; i++) {
            if (!revealedTitleIndices.has(i) && title[i] !== ' ') {
                unrevealedIndices.push(i);
            }
        }

        // Limit to 50% of letters revealed
        const totalLetters = title.replace(/ /g, '').length;
        if (revealedTitleIndices.size >= totalLetters / 2) {
            return;
        }

        if (unrevealedIndices.length > 0) {
            const randomIndex = unrevealedIndices[Math.floor(Math.random() * unrevealedIndices.length)];
            setRevealedTitleIndices(prev => {
                const newSet = new Set(prev);
                newSet.add(randomIndex);
                return newSet;
            });
        }
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
            } else if (mode === 'easy') {
                // Easy: Score based on percentage of revealed letters
                // 100 - (percentage revealed)
                const title = currentSong.title;
                let totalLetters = 0;
                for (let i = 0; i < title.length; i++) {
                    if (title[i] !== ' ') totalLetters++;
                }

                const revealedCount = revealedTitleIndices.size;
                const percentageRevealed = totalLetters > 0 ? (revealedCount / totalLetters) * 100 : 0;

                baseScore = Math.max(100 - Math.round(percentageRevealed), 10);
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

            <div className={`lyrics-box ${isEmojiMode ? 'emoji-box' : ''} ${isEasyMode ? 'easy-box' : ''}`}>
                {isEmojiMode ? (
                    <div className="emoji-clues">
                        {currentContent.map((emoji, index) => (
                            <span key={index} className="emoji-clue">{emoji}</span>
                        ))}
                    </div>
                ) : isEasyMode ? (
                    <>
                        <div className="easy-clues">
                            {currentSong && currentSong.title.split('').map((char, index) => (
                                <span key={index} className="easy-char">
                                    {char === ' ' ? '\u00A0\u00A0' : (revealedTitleIndices.has(index) ? char : '_')}
                                </span>
                            ))}
                        </div>
                        {/* Also show lyrics in Easy mode as requested */}
                        <div className="easy-lyrics-container">
                            {currentContent.map((line, index) => (
                                <p key={index} className="lyric-line">
                                    {maskLyrics(line, currentSong.title)}
                                </p>
                            ))}
                        </div>
                    </>
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
                {!isEmojiMode && !isEasyMode && mode !== 'chrono' && (
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
                <button onClick={handleGiveUp} className="give-up-btn">Give Up</button>
            </div>

            {feedback && <div className={`feedback ${feedback === 'Correct!' ? 'success' : 'error'}`}>{feedback}</div>}
        </div >
    );
};

export default GameArea;
