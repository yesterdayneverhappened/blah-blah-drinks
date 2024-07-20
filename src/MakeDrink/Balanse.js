import React, { useEffect, useState } from 'react';
import './assets/Balanse.css';
import getObject from './assets/loadFromJSON';

export default function Balanse({ balance }) {

    const [displayedBalance, setDisplayedBalance] = useState(0);

    useEffect(() => {
      const loadBalance = async () => {
        try {
          const newBalance = await getObject('balance', balance);
          setDisplayedBalance(newBalance);
        } catch (error) {
          console.error('Failed to load balance:', error);
        }
      };
      loadBalance();
    }, [balance, getObject, setDisplayedBalance]);

  return (
    <div className='balanse'><p>{displayedBalance}$</p></div>
  );
}
