import React from 'react';
import { useParams } from "react-router-dom";
import { useEffect, useContext } from "react";
import { doc, getDoc } from "firebase/firestore";
import { database } from '../app/firebase';
import { useState } from "react";
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import { ContextBox } from '../App';
import { Link } from "react-router-dom";
import module from './Products.module.scss'

const Products = (props) => {
    const id = useParams()
    const [towar, setTowar] = useState(null)
    const [box, setBox] = useContext(ContextBox)
    useEffect(() => {
        getData()
    }, [])

    async function getData() {
        const productRef = doc(database, "product", id.id);
        const productDoc = await getDoc(productRef);
        if (productDoc.exists()) {
            setTowar({ ...productDoc.data(), id: productDoc.id })
        } else {
            console.log("No such document!");
        }
    }

    function addToCart(event) {
        const currentCard = event.currentTarget.closest('.card')

        if (box.find(item => item.id === currentCard.querySelector('.id-card').dataset.id)) {
            const index = box.findIndex(item => item.id === currentCard.querySelector('.id-card').dataset.id)
            let nexBox = box;
            nexBox[index].count++;
            setBox(nexBox)
        } else {
            setBox([
                ...box,
                {
                    image: currentCard.querySelector('.card-img-top').getAttribute('src'),
                    title: currentCard.querySelector('.card-title').innerHTML,
                    description: currentCard.querySelector('.card-text').innerHTML,
                    price: currentCard.querySelector('.price-product').innerHTML,
                    id: currentCard.querySelector('.id-card').dataset.id,
                    count: 1
                }
            ])
        }
    }

    const viewTowar = towar ? (
        <div className={module.maincards}>
            <Card>
                <div className="id-card" data-id={towar.id}></div>
                <Card.Img variant="top" src={towar.photo} />
                <Card.Body>
                    <div className={module.name}>
                        <Card.Title>
                            {towar.name}
                        </Card.Title>
                    </div>
                    <div className={module.description}>
                        <Card.Text>
                            {towar.description}
                        </Card.Text>
                    </div>
                </Card.Body>
                <div className={module.price}>
                    <Card.Footer>
                        <div className={module.price}><span className="price-product">{towar.price}</span>$</div>
                        <button className="btn btn-primary" onClick={addToCart}>Add to Cart</button>
                    </Card.Footer>
                </div>
            </Card>
        </div>
    ) : (
        <div>Loading...</div>
    )

    return (
        <div>
            <div className={module.container}>
                <h1 className={module.text1}>Product Page</h1>
                <div className={module.main}>
                    {viewTowar}
                </div>
            </div>
        </div>
    );
}

export default Products;
