import React from 'react';

const ScoreBoard = ({ score, maxScore }) => {
    return (
        <div className="score-board">
            <h3>Score: <span>{score}</span> / <span>{maxScore}</span></h3>
        </div>
    );
};

export default ScoreBoard;
