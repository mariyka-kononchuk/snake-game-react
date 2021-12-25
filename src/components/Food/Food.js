import React from 'react';

const Food = (props) => {
 console.log("left",props.dot[0]);
  console.log("top", props.dot[1]);
  console.log("all", props.dot);
  
  const style = {
    left: `${props.dot[0]}%`,
    top: `${props.dot[1]}%`
  }

  return (
    <div className="snake-food" style={style}></div>
  )
 

  
};

export default Food;


 