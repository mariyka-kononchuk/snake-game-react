import React from 'react';
import s from './GameOver.module.css';

const GameOver = ({ score, onRestart }) => {
    return (
        <div className={s.game_over}>
            <h2 className={s.title}>GAME OVER</h2>
            <p className={s.subtitle}>Your score: {score}</p>
            <button className={s.button} type="button" onClick={()=> onRestart()}>Restart game</button>
        </div>
    ) 
}

export default GameOver;