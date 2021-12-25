import React from 'react';

const StatusBar = ({ score, name, status }) => {
    return (
        <div>Score:{score}, Name: {name}, Status: { status}</div>
  )
};

export default StatusBar;