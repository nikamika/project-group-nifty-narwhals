import React from 'react';
const DateTimeDisplay = ({ value, type, isDanger }) => {
  return (
    //the boolean setting for time judge
    <div className={isDanger ? 'countdown danger' : 'countdown'}>
      <p>{value}</p>
      <span>{type}</span>
    </div>
  );
};

export default DateTimeDisplay;
