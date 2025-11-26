import React from 'react';

const ScoreBoard = ({ score }) => {
    return (
        <div className="score-board">
            <h3>Score: <span>{score}</span></h3>
        </div>
    );
};

export default ScoreBoard;
