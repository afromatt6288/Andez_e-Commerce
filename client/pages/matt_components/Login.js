import React, {useState} from "react";
// import { useHistory } from "react-router-dom"
import { useRouter } from 'next/router'

import NewUser from "./NewUser"

function Login ({currentUser, setCurrentUser, toggle, admin, onAdmin, users, onAddUser}) {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [isPasswordSecure, setIsPasswordSecure] = useState(true)
    const [invalidUser, setInvalidUser] = useState(false)
    const [newUser, setNewUser] = useState(false)
    
    const router = useRouter()
 
    function handleSubmit(e) {
        e.preventDefault();
        fetch("http://localhost:5555/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, password }),
        }).then((r) => {
          if (r.ok) {
            r.json().then((user) => setCurrentUser(user));
            router.push(`/`)
            toggle()
          } else { 
            setInvalidUser(e=>setInvalidUser(!invalidUser))
    }});
      }

    function handleNewUser(addUser){
        onAddUser(addUser)
        setNewUser(!newUser)
    }

    function handleLogoutClick() {
        fetch("/logout", { method: "DELETE" }).then((r) => {
          if (r.ok) {
            setCurrentUser(null);
          }
        });
      }

    return (
        <div className="modal">
            <div className="modal_content">
                {currentUser ? 
                <div className="admin">
                <h4>{currentUser.username}</h4>
                <h4>$ {currentUser.account_balance} Nuts</h4>
            </div>
                : newUser ? <NewUser onNewUser={handleNewUser} toggle={toggle}/> :
                <form onSubmit={handleSubmit}>
                    <input type="text" id="username" placeholder="User Name" value={username} onChange={e => setUsername(e.target.value) }/>
                    <input type={isPasswordSecure? "password" : "text"} id="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)}/>
                    <span className="show-password-button"><input label="show-password" type="checkbox" checked={!isPasswordSecure} onChange={(e)=>setIsPasswordSecure(!isPasswordSecure)}/> Show</span>
                    <br/>
                    <button type="submit">Login</button>
                <   br/>
                    {invalidUser ? <small>Invalid User</small> : null}
                    <button className="new-user-button" onClick={e=>setNewUser(!newUser)}>New User? Sign up here!</button> 
                </form>}
                {currentUser ? 
                <button className="login-button" onClick={handleLogoutClick} >Log Out</button>
                : null}
            </div>
        </div>
    );
 }

export default Login