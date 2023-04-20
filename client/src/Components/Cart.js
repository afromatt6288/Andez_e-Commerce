import React, { useState } from "react";
import { Link } from "react-router-dom";
import ItemItem from "./ItemItem";
import { Card } from "semantic-ui-react"

function Cart({ items, vendors, currentUser }) {
    const [cart, setCart] = useState([])
    
    // const { id, name, image, price, category} = item
    const selectedItems = [items[0], items[1]]

    return (
        <section id="cart-items">
            <h2 className="header">{currentUser.username}'s Cart</h2>
            <div className="cart-list">
                <Card.Group className="cards" itemsPerRow={6}>
                    {selectedItems.map((item)=> (
                    <ItemItem key={item.id} item={item} />
                    ))}
                </Card.Group>
            </div>
        </section>
    );
}

export default Cart;