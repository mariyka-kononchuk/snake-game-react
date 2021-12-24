import React, { Component } from 'react';
import Snake from '../Snake';
import Food from '../Food';
import StatusBar from '../StatusBar';

const getRandomCoordinates = () => {
  let min = 1;
  let max = 98;
  let x = Math.floor((Math.random()*(max-min+1)+min)/2)*2;
  let y =  Math.floor((Math.random()*(max-min+1)+min)/2)*2;
  return [x,y]
}

const initialState = {
  food: getRandomCoordinates(),
  speed: 200,
  direction: 'RIGHT',
  totalScore: 0,
  snakeDots: [
    [0,0],
    [2,0]
  ]
}

class App extends Component {

  state = initialState;

  componentDidMount() {
    setInterval(this.moveSnake, this.state.speed);
    document.onkeydown = this.onKeyDown;
  }

  componentDidUpdate() {
    this.checkIfOutOfBorders();
    this.checkIfCollapsed();
    this.checkIfEat();
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
      default:
                return;
    }
  }

  moveSnake = () => {
    let dots = [...this.state.snakeDots];
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
    if (head[0] === food[0] && head[1] === food[1]) {
      this.setState({
        food: getRandomCoordinates()
      })
      this.enlargeSnake();
      this.increaseSpeed();
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

  increaseSpeed() {
    if (this.state.speed > 10) {
      this.setState({
        speed: this.state.speed - 10
      })
    }
  }

  onGameOver() {
    alert(`Game Over. Snake length is ${this.state.snakeDots.length}`);
    this.setState(initialState)
  }

  render() {
    return (
      <div className="game-area">
        <StatusBar score={this.state.totalScore}/>
        <Snake snakeDots={this.state.snakeDots}/>
        <Food dot={this.state.food}/>
      </div>
    );
  }
}

export default App;
// import React, { Component } from 'react';
// import { v4 as uuidv4 } from 'uuid';
// import data from '../../data/contacts.json'
// import s from './App.module.css';

// import Container from '../Container';
// import ContactForm from '../ContactForm';
// import Filter from '../Filter';
// import ContactList from '../ContactList';

// class App extends Component {

//   state = {
//     contacts: data,
//     filter: ''
//   }

//   addContact = ({ name, number }) => {
//     const { contacts } = this.state;
//     const contact = {
//       id: uuidv4(),
//       name,
//       number
//     };
    
//     if (contacts.find(option => option.name.toLowerCase() === name.toLowerCase())) {
//       alert(`${name} is already in contacts`);
//       return;
//     }
    
//     this.setState(({ contacts }) => ({
//       contacts: [contact, ...contacts]
//     }))
//   }
  
//   deleteContact = contactId => {
//     this.setState(prevState => ({
//       contacts:prevState.contacts.filter(contact => contact.id !==contactId),
//     }))
//   }

//   changeFilter = e => {
//     this.setState({ filter: e.currentTarget.value });
//   }

//   getVisibleContacts = () => {
//     const { contacts, filter } = this.state;
//     const normilizedFilter = filter.toLowerCase();
//     return contacts.filter(contact =>
//       contact.name.toLowerCase().includes(normilizedFilter));
//   }
  
//   componentDidMount() {
//     const contacts = localStorage.getItem('contacts');
//     const parsedContacts = JSON.parse(contacts);
//     if (parsedContacts) {
//       this.setState({ contacts: parsedContacts });
//     }
//   }

//   componentDidUpdate(prevPops, prevState) {
//     const { contacts} = this.state;
//     if (contacts !== prevState.contacts) {
//       localStorage.setItem('contacts', JSON.stringify(contacts));
//     }
//   }

//   render() {
//     const { filter } = this.state;
//     const visibleContacts = this.getVisibleContacts();
//     return (
//       <Container>
//         <div>
//           <h1 className={s.titlePhonebbok}>Phonebook</h1>
//           <ContactForm onAddContact={this.addContact} />
//           <h2 className={s.titleContacts}>Contacts</h2>
//           <Filter value={filter} onChange={this.changeFilter} />
//           <ContactList contacts={visibleContacts} onDeleteContact={this.deleteContact} />
//         </div>
//       </Container>
//     );
//   }
// }

// export default App;

