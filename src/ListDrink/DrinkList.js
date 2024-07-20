import React from 'react';
import './assets/DrinkList.css'

const DrinksList = ({ drinks }) => {
  return (
    <div>
      <h3>Drinks:</h3>
      <ul className='drinks-container' type='none'>
        {drinks.map(([name, ingredients, imgPath, price], index) => (
          <li key={index}>
            <h4>{name}</h4>
            <p>Ingridients:</p>
            <ul>
              {ingredients.map((ingredient, i) => (
                <li key={i}>{ingredient}</li>
              ))}
            </ul>
            <img src={imgPath} alt={name} />
            <p>Price: <span style={{color: 'green'}}>{price}$</span></p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DrinksList;