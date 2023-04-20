import React, { useState } from "react";

function UserCard({user, handleUserDelete}) {
    const {id, username, email, shipping_address, account_balance} = user   
    const [accountBalance, setAccountBalance] = useState(`${account_balance}`);
    const [funds, setFunds] = useState(0)
    const [newEmail, setNewEmail] = useState(`${email}`)
    const [newShippingAddress, setNewShippingAddress] = useState(`${shipping_address}`)
    const [creditCard, setCreditCard] = useState({
        number: '',
        expiration: '',
        secret: ''
    })
    const [isCreditCardValid, setIsCreditCardValid] = useState(false)

    function handleCreditCardChange(e) {
        const {name, value} = e.target
        setCreditCard(prevState => ({
            ...prevState,
            [name]: value
        }))
        setIsCreditCardValid(creditCard.number.length === 16 && creditCard.expiration.length > 0 && creditCard.secret.length === 3)
    }

    function handleUpdate(e) {
        e.preventDefault()
        if ((funds != 0) && (!isCreditCardValid)) {
            alert("Please enter valid credit card information.")
            return
        }
        const formData = {
            email: newEmail,
            shipping_address: newShippingAddress,
            account_balance: parseInt(accountBalance) + parseInt(funds),
        }
        const updatedBalance = parseInt(accountBalance) + parseInt(funds);
        if (updatedBalance < 1) {
            setAccountBalance(accountBalance);
            alert("Not Enough Nuts");
        } else {
            fetch(`http://127.0.0.1:5555/users/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            })
            .then(r => r.json())
            .then(user => {
                setAccountBalance(user.account_balance)
                setNewEmail(user.email)
                setNewShippingAddress(user.shipping_address)
            })
        }
    }

    function handleUserFrontEndDelete() {
        fetch(`http://127.0.0.1:5555/users/${id}`, {
          method: "DELETE"
        })        
        handleUserDelete(id)
    }    

    return (
        <div className ="users">
            <h3>{username}</h3>
            <h3>$ {accountBalance} Nuts</h3>
            <form>
                <label> Update Email</label> 
                <br/>
                <input type="text" onChange={e => setNewEmail(e.target.value)} value={newEmail}/>
                <br/>
                <label> Update Address </label>
                <br/>
                <input type="text" onChange={e => setNewShippingAddress(e.target.value)} value={newShippingAddress}/>
                <br/>
                {isCreditCardValid ? (
                    <>
                    <label> Add Funds </label>
                    <br/>
                    <input type="number" onChange={e => setFunds(e.target.value)} value={`${funds}`}/>
                    </>
                ) : (
                    <>
                    <p>Please enter your credit card information to add funds.</p>
                    </>
                )}
                <label> Credit Card Number </label>
                <br/>
                <input type="number" name="number" onChange={handleCreditCardChange} value={creditCard.number}/>
                <br/>
                <label> Exp Date </label> 
                <br/>
                <input type="text" name="expiration" onChange={handleCreditCardChange} value={creditCard.expiration}/>
                <br/>
                <label> Secret Key </label>
                <br/><input type="number" name="secret" onChange={handleCreditCardChange} value={creditCard.secret}/>
                <br/>
                <button type="submit" onClick={handleUpdate}>Submit Changes</button>   
            </form>
            <button onClick={handleUserFrontEndDelete}>Delete Account</button>
        </div>
    )
}

export default UserCard