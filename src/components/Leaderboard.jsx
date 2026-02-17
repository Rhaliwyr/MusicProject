import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';

const Leaderboard = ({ sessionId, onBack }) => {
    const [scores, setScores] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchScores();
        const subscription = supabase
            .channel('public:vs_scores')
            .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'vs_scores', filter: `session_id=eq.${sessionId}` }, payload => {
                setScores(prev => [...prev, payload.new].sort((a, b) => b.score - a.score));
            })
            .subscribe();

        return () => {
            supabase.removeChannel(subscription);
        };
    }, [sessionId]);

    const fetchScores = async () => {
        const { data, error } = await supabase
            .from('vs_scores')
            .select('*')
            .eq('session_id', sessionId)
            .order('score', { ascending: false });

        if (!error && data) {
            setScores(data);
        }
        setLoading(false);
    };

    return (
        <div className="leaderboard-container">
            <h2>Leaderboard</h2>
            <div className="room-key-display">Room Key: <strong>{sessionId}</strong></div>

            {loading ? <p>Loading...</p> : (
                <ul className="score-list">
                    {scores.map((entry, index) => (
                        <li key={entry.id} className={`score-entry ${index === 0 ? 'first-place' : ''}`}>
                            <span className="rank">#{index + 1}</span>
                            <span className="player-name">{entry.player_name}</span>
                            <span className="player-score">{entry.score} pts</span>
                        </li>
                    ))}
                    {scores.length === 0 && <p>No scores yet. Be the first!</p>}
                </ul>
            )}

            <button onClick={onBack} className="menu-btn">Back to Menu</button>
        </div>
    );
};

export default Leaderboard;
