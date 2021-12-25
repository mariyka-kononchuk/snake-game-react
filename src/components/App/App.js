import React, { Component } from 'react';
import Snake from '../Snake';
import Food from '../Food';
import StatusBar from '../StatusBar';
import NameForm from '../NameForm';
import Grid from '../Grid';

const getRandomCoordinates = () => {
  let min = 1;
  let max = 98;
  let x = Math.floor((Math.random()*(max-min+1)+min)/2)*2;
  let y =  Math.floor((Math.random()*(max-min+1)+min)/2)*2;
  return [x,y]
}

const initialState = {
  food: getRandomCoordinates(),
  speed: 250,
  direction: 'RIGHT',
  totalScore: 0,
  name: '',
  status: 'start',
  intervalId: 0,
  snakeDots: [
    [0,0],
    [2,0]
  ]
}

class App extends Component {

  state = initialState;

  componentDidMount() {
    console.log("check")
    document.onkeydown = this.onKeyDown;
  }

  componentDidUpdate() {
    console.log("status", this.state.status)
    if (this.state.status === 'pause') {
      this.stopMovingSnake();
      return;
    }
    this.checkIfOutOfBorders();
    this.checkIfCollapsed();
    this.checkIfEat();
    
  }
  createNewPlayer = ({name}) => {
    this.setState({
      name: name,
      status: 'game'
    })
  this.startMovingSnake();
  }

  startMovingSnake() {
    console.log("начали движение змейки")
   
    let intervalId  = setInterval(this.moveSnake, this.state.speed);
    this.setState(
      { intervalId: intervalId }
    )
    
  }

  
  onKeyDown = (e) => {
    e = e || window.event;
    switch (e.keyCode) {
      case 38:
        this.setState({direction: 'UP'});
        break;
      case 40:
        this.setState({direction: 'DOWN'});
        break;
      case 37:
        this.setState({direction: 'LEFT'});
        break;
      case 39:
        this.setState({direction: 'RIGHT'});
        break;
      case 32:
        if (this.state.status === 'game') {
          this.setState({ status: 'pause' })
          this.stopMovingSnake();
          return;
        }
        if (this.state.status === 'pause') {
          this.setState({ status: 'game' });
          this.startMovingSnake();
          return;
        }
        
        break;
      default:
        return;
    }
  }

  moveSnake = () => {
    console.log("змейка двигается")
    
    let dots = [...this.state.snakeDots];
    console.log("dots", dots)
    let head = dots[dots.length - 1];

    switch (this.state.direction) {
      case 'RIGHT':
        head = [head[0] + 2, head[1]];
        break;
      case 'LEFT':
        head = [head[0] - 2, head[1]];
        break;
      case 'DOWN':
        head = [head[0], head[1] + 2];
        break;
      case 'UP':
        head = [head[0], head[1] - 2];
        break;
      default:
        return;
    }
    dots.push(head);
    dots.shift();
    this.setState({
      snakeDots: dots
    })
  }

  checkIfOutOfBorders() {
    let head = this.state.snakeDots[this.state.snakeDots.length - 1];
    if (head[0] >= 100 || head[1] >= 100 || head[0] < 0 || head[1] < 0) {
      this.onGameOver();
    }
  }

  checkIfCollapsed() {
    let snake = [...this.state.snakeDots];
    let head = snake[snake.length - 1];
    snake.pop();
    snake.forEach(dot => {
      if (head[0] === dot[0] && head[1] === dot[1]) {
        this.onGameOver();
      }
    })
  }

  checkIfEat() {
    let head = this.state.snakeDots[this.state.snakeDots.length - 1];
    let food = this.state.food;
    console.log("foooods", food)
    if (head[0] === food[0] && head[1] === food[1]) {
      this.setState({
        food: getRandomCoordinates()
      })
      this.enlargeSnake();
      // this.increaseSpeed();
      this.countingPoints();
    }
  }

  enlargeSnake() {
    let newSnake = [...this.state.snakeDots];
    newSnake.unshift([])
    this.setState({
      snakeDots: newSnake
    })
  }

  countingPoints() {
    this.setState({
      totalScore: this.state.totalScore + 10
    })
  }

  

  // increaseSpeed() {
  //   if (this.state.speed > 10) {
  //     this.setState({
  //       speed: this.state.speed - 10
  //     })
  //   }
  // }

  onGameOver() {
    alert(`Game Over. Snake length is ${this.state.snakeDots.length}`);
    this.setState(initialState);
    // clearInterval(this.state.intervalId);
  }

  stopMovingSnake() {
    console.log("stop moving with pause")
    clearInterval(this.state.intervalId);
  }

  componentWillUnmount() {
    clearInterval(this.state.intervalId);
    document.onkeydown = null;
  }

  render() {
    return (
      <div>
        {/* <div>
          <Grid cells={this.state.grid} />
        </div> */}
        <div>
          <StatusBar score={this.state.totalScore} name ={this.state.name} status ={this.state.status} />
          
        </div>
        {this.state.status !=='start'?
          <div >
          No start form
          </div>:
          <NameForm onCreateNewPlayer={this.createNewPlayer} />}
        {this.state.status === 'game' || this.state.status === 'pause'?
          <div className="game-area">
            <Snake snakeDots={this.state.snakeDots} />
            <Food dot={this.state.food} />
          </div>:<div></div>}
      </div>
    );
  }
}

export default App;
