import React, {useState, useEffect} from "react";
import { Switch, Route } from "react-router-dom";
import NavBar from "./NavBar"
import Home from "./Home";
import ItemList from "./ItemList";
import ItemDetail from "./ItemDetail";
import ItemNew from "./ItemNew";
import VendorList from "./VendorList"
import VendorDetail from "./VendorDetail";
import VendorNew from "./VendorNew"
import Cart from "./Cart"
import Login from "./Login"
import Users from "./Users"

function App() {
    const [currentUser, setCurrentUser] = useState("")
    const [seen, setSeen] = useState(false)
    const [admin, setAdmin] = useState(false)
    
  // Update the admin state variable when currentUser changes
  useEffect(() => {
    if (currentUser && currentUser.admin !== admin) {
      setAdmin(currentUser.admin);
    }
  }, [currentUser]);

    // Gather user data with NEW Methods
    useEffect(() => {
      fetch("http://127.0.0.1:5555/check_session")
      .then((response) => {
        if (response.ok) {
          response.json()
      .then((currentUser) => {
        setCurrentUser(currentUser)
    });
        }
      });
    }, []);

    // gather my User Data
    const [users, setUsers] = useState([]) 
    useEffect(() => {
        fetch("http://127.0.0.1:5555/users")
            .then(r => r.json())
            .then(data => {
                setUsers(data)
            })
    }, [])
        
    // Gather my Item Data
    const [items, setItems] = useState([]);
    useEffect(() => {
        fetch("http://127.0.0.1:5555/items")
            .then(r => r.json())
            .then(data => {
                setItems(data)
            })
    }, [])

    // Gather my Vendor Data
    const [vendors, setVendors] = useState([]);    
    useEffect(() => {
        fetch("http://127.0.0.1:5555/vendors")
            .then(r => r.json())
            .then(data => {
                setVendors(data)     
            })
    }, [])

    // Handle User Add & Delete
    function handleAddUser(addUser) {
        const updatedUsers = [...users, addUser]
        setUsers(updatedUsers);
    }

    function handleUserDelete(id) {
        const updatedUsers = users.filter(user => user.id !== id)
        setUsers(updatedUsers)
    }

    // Handle Item Add & Delete
    function handleItemAdd(addItem) {
        const updatedItems = [...items, addItem]
        setItems(updatedItems);
    }

    function handleItemDelete(id) {
        const updatedItems = items.filter(item => item.id !== id)
        setItems(updatedItems)
    }

    // Handle Vendor Add & Delete
    function handleVendorAdd(addVendor) {
        const updatedVendors = [...vendors, addVendor]
        setVendors(updatedVendors);
    }

    function handleVendorDelete(id) {
        const updatedVendors = vendors.filter(vendor => vendor.id !== id)
        setVendors(updatedVendors)
    }

    // Handle Login and registration Pop-up
    function togglePop () {
        setSeen(!seen);
    };

    return (
        <div className={currentUser ? "background-image-login" : "background-image-logout"}>
            <header className="app-header"> 
            <h1>Andez E-Commerce Emporium</h1>
            <h5>Formerly Andez Nuts</h5>
            <div>
                <button className="login" onClick={togglePop} >{currentUser ? "Profile" : "Log In"}</button>
                {seen ? <Login toggle={togglePop} currentUser={currentUser} setCurrentUser={setCurrentUser} admin={admin} users={users} onAddUser={handleAddUser}/> : null}
            </div>
            </header>
            {currentUser ? <NavBar admin={admin} /> : seen ? null : <h2 className="please">Please Log In</h2>}
            {currentUser ? <Switch>
                <Route exact path="/">
                    <Home currentUser={currentUser}/>
                </Route>
                <Route exact path="/cart">
                    <Cart currentUser={currentUser} items={items} vendors={vendors}/>
                </Route>
                <Route exact path="/items">
                    <ItemList items={items} vendors={vendors}/>
                </Route>
                {admin ? 
                <Route exact path="/items/new">
                    <ItemNew key={items.id} onItemAdd={handleItemAdd}/>
                </Route> : null }
                <Route exact path="/items/:id">
                    <ItemDetail admin={admin} items={items} onItemDelete={handleItemDelete}/>
                </Route>
                <Route exact path="/vendors">
                    <VendorList items={items} vendors={vendors}/>
                </Route>
                {admin ? 
                <Route exact path="/vendors/new">
                    <VendorNew key={vendors.id} onVendorAdd={handleVendorAdd}/>
                </Route> : null }
                <Route exact path="/vendors/:id">
                    <VendorDetail admin={admin} onVendorDelete={handleVendorDelete}/>
                </Route>
                {admin ? 
                <Route exact path="/users">
                    <Users users={users} onUserDelete={handleUserDelete}/>
                </Route> : null }
                <Route path="*">
                    <h1>404 not found</h1>
                </Route>
            </Switch> : null
            }
        </div>
    );
}

export default App;
