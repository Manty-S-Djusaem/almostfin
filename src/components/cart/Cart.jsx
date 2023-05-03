import React from 'react';

import { ContextBox } from '../../App';
import { useContext } from "react"
import { removeItem } from 'localforage';
import module from './Cart.module.scss'

const Cart = (props) => {
    const [box, setBox] = useContext(ContextBox)

    const allProducts = box.map((item, index) => {


        return (
            <div className={module.maincards} key={index}>
                <div className={module.photo}>
                <div className={module.line2}>
                    <img src={item.image} alt="" /> </div>
                </div>
                <div  className={module.cardbody}>
                <div className={module.name}> <h3>{item.title} </h3> </div>
                
                <div className={module.price}>{item.price} som</div>
                <div className={module.pr}><button className={module.btncart}>УДАЛИТЬ</button></div>
                <div className={module.line}> </div>
            </div></div>
        )
    })

    return (
        <div>
            <div className={module.container}>
            <h2 className={module.text1}>Корзина:</h2>

                {allProducts}
            </div>
        </div>
    )
};
export default Cart;