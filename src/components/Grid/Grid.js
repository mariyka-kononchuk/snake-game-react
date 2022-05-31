import React, { Component } from 'react';
import { uuid } from 'uuidv4';
import Cell from '../Cell';
import s from './Grid.module.css';
import { FIELD_SIZE } from '../../constants/game';
import Blank from '../blank.png';
import Snake from '../snake.png'
import Food from '../food.png'
export default function Grid ({rows}){
    
    
        // const cells = rows;
        // // for (let y = 0; y < FIELD_SIZE; y += 1) {
        // //     for (let x = 0; x < FIELD_SIZE; x += 1) {
        // //         cells.push(
        // //             <Cell x={x} y={y} key={`${y}_${x}`} />
        // //         );
        // //     }
        // // };

        // console.log("grid", rows)
    const displayRows = rows.map(row => 
    <li >
        {row.map(e => {
            switch (e) {
                case 'blank':
                    return <Cell type={'blank'}  />;
                case 'snake':
                   return <Cell type={'snake'} />;
                case 'food':
                    return <Cell type={'food'} />;
                default:
                    return null;
            }
            
                 })
        }
    </li>
    );
 

   return (
    <div >
        <ul style={{width:'500px', padding:'0px', margin:'0px'}} className='img500'>
            { displayRows }
        </ul>
    </div>
)
    
}

