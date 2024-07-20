import React, { useLayoutEffect, useState, useRef, useContext } from 'react'
import './assets/StatusMix.css'
import { DataContext } from './Bar';

export default function StatusMix() {
  const colorBorder = useContext(DataContext);

  const [arrDiv, setArrDiv] = useState([]);

  useLayoutEffect(() => {
    setArrDiv(
      Array(8)
        .fill(null)
        .map((_, index) => ({ key: index, ref: React.createRef() }))
    );
  }, []);
  
  useLayoutEffect(() => {
    let i = 0;
    arrDiv.forEach(item => {
      if (item.ref.current !== null) {
        item.ref.current.style.borderColor = colorBorder[i];
        i++;
      }
    });
  }, [arrDiv, colorBorder]);

  return (
    <>
      <div className="container">
        {arrDiv.map(item => (
          <div key={item.key} className="blockMin" style={{ borderColor: colorBorder }} ref={item.ref}></div>
        ))}
      </div>
      
    </>
  );
}
