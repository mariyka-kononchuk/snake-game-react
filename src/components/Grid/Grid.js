import React, { Component } from 'react';
import Cell from '../Cell';
import s from './Grid.module.css';
import { FIELD_SIZE } from '../../constants/game';

class Grid extends Component {

    
 
    
    render() {
        const cells = [];
        for (let y = 0; y < FIELD_SIZE; y += 1) {
            for (let x = 0; x < FIELD_SIZE; x += 1) {
                cells.push(
                    <Cell x={x} y={y} key={`${y}_${x}`} />
                );
            }
        };

        console.log("grid", cells)
      


        return <div className={s.grid}>{cells}</div>;
    }
}

export default Grid;