import React, { Component } from 'react';
import s from './Cell.module.css';
import { CELL_MARGIN_PX, CELL_SIZE_PX, FIELD_SIZE, CELL_TYPES } from '../../constants/game';


export default class Cell extends Component {

  state = {
        isFood: false,
        isGrid: true
  }
   randomArrayElement(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }
  
  
  render() {
    const { x, y} = this.props;

    //const fruit = this.randomArrayElement(cells);
        
   

    return (
      <div
        className={s.cell_grid}
        style={{
          left: CELL_MARGIN_PX + x * (CELL_SIZE_PX + CELL_MARGIN_PX),
          top: CELL_MARGIN_PX + y * (CELL_SIZE_PX + CELL_MARGIN_PX),
          width: CELL_SIZE_PX,
          height: CELL_SIZE_PX,
        }}
      />
    );
  };
}
// const Cell = () => (
//     <div className={s.cell}></div> 
// )



// export default Cell;