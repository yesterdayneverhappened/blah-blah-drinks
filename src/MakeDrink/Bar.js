import React, { createContext, useEffect, useState, useCallback, useRef } from 'react'
import StandartDrink from './StandartDrink'
import './assets/Bar.css'
import Shaker from '../imgDrink/napit/mixer.png'
import StatusMix from './StatusMix';
import ReadyDrink from './ReadyDrink';
import allNapit from './assets/recept'
import ListDrinks from './assets/listDrink';
import Balanse from './Balanse';
import getColorForName from './assets/getColorFotName';
import saveObject from './assets/saveOnJSON';
import getObject from './assets/loadFromJSON';
import TrashImage from '../imgDrink/napit/trash.png';
import Cat from '../imgDrink/dop/cat.gif'
import AsyncStorage from '@react-native-async-storage/async-storage';

export const DataContext = createContext();

export default function Bar() {

    let [balance, setBalance] = useState(0);
    useEffect(() => {
        const loadBalance = async () => {
          const savedBalance = await getObject('balance');
          if (savedBalance !== null || savedBalance !== 0) {
            setBalance(savedBalance);
          }
        };
        loadBalance();
      }, []);
    useEffect(() => {
        saveObject('balance', balance); 
    }, [balance]);

    const [colorBorder, setColorBorder] = useState([]);
    const handleButClickRef = (name) => {
        const colorForBlock = getColorForName(name);
        setColorBorder((prevColorBorder) => [...prevColorBorder, colorForBlock]);
        console.log(colorBorder);
        return colorForBlock;
    };

    function getRandomNumber() {
        return Math.floor(Math.random() * 11) + 10;
      }
    let [countCock, setCountCock] = useState(null);
    useEffect(() => {
        const loadShift = async () => {
          try {
            const savedShift = await getObject('shift');
            console.log('Loaded shift:', savedShift); // Отладка
      
            if (savedShift !== null && savedShift !== 0) {
              setCountCock(savedShift);
            } else {
              // Если сохраненного значения нет или оно равно 0, генерируем новое случайное число
              const newShift = getRandomNumber();
              await saveObject('shift', newShift);
              setCountCock(newShift);
            }
          } catch (error) {
            console.error('Failed to load/save shift:', error);
          }
        };
      
        loadShift();
      }, [getObject, saveObject]);
      
      useEffect(() => {
        if (countCock !== null) {
          console.log('CountCock changed:', countCock); // Отладка
      
          if (countCock === 0) {
            // Если значение countCock достигло 0, генерируем новое случайное число
            const newShift = getRandomNumber();
            saveObject('shift', newShift).catch(error => {
              console.error('Failed to save shift:', error);
            });
            setCountCock(newShift);
            setBalance(prevBalance => prevBalance * 0.85);
          } else {
            saveObject('shift', countCock).catch(error => {
              console.error('Failed to save shift:', error);
            });
          }
        }
      }, [countCock, saveObject, setBalance]);
    

    const [allDrinks, setAllDrinks] = useState([]);
    const handleDataFromChild = (drink) => {
        if(allDrinks.length <= 5){
            setAllDrinks((allDrinks) => [...allDrinks, drink]);
        }
        
    };
    useEffect(() => {
        if (allDrinks.length > 0 ) {
            console.log(allDrinks);
        }
    },[allDrinks.length])


    const resetDrinks = () => {
        setColorBorder([]);
        setAllDrinks([]);
        setReset(true);
    }
    const [reset, setReset] = useState(false);
    const handleResetComplete = () => {
        setReset(false);
    };
    
    let [readyNapitok,setReadyNapitok] = useState([]);
    const mixDrinks = (allNapit, allDrinks) => {
        const sortedUserIngredients = allDrinks.slice().sort();

        for (const [drinkName, recipeIngredients, imageName, price] of allNapit) {
            const sortedRecipeIngredients = recipeIngredients.slice().sort();
    
            if (sortedUserIngredients.length === sortedRecipeIngredients.length &&
                sortedUserIngredients.every((ingredient, index) => ingredient === sortedRecipeIngredients[index])) {
                setReadyNapitok([drinkName, imageName]);
                console.log([drinkName, imageName]);
                setBalance(balance + price);
                setCountCock(countCock-1);
                resetDrinks();
                return; // Прерывание функции после нахождения правильного напитка
            }
        }

        setReadyNapitok(['Trash -10$', TrashImage]);
        setBalance(balance-10);
    }
  return (
    <DataContext.Provider value={colorBorder}>
        
            <div className='shift'><p>Number of cocktails per shift: {countCock}</p></div>
            <ReadyDrink arrayNapit={readyNapitok} returnNapit={mixDrinks}/>
            <div className='AllStandartDrink'>
                <div className='container'>
                    {ListDrinks.slice(0,3).map((item, index) =>(
                        <StandartDrink 
                            key={index}
                            name={item.name}
                            imageName={item.imageName}
                            borderColor={item.borderColor}
                            onValueChange = {handleDataFromChild}
                            butClick = {handleButClickRef}
                            reset={reset}
                            onResetComplete={handleResetComplete}
                        />
                        
                    ))}
                </div>
                <div className='container'>
                    {ListDrinks.slice(3,4).map((item, index) =>(
                            <StandartDrink 
                                key={index}
                                name={item.name}
                                imageName={item.imageName}
                                borderColor={item.borderColor}
                                onValueChange = {handleDataFromChild}
                                butClick = {handleButClickRef}
                                reset={reset}
                                onResetComplete={handleResetComplete}
                            />
                    ))}
                    <div className='mixer'>
                        <img src={Shaker} style={{width: '110px', height: '130px'}}/>
                    </div>
                    {ListDrinks.slice(4).map((item, index) =>(
                            <StandartDrink 
                                key={index}
                                name={item.name}
                                imageName={item.imageName}
                                borderColor={item.borderColor}
                                onValueChange = {handleDataFromChild}
                                butClick = {handleButClickRef}
                                reset={reset}
                                onResetComplete={handleResetComplete}
                            />
                    ))}
                    
                </div>
                <div className='container'>
                    <div className='butRes'>
                        <button onClick={resetDrinks}>Reset</button>
                    </div>
                    <div className='status'>
                        <StatusMix/>
                    </div>
                    <div className='butMix'>
                        <button onClick={() => mixDrinks(allNapit, allDrinks, readyNapitok)}>Mix</button>
                    </div>
                    
                </div>
                <Balanse balance={balance}/>
            </div>
            <div style={{marginTop:'50px'}}><img src={Cat} style={{height: '200px', width: '200px'}}></img></div>
        
    </DataContext.Provider>
  )
}
