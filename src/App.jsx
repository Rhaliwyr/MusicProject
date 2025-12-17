import { useState, useEffect } from 'react'
import { supabase } from './lib/supabaseClient'
import SearchBar from './components/SearchBar'
import ModeSelector from './components/ModeSelector'
import GameArea from './components/GameArea'
import ScoreBoard from './components/ScoreBoard'
import logo from './assets/logo.png'
import './App.css'

function App() {
    const [artists, setArtists] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedArtist, setSelectedArtist] = useState(null);
    const [gameMode, setGameMode] = useState(null); // 'original', 'fr', 'synonym', 'emoji'
    const [score, setScore] = useState(0);
    const [maxScore, setMaxScore] = useState(0);
    const [modalData, setModalData] = useState({ show: false, points: 0 });
    const [triggerNewRound, setTriggerNewRound] = useState(0);

    useEffect(() => {
        getArtists();
    }, []);

    async function getArtists() {
        setLoading(true);
        try {
            const { data, error } = await supabase
                .from('artists')
                .select(`
                    *,
                    songs (*)
                `);

            if (error) {
                console.error('Error fetching artists:', error);
            } else {
                setArtists(data || []);
            }
        } catch (err) {
            console.error('Unexpected error:', err);
        } finally {
            setLoading(false);
        }
    }

    const handleArtistSelect = (artist) => {
        setSelectedArtist(artist);
        setGameMode(null); // Reset mode when artist changes
    };

    const handleRandomSelection = () => {
        if (artists.length === 0) return;
        const randomArtist = artists[Math.floor(Math.random() * artists.length)];
        handleArtistSelect(randomArtist);
    };

    const handleGlobalQuiz = () => {
        if (artists.length === 0) return;
        // Aggregate all songs
        const allSongs = artists.flatMap(a => a.songs.map(s => ({ ...s, artistName: a.name }))); // Attach artist name potentially?
        // Actually GameArea expects song object.
        // We create a "Global" artist.
        const globalArtist = {
            id: 'global-quiz',
            name: 'Global Quiz',
            songs: allSongs
        };
        setSelectedArtist(globalArtist);
        setGameMode('quiz');
    };

    const handleModeSelect = (mode) => {
        setGameMode(mode);
    };

    const handleGameOver = (points, songTitle, artistName) => {
        setScore(prev => prev + points);
        setMaxScore(prev => prev + 100);
        setModalData({ show: true, points, songTitle, artistName });
    };

    const closeModal = () => {
        setModalData({ show: false, points: 0 });
        setSelectedArtist(null);
        setGameMode(null);
    };

    const handleAnotherOne = () => {
        setModalData({ show: false, points: 0 });
        setTriggerNewRound(prev => prev + 1);
    };

    const handleBackToSearch = () => {
        setSelectedArtist(null);
        setGameMode(null);
    };

    const handleReset = () => {
        setScore(0);
        setMaxScore(0);
        setTriggerNewRound(0);
    };

    useEffect(() => {
        if (!modalData.show) return;

        let listenerAdded = false;
        const handleKeyDown = (e) => {
            if (e.key === 'Enter') {
                handleAnotherOne();
            }
        };

        const timer = setTimeout(() => {
            window.addEventListener('keydown', handleKeyDown);
            listenerAdded = true;
        }, 500);

        return () => {
            clearTimeout(timer);
            if (listenerAdded) {
                window.removeEventListener('keydown', handleKeyDown);
            }
            // Also try to remove it just in case, as the variable might not reflect correctly in closure if not careful,
            // but here handleKeyDown is stable within this effect scope.
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [modalData.show]);

    return (
        <div className="app-container">
            <header>
                <div className="branding">
                    <img src={logo} alt="Lopotichat Music Quiz Logo" className="app-logo" />
                    <h1>Lopotichat Music Quiz</h1>
                </div>
                <ScoreBoard score={score} maxScore={maxScore} />
            </header>

            <main>
                {loading ? (
                    <div className="loading">Loading artists...</div>
                ) : (
                    !selectedArtist && (
                        <div className="search-and-random">
                            <SearchBar onArtistSelect={handleArtistSelect} artists={artists} />
                            <div className="action-buttons">
                                <button className="random-btn" onClick={handleRandomSelection}>
                                    🎲 Aléatoire
                                </button>
                                <button className="quiz-btn" onClick={handleGlobalQuiz}>
                                    📝 Quiz
                                </button>
                                <button className="reset-btn" onClick={handleReset}>
                                    🔄 Reset
                                </button>
                            </div>
                        </div>
                    )
                )}

                {selectedArtist && !gameMode && (
                    <ModeSelector
                        onModeSelect={handleModeSelect}
                        onBack={handleBackToSearch}
                        artist={selectedArtist}
                    />
                )}

                {selectedArtist && gameMode && (
                    <GameArea
                        artist={selectedArtist}
                        mode={gameMode}
                        onGameOver={handleGameOver}
                        onQuit={closeModal}
                        triggerNewRound={triggerNewRound}
                    />
                )}
            </main>

            {modalData.show && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h2>Round Complete!</h2>
                        <div className="modal-song-info">
                            <h3>{modalData.songTitle}</h3>
                            <p>by {modalData.artistName}</p>
                        </div>
                        <p className="points-gained">+{modalData.points} Points</p>
                        <div className="modal-actions">
                            <button onClick={handleAnotherOne} className="next-btn">Another One (Enter)</button>
                            <button onClick={closeModal} className="menu-btn">Menu</button>
                            <a
                                href={`https://www.youtube.com/results?search_query=${encodeURIComponent(modalData.artistName + ' ' + modalData.songTitle)}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="youtube-btn"
                            >
                                📺 Voir sur YouTube
                            </a>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default App
