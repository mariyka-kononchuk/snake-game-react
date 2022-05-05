import React from 'react';


const GameOver = ({ score, onRestart }) => {
    
    return (
        <div>
            <h2>GAME OVER</h2>
            <p>Your score {score}</p>
            <button type="button" onClick={()=> onRestart()}>Restart game</button>
        </div>
    ) 
}

    //this.props.onCreateNewPlayer();

export default GameOver;