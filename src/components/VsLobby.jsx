import React, { useState } from 'react';
import { supabase } from '../lib/supabaseClient';

const VsLobby = ({ onSessionStart, onBack }) => {
    const [songCount, setSongCount] = useState(5);
    const [roomKey, setRoomKey] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const generateRoomKey = () => {
        return Math.random().toString(36).substring(2, 8).toUpperCase();
    };

    const handleCreateSession = async () => {
        setLoading(true);
        setError(null);
        try {
            // 1. Fetch available songs
            const { data: songs, error: fetchError } = await supabase
                .from('songs')
                .select('id');

            if (fetchError) throw fetchError;
            if (!songs || songs.length === 0) throw new Error("No songs available");

            // 2. Pick random songs
            const ids = songs.map(s => s.id);
            const shuffled = ids.sort(() => 0.5 - Math.random());
            const selectedIds = shuffled.slice(0, Number(songCount));

            // 3. Create session
            const newKey = generateRoomKey();
            const { error: insertError } = await supabase
                .from('vs_sessions')
                .insert([{ id: newKey, song_ids: selectedIds }]);

            if (insertError) throw insertError;

            // 4. Start
            onSessionStart(newKey, selectedIds, 'play');

        } catch (err) {
            console.error(err);
            setError(err.message || 'Error creating session');
        } finally {
            setLoading(false);
        }
    };

    const handleJoinSession = async () => {
        if (!roomKey.trim()) return;
        setLoading(true);
        setError(null);
        try {
            const { data, error } = await supabase
                .from('vs_sessions')
                .select('*')
                .eq('id', roomKey.trim().toUpperCase())
                .single();

            if (error) throw error;
            if (!data) throw new Error("Session not found");

            onSessionStart(data.id, data.song_ids, 'play');
        } catch (err) {
            console.error(err);
            setError('Session not found or error joining');
        } finally {
            setLoading(false);
        }
    };

    const handleViewLeaderboard = async () => {
        if (!roomKey.trim()) return;
        // Verify session exists first
        setLoading(true);
        setError(null);
        try {
            const { data, error } = await supabase
                .from('vs_sessions')
                .select('id')
                .eq('id', roomKey.trim().toUpperCase())
                .single();

            if (error || !data) throw new Error("Session not found");

            onSessionStart(data.id, [], 'leaderboard');
        } catch (err) {
            console.error(err);
            setError('Session not found');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="vs-lobby">
            <button className="back-btn" onClick={onBack}>&larr; Back</button>
            <h2>VS / Challenge Mode</h2>

            <div className="lobby-section">
                <h3>Create New Challenge</h3>
                <div className="input-group">
                    <label>Number of Songs:</label>
                    <input
                        type="number"
                        min="1"
                        max="20"
                        value={songCount}
                        onChange={(e) => setSongCount(e.target.value)}
                    />
                </div>
                <button onClick={handleCreateSession} disabled={loading}>
                    {loading ? 'Creating...' : 'Generate & Play'}
                </button>
            </div>

            <div className="divider">OR</div>

            <div className="lobby-section">
                <h3>Join Existing Challenge</h3>
                <div className="input-group">
                    <label>Room Key:</label>
                    <input
                        type="text"
                        placeholder="ENTER KEY"
                        value={roomKey}
                        onChange={(e) => setRoomKey(e.target.value.toUpperCase())}
                    />
                </div>
                <div className="button-group">
                    <button onClick={handleJoinSession} disabled={loading}>
                        {loading ? 'Joining...' : 'Play Challenge'}
                    </button>
                    <button onClick={handleViewLeaderboard} disabled={loading} className="secondary-btn">
                        View Leaderboard
                    </button>
                </div>
            </div>

            {error && <div className="error-message">{error}</div>}
        </div>
    );
};

export default VsLobby;
