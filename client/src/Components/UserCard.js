import React, { useState } from "react";

function UserCard({user, onUserDelete}) {
    const {id, username, email, shipping_address, account_balance} = user   
    const [accountBalance, setAccountBalance] = useState(`${account_balance}`);
    const [funds, setFunds] = useState(0)
    const [newEmail, setNewEmail] = useState(`${email}`)
    const [newShippingAddress, setNewShippingAddress] = useState(`${shipping_address}`)
    
    function handleUpdate(e) {
        e.preventDefault()
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
            fetch(`http://localhost:5555/users/${id}`, {
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

    function handleUserDelete() {
        fetch(`http://localhost:5555/users/${id}`, {
          method: "DELETE"
        })        
        onUserDelete(id)
    }    

    return (
        <div className ="users">
            <h3>{username}</h3>
            <h3>$ {accountBalance} Nuts</h3>
            <form>
                <label> Add Funds </label>
                <br/>
                <input type="number" onChange={e => setFunds(e.target.value)} value={`${funds}`}/>
                <br/>
                <label> Update Email</label> 
                <br/>
                <input type="text" onChange={e => setNewEmail(e.target.value)} value={newEmail}/>
                <br/>
                <label> Update Address </label>
                <br/>
                <input type="text" onChange={e => setNewShippingAddress(e.target.value)} value={newShippingAddress}/>
                <br/>
                <button type="submit" onClick={handleUpdate}>Submit Changes</button>
            </form>
            <button onClick={handleUserDelete}>Delete</button>
        </div>
    )
}

export default UserCard