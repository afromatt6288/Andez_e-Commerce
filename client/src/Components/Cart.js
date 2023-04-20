import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
import ItemItem from "./ItemItem";
// import ItemDetail from "./ItemDetail";
import { Card } from "semantic-ui-react"

function Cart({ items, vendors, currentUser, cart}) {
    const [totalCost, setTotalCost] = useState(0)
    const [accountBalance, setAccountBalance] = useState(`${currentUser.account_balance}`);

    useEffect(() => {
        let totalCost = 0;
        cart.forEach((item) => {
          totalCost += item.price;
        });
        setTotalCost(totalCost);
    }, [cart, totalCost])

    function handleCheckOut(e){
        e.preventDefault()
        console.log(accountBalance)
        console.log(totalCost)
        const updatedBalance = parseInt(accountBalance) - parseInt(totalCost);
        console.log(updatedBalance)
        if (updatedBalance < 1) {
            setAccountBalance(accountBalance);
            alert("Not Enough Nuts. Please Nut Up in your profile.");
            return
        } else {
            const formData = {
                account_balance: parseInt(updatedBalance),
            }
            fetch(`/users/${currentUser.id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            })
            .then(r => r.json())
            .then(user => {
                setAccountBalance(user.account_balance)
                console.log(user.account_balance)
                console.log(accountBalance)
                handleTransaction(user)
            })
        }
    }

    function handleTransaction(currentUser) {
        setAccountBalance(currentUser.account_balance)
        console.log(currentUser)
        console.log(accountBalance)
        console.log(currentUser.account_balance)
        console.log("this is the transaction")
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
            </div>
            <button type="submit" onClick={handleCheckOut}>Check Out</button>
        </section>
    );
}

export default Cart;