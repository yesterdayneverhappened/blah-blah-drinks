import React, { useState, useEffect } from 'react';
import FirstLettersList from './FirstLettersList';
import DrinksList from './DrinkList';
import allNapit from '../MakeDrink/assets/recept';
import './assets/DrinkList.css';
import './assets/MainList.css'

const MainList = () => {
  const [uniqueLetters, setUniqueLetters] = useState([]);
  const [filteredDrinks, setFilteredDrinks] = useState([]);

  useEffect(() => {
    const getUniqueFirstLetters = (drinks) => {
      const firstLetters = new Set();
      for (const [name, a, b, prise] of drinks) {
        firstLetters.add(name.charAt(0).toUpperCase());
      }
      return Array.from(firstLetters).sort();
    };

    setUniqueLetters(getUniqueFirstLetters(allNapit));
    setFilteredDrinks([]);
  }, []);

  const handleLetterClick = (letter) => {
    setFilteredDrinks(allNapit.filter(([name, _]) => name.startsWith(letter)));
  };

  return (
    <div className='mainList'>
      <FirstLettersList letters={uniqueLetters} onLetterClick={handleLetterClick} />
      <div>
        <DrinksList drinks={filteredDrinks} />
      </div>
    </div>
  );
};

export default MainList;