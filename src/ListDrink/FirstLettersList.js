import React from 'react';
import './assets/FirstLetterList.css';

const FirstLettersList = ({ letters, onLetterClick }) => {
  return (
    <div>
      <h3>First letters of drinks:</h3>
      <ul type='square'>
        {letters.map((letter) => (
          <li key={letter} onClick={() => onLetterClick(letter)} className='firstLetters'>
            {letter}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FirstLettersList;