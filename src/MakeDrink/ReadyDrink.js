import React, { useEffect, useState } from 'react'

const ReadyDrink = ({ arrayNapit }) => {
  if (arrayNapit.length === 0) {
      return <div style={{margin:'50px 0 0 20px'}}>No drink selected</div>;
  }

  const [drinkName, imageName] = arrayNapit;

  return (
      <div style={{margin:'50px 0 0 20px', backgroundColor: 'rgba(0, 0, 0, 0.622)', padding: '5px 10px', height: '300px'}}>
          <h2>{drinkName}</h2>
          <img src={imageName} alt={drinkName} style={{width: '130px', height: '170px'}} />
      </div>
  );
};
export default ReadyDrink;
