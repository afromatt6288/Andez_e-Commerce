import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
import ItemItem from "./ItemItem";
// import ItemDetail from "./ItemDetail";
import { Card } from "semantic-ui-react"

function Cart({ items, vendors, currentUser, cart, onClearCart, onCheckOut, onTransaction}) {
    // const [totalCost, setTotalCost] = useState(0)
    // const [accountBalance, setAccountBalance] = useState(`${currentUser.account_balance}`);

    // useEffect(() => {
    //     let totalCost = 0;
    //     cart.forEach((item) => {
    //       totalCost += item.price;
    //     });
    //     setTotalCost(totalCost);
    // }, [cart, totalCost])

    function handleCheckOut(){
        onCheckOut()
        handleTransaction(currentUser)
    }

    function handleTransaction(currentUser) {
        onTransaction(currentUser)
        onClearCart([])
    }

    function handleClearCart(){
        onClearCart([])
    }


    return (
        <section id="cart-items" className="cart-items">
            <h2 className="header">{currentUser.username}'s Cart</h2>
            <div className="cart-list">
                <Card.Group className="cards" itemsPerRow={6}>
                    {cart.map((item)=> (
                        <ItemItem key={item.id} item={item} />
                        ))}
                </Card.Group>
                <button className="cart-clear" type="submit" onClick={handleClearCart}>Clear Cart</button>
            </div>
            <button className="cart-checkout"type="submit" onClick={handleCheckOut}>Check Out</button>
        </section>
    );
}

export default Cart;