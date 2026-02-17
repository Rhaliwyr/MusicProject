import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import GameArea from './GameArea';
import Leaderboard from './Leaderboard';

const VsGameManager = ({ sessionId, initialSongIds, initialMode, onExit }) => {
    // Modes: 'playing', 'summary', 'leaderboard'
    const [view, setView] = useState(initialMode || 'play');
    const [songIds, setSongIds] = useState(initialSongIds || []);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [fullSongs, setFullSongs] = useState([]); // Song objects
    const [loading, setLoading] = useState(false);
    const [totalScore, setTotalScore] = useState(0);
    const [playerName, setPlayerName] = useState('');
    const [scoreSubmitted, setScoreSubmitted] = useState(false);

    // We need a local state to show "Round Complete" before moving to next
    const [roundResult, setRoundResult] = useState(null); // { points, song }

    useEffect(() => {
        if (view === 'play' && songIds.length > 0) {
            fetchSongs();
        }
    }, [songIds, view]);

    const fetchSongs = async () => {
        setLoading(true);
        // Using 'in' to fetch all songs in the list
        const { data, error } = await supabase
            .from('songs')
            .select(`
                *,
                artist:artists(name)
            `)
            .in('id', songIds);

        if (data) {
            // Map artist name to top level for GameArea compatibility
            const processed = data.map(s => ({ ...s, artistName: s.artist?.name }));
            // Reorder based on songIds
            const ordered = songIds.map(id => processed.find(s => s.id === id)).filter(Boolean);
            setFullSongs(ordered);
        }
        setLoading(false);
    };

    const onRoundEnd = (points, songTitle, artistName) => {
        const currentSong = fullSongs[currentIndex];
        // Accumulate score immediately
        const newScore = totalScore + points;
        setTotalScore(newScore);

        setRoundResult({ points, songTitle, artistName });
    };

    const handleNextRound = () => {
        setRoundResult(null);
        if (currentIndex < fullSongs.length - 1) {
            setCurrentIndex(prev => prev + 1);
        } else {
            setView('summary');
        }
    };

    const handleSubmitScore = async () => {
        if (!playerName.trim()) return;
        const { error } = await supabase
            .from('vs_scores')
            .insert([{
                session_id: sessionId,
                player_name: playerName,
                score: totalScore
            }]);

        if (!error) {
            setScoreSubmitted(true);
            setView('leaderboard');
        }
    };

    if (view === 'leaderboard') {
        return <Leaderboard sessionId={sessionId} onBack={onExit} />;
    }

    if (view === 'summary') {
        return (
            <div className="vs-summary-container">
                <h2>Defi Terminé ! 🏆</h2>
                <div className="final-score">Score Final : {totalScore} pts</div>

                {!scoreSubmitted ? (
                    <div className="submit-score-section">
                        <input
                            type="text"
                            className="name-input"
                            placeholder="Entrez votre nom"
                            value={playerName}
                            onChange={(e) => setPlayerName(e.target.value)}
                        />
                        <button className="submit-btn" onClick={handleSubmitScore}>Enregistrer le score</button>
                    </div>
                ) : (
                    <div className="score-submitted-msg">Score enregistré !</div>
                )}

                <div className="summary-actions">
                    {scoreSubmitted && (
                        <button className="leaderboard-btn" onClick={() => setView('leaderboard')}>
                            Voir le classement
                        </button>
                    )}
                    <button className="quit-btn" onClick={onExit}>Retour au menu</button>
                </div>
            </div>
        );
    }

    if (loading || fullSongs.length === 0) return <div className="loading">Chargement du défi...</div>;

    const currentSong = fullSongs[currentIndex];

    // Create a fake artist object that GameArea expects
    const fakeArtist = {
        name: "Mode Défi",
        songs: [currentSong]
    };

    return (
        <div className="vs-game-manager">
            <div className="vs-header">
                <div className="vs-info-badge">Chanson {currentIndex + 1} / {fullSongs.length}</div>
                <div className="vs-info-badge">Score: {totalScore}</div>
                <div className="vs-info-badge room-key">Code: {sessionId}</div>
            </div>

            {!roundResult ? (
                <GameArea
                    artist={fakeArtist}
                    mode="original"
                    onGameOver={onRoundEnd}
                    onQuit={onExit}
                    triggerNewRound={0}
                    key={currentIndex}
                />
            ) : (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h2>Manche Terminée !</h2>
                        <div className="modal-song-info">
                            <h3>{roundResult.songTitle}</h3>
                            <p>de {roundResult.artistName}</p>
                        </div>
                        <p className="points-gained">+{roundResult.points} Points</p>
                        <button onClick={handleNextRound} className="next-btn">
                            {currentIndex < fullSongs.length - 1 ? 'Chanson Suivante' : 'Voir les résultats'}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default VsGameManager;
