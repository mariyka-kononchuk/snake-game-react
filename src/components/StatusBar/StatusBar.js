import React from 'react';
import s from './StatusBar.module.css';

const StatusBar = ({ score, name}) => {
    return (
      <div className={s.bar}>
        <p className={s.name}>Name: {name}</p>
        <p className={s.score}>Score:{score}</p>
        <p className={s.high_score}>High-score:{score}</p>
      </div>
  )
};

export default StatusBar;