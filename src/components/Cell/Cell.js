import React, { Component } from 'react';
import s from './Cell.module.css';
import { CELL_MARGIN_PX, CELL_SIZE_PX, FIELD_SIZE, CELL_TYPES } from '../../constants/game';
//import styles from './styles.module.scss';
import classNames from 'classnames';

export default function Cell ({type}){

  // state = {
  //       isFood: false,
  //       isGrid: true
  // }

  //  randomArrayElement(arr) {
  //   return arr[Math.floor(Math.random() * arr.length)];
  // }
  
  
  
    // const { x, y, cellType, isSnakeHead} = this.props;
 
        let cellClassName;

        switch (type) {
            case 'blank': {
                cellClassName = s.blankCell;
                break;
            }
            case 'snake': {
                cellClassName = s.snakeCell;
                break;
            }
            case 'food': {
                cellClassName = s.fruitCell;
                break;
            }
            default:
        }
    //const fruit = this.randomArrayElement(cells);
        
   

    return (
      <div
        className={classNames(s.cell, cellClassName)}
        
  
        // style={{
        //   left: CELL_MARGIN_PX + x * (CELL_SIZE_PX + CELL_MARGIN_PX),
        //   top: CELL_MARGIN_PX + y * (CELL_SIZE_PX + CELL_MARGIN_PX),
        //   width: CELL_SIZE_PX,
        //   height: CELL_SIZE_PX,
        // }}
      />
    );
  };

// const Cell = () => (
//     <div className={s.cell}></div> 
// )



// export default Cell;