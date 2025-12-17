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
    const [currentSnippet, setCurrentSnippet] = useState([]);

    useEffect(() => {
        if (artist) {
            setPlayedSongs(new Set());
            startNewRound(true);
        }
    }, [artist]);

    useEffect(() => {
        if (triggerNewRound > 0) {
            startNewRound(false);
        }
    }, [triggerNewRound]);

    // Timer Logic
    useEffect(() => {
        let interval = null;
        if (timerActive) {
            interval = setInterval(() => {
                setSecondsElapsed(prev => prev + 1);
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [timerActive]);

    // Auto-Reveal Logic

    useEffect(() => {
        if (!timerActive || secondsElapsed === 0) return;

        if (mode === 'chrono' && secondsElapsed % 3 === 0) {
            setRevealedLines(prev => {
                if (currentSnippet && prev < currentSnippet.length) {
                    return prev + 1;
                }
                return prev;
            });
        } else if (mode === 'easy' && secondsElapsed % 5 === 0) {
            revealRandomLetter();
        }
    }, [secondsElapsed, mode, timerActive, currentSnippet]);


    const isSongValidForMode = (song, mode) => {
        // ... (existing logic)
        const hasEffectiveContent = (arr) => {
            return arr && arr.length > 0 && arr.some(item => item && item.trim() !== '');
        };

        switch (mode) {
            case 'emoji':
                return hasEffectiveContent(song.title_emoji);
            case 'fr':
                return hasEffectiveContent(song.lyrics_fr);
            case 'synonym':
                return hasEffectiveContent(song.lyrics_synonym);
            default:
                return true;
        }
    };

    // Error Modal State
    const [errorModal, setErrorModal] = useState({ show: false, message: '' });

    const handleCloseError = () => {
        setErrorModal({ show: false, message: '' });
        onQuit(); // Use the passed onQuit to return to menu
    };

    const getFullContent = (song, mode) => {
        if (!song) return [];
        if (mode === 'emoji') return song.title_emoji || [];
        switch (mode) {
            case 'fr': return song.lyrics_fr || song.lyrics;
            case 'synonym': return song.lyrics_synonym || song.lyrics;
            default: return song.lyrics;
        }
    };

    const selectRandomSnippet = (lines) => {
        if (!lines || lines.length <= 10) return lines || [];
        // Determine a safe range to pick 10 lines
        // For lyrics, ideally we don't start at a weird place, but "random" was requested.
        const maxStart = lines.length - 10;
        const start = Math.floor(Math.random() * (maxStart + 1));
        return lines.slice(start, start + 10);
    };

    const startNewRound = (resetHistory = false) => {
        let currentPlayed = resetHistory ? new Set() : playedSongs;

        // Filter available songs based on history AND mode compatibility
        const validSongsForMode = artist.songs.filter(song => isSongValidForMode(song, mode));

        if (validSongsForMode.length === 0) {
            setErrorModal({ show: true, message: "Aucune chanson disponible pour ce mode de jeu avec cet artiste !" });
            return;
        }

        const availableSongs = validSongsForMode.filter(song => !currentPlayed.has(song.id));

        if (availableSongs.length === 0) {
            setErrorModal({ show: true, message: "Vous avez joué toutes les chansons disponibles pour ce mode !" });
            return;
        }

        const randomSong = availableSongs[Math.floor(Math.random() * availableSongs.length)];

        // Compute snippet
        const fullContent = getFullContent(randomSong, mode);
        // Only slice for text modes (not emoji)
        let snippet = fullContent;
        if (mode !== 'emoji') {
            snippet = selectRandomSnippet(fullContent);
        }

        setCurrentSong(randomSong);
        setCurrentSnippet(snippet);

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

        if (mode === 'quiz') {
            generateQuizOptions(randomSong, validSongsForMode);
        }
    };

    const [quizOptions, setQuizOptions] = useState([]);

    const generateQuizOptions = (correctSong, allSongs) => {
        const distractors = [];
        const possibleDistractors = allSongs.filter(s => s.id !== correctSong.id);

        // Pick 3 unique distractors
        while (distractors.length < 3 && possibleDistractors.length > 0) {
            const index = Math.floor(Math.random() * possibleDistractors.length);
            distractors.push(possibleDistractors[index]);
            possibleDistractors.splice(index, 1);
        }

        const options = [...distractors, correctSong];
        // Shuffle options
        for (let i = options.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [options[i], options[j]] = [options[j], options[i]];
        }
        setQuizOptions(options);
    };

    const handleQuizGuess = (song) => {
        if (!currentSong) return;
        if (song.id === currentSong.id) {
            setFeedback('Correct!');
            setTimerActive(false);
            onGameOver(100, currentSong.title, currentSong.artistName || artist.name); // Prefer attached artistName if available
        } else {
            setFeedback('Wrong! It was ' + currentSong.title);
            setTimerActive(false);
            // Maybe give partial points or just 0? User didn't specify. 0 for now.
            // Auto-close or wait? Reuse modal.
            onGameOver(0, currentSong.title, currentSong.artistName || artist.name);
        }
    };

    // Use currentSnippet instead of dynamic getContent
    const currentContent = currentSnippet;

    const isEmojiMode = mode === 'emoji';
    const isEasyMode = mode === 'easy';

    // ... (keep helper functions like handleReveal, maskLyrics, handleGiveUp, revealRandomLetter, handleGuess) -> actually we should reuse existing code so I only replace startNewRound and render

    const handleReveal = (isAuto = false) => {
        if (currentSong && revealedLines < currentContent.length) {
            setRevealedLines(prev => prev + 1);
        }
    };

    const maskLyrics = (text, title) => {
        if (!title || isEmojiMode) return text;
        const escapedTitle = title.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
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
        const title = currentSong.title;
        const unrevealedIndices = [];
        for (let i = 0; i < title.length; i++) {
            if (!revealedTitleIndices.has(i) && title[i] !== ' ') {
                unrevealedIndices.push(i);
            }
        }
        const totalLetters = title.replace(/ /g, '').length;
        if (revealedTitleIndices.size >= totalLetters / 2) return;

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

            let baseScore = 100;
            if (mode === 'chrono') {
                baseScore = Math.max(100 - secondsElapsed, 10);
            } else if (mode === 'easy') {
                const title = currentSong.title;
                let totalLetters = 0;
                for (let i = 0; i < title.length; i++) {
                    if (title[i] !== ' ') totalLetters++;
                }
                const revealedCount = revealedTitleIndices.size;
                const percentageRevealed = totalLetters > 0 ? (revealedCount / totalLetters) * 100 : 0;
                baseScore = Math.max(100 - Math.round(percentageRevealed), 10);
            } else {
                baseScore = Math.max(100 - ((revealedLines - 1) * 10), 10);
            }
            onGameOver(baseScore, currentSong.title, artist.name);
        } else {
            setFeedback('Try again!');
        }
    };

    return (
        <div className="game-area">
            {currentSong && (
                <>
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
                            <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                                {/* Lyrics take precedence */}
                                <div className="easy-lyrics-container" style={{ flex: 1, overflowY: 'auto' }}>
                                    {currentContent.map((line, index) => (
                                        <p key={index} className="lyric-line">
                                            {maskLyrics(line, currentSong.title)}
                                        </p>
                                    ))}
                                </div>
                                {/* Title clues below */}
                                <div className="easy-clues-container">
                                    {currentSong && currentSong.title.split('').map((char, index) => (
                                        <span key={index} className="easy-char-box">
                                            {char === ' ' ? '\u00A0\u00A0' : (revealedTitleIndices.has(index) ? char : '_')}
                                        </span>
                                    ))}
                                </div>
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
                        {!isEmojiMode && !isEasyMode && mode !== 'chrono' && (
                            <button onClick={() => handleReveal()} disabled={revealedLines >= currentContent.length}>
                                Reveal More (- Points)
                            </button>
                        )}
                    </div>

                    <div className="guess-input-area">
                        {mode === 'quiz' ? (
                            <div className="quiz-options-container">
                                {quizOptions.map(option => (
                                    <button
                                        key={option.id}
                                        className="quiz-option-btn"
                                        onClick={() => handleQuizGuess(option)}
                                    >
                                        {option.title}
                                    </button>
                                ))}
                            </div>
                        ) : (
                            <>
                                <input
                                    type="text"
                                    value={guess}
                                    onChange={(e) => setGuess(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && handleGuess()}
                                    placeholder="Enter song title..."
                                />
                                <button onClick={handleGuess}>Submit Guess</button>
                                <button onClick={handleGiveUp} className="give-up-btn">Give Up</button>
                            </>
                        )}
                    </div>

                    {feedback && <div className={`feedback ${feedback === 'Correct!' ? 'success' : 'error'}`}>{feedback}</div>}
                </>
            )}

            {/* Error Modal */}
            {errorModal.show && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h2>Oups ! 😕</h2>
                        <p style={{ color: 'white', marginBottom: '2rem', fontSize: '1.2rem' }}>
                            {errorModal.message}
                        </p>
                        <button onClick={handleCloseError} className="menu-btn">
                            Retour au menu
                        </button>
                    </div>
                </div>
            )}
        </div >
    );
};

export default GameArea;
