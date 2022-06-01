import React from 'react';
import Cell from '../Cell';

export default function Grid ({rows}) {
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
            })}
        </li>
    );
 

   return (
    <>
        <ul style={{width:'500px', padding:'0px', margin:'0px'}} className='img500'>
            { displayRows }
        </ul>
    </>
    )
}

