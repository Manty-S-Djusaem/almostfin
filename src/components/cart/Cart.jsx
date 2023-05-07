import React, { useContext, useState, useEffect } from 'react';
import { ContextBox } from '../../App';
import module from './Cart.module.scss';

const Cart = () => {
  const [box, setBox] = useContext(ContextBox);
  const [numItems, setNumItems] = useState(0);

  useEffect(() => {
    setNumItems(box.length);
  }, [box]);

  const allProducts = box.map((item, index) => {
    return (
      <div className={module.maincards} key={index}>
        <div className={module.photo}>
          <div className={module.line2}>
            <img src={item.image} alt='' />
          </div>
        </div>
        <div className={module.cardbody}>
          <div className={module.name}>
            <h3>{item.title}</h3>
          </div>

          <div className={module.price}>{item.price} som</div>
          <div className={module.pr}>
            <button
              className={module.btncart}
              onClick={() => removeItem(index)}
            >
              УДАЛИТЬ
            </button>
          </div>
          <div className={module.line}></div>
        </div>
      </div>
    );
  });

  const removeItem = (index) => {
    const newBox = [...box];
    newBox.splice(index, 1);
    setBox(newBox);
  };

  return (
    <div className={module.container}>
      <h2 className={module.text1}>Корзина:</h2>
      <span className={module.numItems}>{numItems}</span>
      {allProducts}
    </div>
  );
};

export default Cart;