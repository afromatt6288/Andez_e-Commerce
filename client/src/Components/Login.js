import React, {useState} from "react";
import { useHistory } from "react-router-dom"
import UserNew from "./UserNew"
import UserCard from "./UserCard"

function Login ({currentUser, setCurrentUser, toggle, admin, onAdmin, users, onAddUser, onUserDelete}) {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [isPasswordSecure, setIsPasswordSecure] = useState(true)
    const [invalidUser, setInvalidUser] = useState(false)
    const [newUser, setNewUser] = useState(false)
    
    const history = useHistory()

    const currentUserCard =
    currentUser &&
    users.find((user) => user.id === currentUser.id) && (
      <UserCard
        key={currentUser.id}
        user={currentUser}
        onUserDelete={onUserDelete}
      />
    );
 
    function handleSubmit(e) {
        e.preventDefault();
        fetch("/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, password }),
        }).then((r) => {
          if (r.ok) {
            r.json().then((user) => {
              setCurrentUser(user)
              console.log("Login.js Line 26 - for logging in")
              console.log(user)
            })
            history.push(`/`)
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
        console.log("Login.js Line 42 - for logging out")
        console.log(currentUser)
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
                <div className="profile">
                  <section id="profile">
                      {currentUserCard}
                  </section>
            </div>
                : newUser ? <UserNew onNewUser={handleNewUser} toggle={toggle} /> :
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
                  <div className="logout-container">
                    <button className="login-button" onClick={handleLogoutClick}>Log Out</button>
                    <span className="logout-text">_</span>
                  </div>
                : null}
            </div>
        </div>
    );
 }

export default Login