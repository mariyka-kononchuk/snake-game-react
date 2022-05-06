import React, { useState, useEffect } from 'react';
// import Snake from '../Snake';
// import Food from '../Food';
// import StatusBar from '../StatusBar';
import NameForm from '../NameForm';
// import GameOver from '../GameOver';
import Grid from '../Grid';

export default function App() {
const width=10;
const height = 10;

const randomPosition = () => {
    const position = {
        x: Math.floor(Math.random()*width),
        y: Math.floor(Math.random()*height)};
    return position;    
}

const createInitialRows = () => {
    const width=10;
    const height=10;    
    let initialRows = [];
    for(let i=0; i<height; i++) {
        initialRows.push([]);
        for(let k=0; k<width; k++) {
            initialRows[i].push('blank');
        }
    }
    return initialRows;    
}

  const [name, setName] = useState(''); 
  const [speed, setSpeed] = useState(3000); 
  const [rows, setRows] = useState(createInitialRows);
  const [snake, setSnake] = useState([{x:0,y:0},{x:0,y:1}]);
  const [direction, setDirection] = useState('right');
  const [food, setFood] = useState(randomPosition);
  const [status, setStatus] = useState('start');
  const [intervalId, setIntervalId] = useState(0);
 

  const createNewPlayer = ({ name }) => {
    setName(name);
    setStatus('game');
    startMovingSnake();
    console.log(localStorage.getItem("name"))
    
  }

  const startMovingSnake = () => {
    console.log("начали движение змейки")
    let intervalId = setInterval(moveSnake, speed);
    setIntervalId(intervalId)
    console.log('status', status)
    console.log('name', name)
   }

  const onKeyDown = (e) => {
    e = e || window.event;
    switch (e.keyCode) {
      case 38:
        setDirection('up')
        break;
      case 40:
        setDirection('down')
        break;
      case 37:
        setDirection('left')
        break;
      case 39:
        setDirection('right')
        break;
      case 32:
        if (status === 'game') {
          setStatus('pause');
          stopMovingSnake();
          return;
        }
        if (status === 'pause') {
          setStatus('game');
          startMovingSnake();
          return;
        }
        
        break;
      default:
        return;
    }
  }

  const moveSnake = () => {
    console.log('status2', status)
    console.log('name', name)
    const newSnake = [];

    switch(direction) {
      case 'right':
        console.log('right')
        newSnake.push({ x: snake[0].x, y: (snake[0].y + 1) % width });
        console.log('newSnakeeee', newSnake)
        
            break;
      case 'left':
         console.log('left')
            newSnake.push({x: snake[0].x, y: (snake[0].y - 1 + width)%width})
            break;
        case 'up':
            newSnake.push({x: (snake[0].x - 1 + height)%height, y: snake[0].y})
            break;
        case 'down':
            newSnake.push({ x: (snake[0].x + 1) % height, y: snake[0].y })
            break;
        default:
          return;
    }

    snake.forEach(cell=> {
      newSnake.push(cell);
    })   
    
    if(snake[0].x === food.x && snake[0].y === food.y) {
        setFood(randomPosition);
    } else {
        newSnake.pop();
    }
    console.log('newsnake', newSnake)
    setSnake(newSnake);
    displaySnake();
  }
  
  const displaySnake = () => {
    const newRows = createInitialRows();
    snake.forEach(cell => {
     newRows[cell.x][cell.y]='snake';
    })
    newRows[food.x][food.y]='food';
    setRows(newRows);
}
  // const moveSnake = () => {
  //   console.log("змейка двигается")
    
  //   let dots = [...this.state.snakeDots];
  //   console.log("dots", dots)
  //   let head = dots[dots.length - 1];

  //   switch (this.state.direction) {
  //     case 'RIGHT':
  //       head = [head[0] + 2, head[1]];
  //       break;
  //     case 'LEFT':
  //       head = [head[0] - 2, head[1]];
  //       break;
  //     case 'DOWN':
  //       head = [head[0], head[1] + 2];
  //       break;
  //     case 'UP':
  //       head = [head[0], head[1] - 2];
  //       break;
  //     default:
  //       return;
  //   }
  //   dots.push(head);
  //   dots.shift();
  //   this.setState({
  //     snakeDots: dots
  //   })
  // }
 

  // const checkIfOutOfBorders =() => {
  //   let head = this.state.snakeDots[this.state.snakeDots.length - 1];
  //   if (head[0] >= 100 || head[1] >= 100 || head[0] < 0 || head[1] < 0) {
  //     this.onGameOver();
  //   }
  // }

  // const checkIfCollapsed =()=> {
  //   let snake = [...this.state.snakeDots];
  //   let head = snake[snake.length - 1];
  //   snake.pop();
  //   snake.forEach(dot => {
  //     if (head[0] === dot[0] && head[1] === dot[1]) {
  //       this.onGameOver();
  //     }
  //   })
  // }

  // checkIfEat() {
  //   let head = this.state.snakeDots[this.state.snakeDots.length - 1];
  //   let food = this.state.food;
  //   console.log("foooods", food[0],food[1])
  //   console.log("head", head[0], head[1])
  //   //console.log("foooods", food)
  //   if (head[0] === food[0] && head[1] === food[1]) {
  //     this.setState({
  //       food: getRandomCoordinates()
  //     })
  //     this.enlargeSnake();
  //     // this.increaseSpeed();
  //     this.countingPoints();
  //   }
  // }

  // enlargeSnake() {
  //   let newSnake = [...this.state.snakeDots];
  //   newSnake.unshift([])
  //   this.setState({
  //     snakeDots: newSnake
  //   })
  // }

  // countingPoints() {
  //   this.setState({
  //     totalScore: this.state.totalScore + 10
  //   })
  // }


  // increaseSpeed() {
  //   if (this.state.speed > 10) {
  //     this.setState({
  //       speed: this.state.speed - 10
  //     })
  //   }
  // }

  // onGameOver() {
  //   this.setState({
  //     status: 'game_over'
  //   })
    
  //   const player = {
  //     name: this.state.name,
  //     score: this.state.totalScore
  //   }
  //   localStorage.setItem(player, JSON.stringify(player))


  //   //    var object = {
  //   //  x: 12,
  //   //  y: 56
  //   // }

  //   // localStorage.setItem ("object", JSON.stringify("object"));
  //   // object = JSON.parse (localStorage.getItem ("object"));

  //   //   console.log(typeof object); // объект
  //   //   console.log(object); // Объект {x: 12, y: 56}
    

  //   clearInterval(this.state.intervalId);
  // }

  // onRestartGame() {
  //   this.setState(initialState);
  // }

  const stopMovingSnake =() => {
    console.log("stop moving with pause")
    clearInterval(this.state.intervalId);
  }

   useEffect(() => {
    console.log("check")
  //  document.onkeydown = onKeyDown();
   document.addEventListener("keydown", onKeyDown);
   
    // displaySnake();
  }, [])
 
useEffect(() => {
      console.log("status", status)
    
    if (status === 'pause' || status === 'game_over') {
      stopMovingSnake();
      return;
    }
    // checkIfOutOfBorders();
    // checkIfCollapsed();
    // checkIfEat();
  }, [])

  // componentWillUnmount() {
  //   clearInterval(this.state.intervalId);
  //   document.onkeydown = null;
  // }

  
    // const { status, totalScore, name, food, snakeDots } = this.state
    
    if (status === 'start') {
      return (
        <div>
           <NameForm onCreateNewPlayer={createNewPlayer} />
        </div>)
    }
    if (status === 'game' || status === 'pause') {
      return (
        <div>
          <div>
            {/* <StatusBar score={totalScore} name ={name} status ={status} /> */}
          </div>
          <div className="game-area">
            {/* <Snake snakeDots={snakeDots} />
            <Food dot={food} /> */}
            <Grid rows={rows}/>
          </div>
        </div>)
    }
    
    if (status === 'game_over') {
      return (
        <div>
          {/* <GameOver score={totalScore} onRestart={this.restartGame }/> */}
          <div>
            <h2>GAME OVER</h2>
            {/* <p>Your score {totalScore}</p> */}
            <button type="button" onClick={()=>this.onRestartGame()}>Restart game</button>
        </div>
        </div>)
    }
  
}


