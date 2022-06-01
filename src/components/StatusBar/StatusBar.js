import React from 'react';
import s from './StatusBar.module.css';

const bestResult = () => {
  const topPlayers = JSON.parse(localStorage.getItem("players"));
  if (topPlayers) {
    const topScores = [];
    for (const player of topPlayers) {
      topScores.push(player.score);
    }
    const maxScore = Math.max(...topScores)
    return maxScore;
  }
  return 0;
}

const maxScore = bestResult();

const StatusBar = ({ score, name}) => {
    return (
      <div className={s.bar}>
        <div className={s.wrapper}>
          <p className={s.name}>Name: {name}</p>
          <p className={s.score}>Score:{score}</p>
          <p className={s.high_score}>High-score:{maxScore}</p>
        </div>
      </div>
  )
};

export default StatusBar;