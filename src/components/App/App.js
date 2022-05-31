import React, { useState, useEffect, useRef } from 'react';
// import Snake from '../Snake';
// import Food from '../Food';
import StatusBar from '../StatusBar';
import NameForm from '../NameForm';
import GameOver from '../GameOver';
import Grid from '../Grid';

export default function App() {

const FIELD_SIZE=10;
  
let initialRows = [];
for(let i=0; i<FIELD_SIZE; i++) {
    initialRows.push([]);
    for(let k=0; k<FIELD_SIZE; k++) {
        initialRows[i].push('blank');
    }
}

const randomPosition = () => {
    const position = {
        x: Math.floor(Math.random()*FIELD_SIZE),
        y: Math.floor(Math.random()*FIELD_SIZE)};
    return position;    
}
const [name, setName] = useState(''); 
const [speed, setSpeed] = useState(150); 
const [status, setStatus] = useState('start');
const [score, setScore] = useState(0);

  
const [rows, setRows] = useState(initialRows);
const [snake, setSnake] = useState([{x:5,y:4},{x:5,y:5}]);
const [direction, setDirection] = useState('right');
const [food, setFood] = useState(randomPosition);
  

function createNewPlayer ({ name }) {
  setName(name);
  setStatus('pause');
  setScore(0);
  displaySnake();
}
  
   useInterval(() => {
      moveSnake();
    },
     status ==='game' ? speed : null
  );
 
const changeDirectionWithKeys = (e) => {
    var { keyCode } = e;
      switch (keyCode) {
        case 37:
                setDirection('left');
                break;
        case 38:
                setDirection('top');
                break;                   
        case 39:
              setDirection('right');
              break;
        case 40:
              setDirection('bottom');
          break;
        case 32:
        if (status === 'game') {
          setStatus('pause')
          return;
        }
        if (status === 'pause') {
          setStatus('game')
          return;
        }
        break;
        default:
            break;            
          }
    }
    
document.addEventListener("keydown", changeDirectionWithKeys, false);

const displaySnake = () => {
    const newRows = initialRows;
    snake.forEach(cell => {
      newRows[cell.x][cell.y]='snake';
    })
    newRows[food.x][food.y]='food';
    setRows(newRows);
}

const moveSnake = () => {
    const newSnake = [];
    switch(direction) {
      case 'right':
            newSnake.push({x: snake[0].x, y: (snake[0].y + 1)})
            break;
        case 'left':
            newSnake.push({x: snake[0].x, y: (snake[0].y - 1 )})
            break;
        case 'top':
            newSnake.push({x: (snake[0].x - 1 ), y: snake[0].y})
            break;
        case 'bottom':
            newSnake.push({ x: (snake[0].x + 1) , y: snake[0].y })
            break;
        default:
            return;
    }
    snake.forEach(cell => {
        newSnake.push(cell);
    })   
    if (snake[0].x === food.x && snake[0].y === food.y) {
      setFood(randomPosition);
    //increaseSpeed();
    countingPoints();
    } else {
       newSnake.pop();
    }
    setSnake(newSnake);
    displaySnake();
}
 
  const checkIfCollapsed =()=> {
   if (snake[0].x === snake[snake.length - 1].x && snake[0].y === snake[snake.length - 1].y) {
     setStatus('game_over');
     setSnake([{ x: 5, y: 4 }, { x: 5, y: 5 }]);
    }
  }

  const checkIfOutOfBorders =()=> {
    if (snake[0].x >= FIELD_SIZE|| snake[0].y  >= FIELD_SIZE || snake[0].x < 0 || snake[0].y  < 0) {
      setStatus('game_over');;
      setSnake([{ x: 5, y: 4 }, { x: 5, y: 5 }]);
      return;
    }
  }

  const countingPoints =() => {
    setScore(score+10)
  }

  const restartGame = () => {
    setName('');
    //setRows(initialRows)
    setSpeed(150);
    setStatus('start')
  }

  useEffect(() => {
      console.log("check");
      checkIfCollapsed();
      checkIfOutOfBorders();
  }, [snake])

function useInterval(callback, delay) {
    const savedCallback = useRef();
  
    // Remember the latest callback.
    useEffect(() => {
      savedCallback.current = callback;
    }, [callback]);
  
    // Set up the interval.
    useEffect(() => {
      function tick() {
        savedCallback.current();
      }
      if (delay !== null) {
        let id = setInterval(tick, delay);
        return () => clearInterval(id);
      }
    }, [delay]);
  }
  
    if (status === 'start') {
      return (
        <>
           <NameForm onCreateNewPlayer={createNewPlayer} />
        </>)
    }
 
    if (status === 'game' || status === 'pause') {
      return (
        <div>
          <div>
            <StatusBar score={score} name={name} status={status} />
          </div>
          <div className="game-area">
            <Grid rows={rows}/>
          </div>
        </div>)
    }
    
    if (status === 'game_over') {
      return (
        <div>
          <GameOver score={score} onRestart={restartGame}/>
          {/* <div>
            <h2>GAME OVER</h2>
            <p>Your score {score}</p>
            <button type="button" onClick={()=>this.onRestartGame()}>Restart game</button>
        </div> */}
        </div>)
    }
  
}


