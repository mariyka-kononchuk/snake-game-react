import React from 'react';
import s from './Cell.module.css';
import classNames from 'classnames';

export default function Cell ({type}) {
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

    return (
      <div className={classNames(s.cell, cellClassName)}/>
    );
  };

