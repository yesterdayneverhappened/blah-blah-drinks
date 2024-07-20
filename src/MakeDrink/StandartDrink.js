
import React, { useEffect, useState, useCallback, useRef, useContext, useLayoutEffect } from 'react'

import './assets/StandartDrink.css'
import { DataContext } from './Bar';
import getColorForName from './assets/getColorFotName';



export default function StandartDrink(props) {
    const { name, imageName, borderColor, onValueChange, butClick, reset, onResetComplete} = props;
    let [colorBorder, setColorBorder] = useState([]);

    setColorBorder = borderColor;
    
    let path = `imgDrink/${imageName}.png`;
    let [backgroundColor, satBack] = useState('');
    
    const buttonRef = useRef(null);
    const [cellColors, setCellColors] = useState(new Array(6).fill(null));
    const handleButClick = useCallback(() => {
        onValueChange(name);
        butClick(name);
        satBack = getColorForName(name);

        const newCellColors = [...cellColors];

        // Получаем цвет для текущего напитка
        const drinkColor = getColorForName(name);

        // Находим первый пустой элемент и заполняем его цветом напитка
        for (let i = 0; i < newCellColors.length; i++) {
            if (newCellColors[i] === null) {
                newCellColors[i] = drinkColor;
                break;
            }
        }

        // Обновляем состояние
        setCellColors(newCellColors);
    }, [props.name, onValueChange]);


    const [drinkArrDiv,setDrinkArrDiv] = useState([]);
    useLayoutEffect(() => {
        setDrinkArrDiv(
          Array(6)
            .fill(null)
            .map((_, index) => ({ key: index, ref: React.createRef() }))
        );
      }, []);

    
    useEffect(() => {
        const matchingItem = drinkArrDiv.find(item => item.name === name);
        if (matchingItem) {
          matchingItem.ref.current.style.backgroundColor = colorBorder[drinkArrDiv.indexOf(matchingItem)];
        }
        console.log("2323")
      }, [colorBorder, name, drinkArrDiv]);

      useEffect(() => {
        if (reset) {
            setCellColors(new Array(6).fill(null));
            onResetComplete();
        }
    }, [reset, onResetComplete]);
  return (
    <div className='infoDrink'>
            <h3>{name}</h3>
            <div className='drink'>
                <img src={path} width="70px" alt="drink" />
                <div className='table'>
                    <div className="container">
                        {drinkArrDiv.slice(0, 3).map((item, index) => (
                            <div
                                key={index}
                                className="block"
                                style={{
                                    backgroundColor: cellColors[index] || 'transparent',
                                    borderColor: borderColor
                                }}
                                name={name}
                                ref={item.ref}
                            />
                        ))}
                    </div>
                    <div className="container">
                        {drinkArrDiv.slice(3, 6).map((item, index) => (
                            <div
                                key={index + 3}
                                className="block"
                                style={{
                                    backgroundColor: cellColors[index + 3] || 'transparent',
                                    borderColor: borderColor
                                }}
                                name={name}
                                ref={item.ref}
                            />
                        ))}
                    </div>
                </div>
            </div>
            <button className='addBut' onClick={handleButClick} name={name}>Add</button>
        </div>
  )
}
