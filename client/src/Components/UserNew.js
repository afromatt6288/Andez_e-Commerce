import React, { useState } from "react";
import { useHistory } from "react-router-dom";

function UserNew({onNewUser, toggle, setUser}) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");
    const [email, setEmail] = useState("");
    const [shippingAddress, setShippingAddress] = useState("");

    const history = useHistory();
    
    function handleSubmit(e) {
        e.preventDefault()
        const formData = {
                username: username,
                password: password,
                password_confirmation: passwordConfirmation,
                email: email,
                shipping_address: shippingAddress,
                account_balance: 5,
                admin: false
        }
        fetch("http://localhost:5555/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        })
            .then(r => r.json())
            .then(user => {
                // setUser(user)
                onNewUser(user)
                history.push(`/`)
            })
            toggle()
    }    

    return (
        <section className="user-signup" id="signup-form">
            <form onSubmit={handleSubmit}>
                <p> Welcome New User <br/> Create Account Below!</p>
                <label htmlFor="username">Username</label>
                <input
                    type="text"
                    id="username"
                    autoComplete="off"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="current-password"
                />
                <label htmlFor="password">Password Confirmation</label>
                <input
                    type="password"
                    id="password_confirmation"
                    value={passwordConfirmation}
                    onChange={(e) => setPasswordConfirmation(e.target.value)}
                    autoComplete="current-password"
                />
                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoComplete="current-email"
                />
                <label htmlFor="shippingAddress">Shipping Address</label>
                <input
                    type="shippingAddress"
                    id="shippingAddress"
                    value={shippingAddress}
                    onChange={(e) => setShippingAddress(e.target.value)}
                    autoComplete="current-shippingAddress"
                />
                 <button type="submit">Create New Profile</button>
            </form>
                <button className="new-user-button" onClick={onNewUser}>Returning User? Login!</button>
        </section>
    )
}

export default UserNew