import React, {useState, useEffect} from "react";
import { Switch, Route, useHistory  } from "react-router-dom";
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
import VendorItemNew from "./VendorItemNew";
import ItemVendorNew from "./ItemVendorNew";
function App() {
    const [currentUser, setCurrentUser] = useState("")
    const [seen, setSeen] = useState(false)
    const [admin, setAdmin] = useState(false)
    
    const history = useHistory();
        
    // Gather user data to check if logged in
    useEffect(() => {
        fetch("/check_session")
        .then((response) => {
            if (response.ok) {
                response.json()
                .then((currentUser) => {
                    setCurrentUser(currentUser)
                });
            }
        });
    }, []);

    // Update the admin state variable when currentUser changes
    useEffect(() => {
      if (currentUser) {
        setAdmin(currentUser.admin);
      }
    }, [currentUser]);

    // gather my User Data
    const [users, setUsers] = useState([]) 
    useEffect(() => {
        fetch("/users")
            .then(r => r.json())
            .then(data => {
                setUsers(data)
            })
    }, [])
        
    // Gather my Item Data
    const [items, setItems] = useState([]);
    useEffect(() => {
        fetch("/items")
            .then(r => r.json())
            .then(data => {
                setItems(data)
            })
    }, [])

    // Gather my Vendor Data
    const [vendors, setVendors] = useState([]);    
    useEffect(() => {
        fetch("/vendors")
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
    // Handle Shopping Cart Add, Clear, and Purchase
    const [cart, setCart] = useState([])
    const [CartCounter, setCartCounter] = useState(0);
    const [totalCost, setTotalCost] = useState(0)
    const [accountBalance, setAccountBalance] = useState(`${currentUser.account_balance}`);

    useEffect(() => {
        let cartCount = 0;
        cart.forEach((item) => {
          cartCount += 1;
        });
        setCartCounter(cartCount);
    }, [cart, CartCounter])

    useEffect(() => {
        let totalCost = 0;
        cart.forEach((item) => {
          totalCost += item.price;
        });
        setTotalCost(totalCost);
    }, [cart, totalCost])

    function handleAddToCart(item){
        console.log(cart)
        console.log(`cart add ${item.id}`)
        const addToCart = [...cart, item]
        setCart(addToCart)
        console.log(cart)
    }

    function handleClearCart(){
        console.log(cart)
        console.log(`Cart Cleared`)
        setCart([])
        console.log(cart)
    }

    function handleCheckOut(){
        setAccountBalance(currentUser.account_balance)
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
        cart.forEach((item) => {
            const formData = {
                user_id: currentUser.id,
                item_id: item.id
            }
            fetch("/transactions", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            })
                .then(r => r.json())
                .then(data => {
                    onItemAdd(data)
                    history.push(`/items/${data.id}`)
                })
            }
        )}

    // Handle Vendor Add & Delete
    function handleVendorAdd(addVendor) {
        const updatedVendors = [...vendors, addVendor]
        setVendors(updatedVendors);
    }

    function handleVendorDelete(id) {
        const updatedVendors = vendors.filter(vendor => vendor.id !== id)
        setVendors(updatedVendors)
    }

    function handleAddItemVendor(iv){
        console.log("")
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
            {currentUser ? <NavBar admin={admin} CartCounter={CartCounter}/> : seen ? null : <h2 className="please">Please Log In</h2>}
            {currentUser ? <Switch>
                <Route exact path="/">
                    <Home currentUser={currentUser}/>
                </Route>
                <Route exact path="/shoppingcart">
                    <Cart CartCounter={CartCounter} cart={cart} currentUser={currentUser} items={items} vendors={vendors} onClearCart={handleClearCart} onCheckOut={handleCheckOut} onTransaction={handleTransaction}/>
                </Route>
                <Route exact path="/items">
                    <ItemList items={items} vendors={vendors}/>
                </Route>
                {admin ? 
                <Route exact path="/items/new">
                    <ItemNew key={items.id} onItemAdd={handleItemAdd}/>
                </Route> : null }
                <Route exact path="/items/:id">
                    <ItemDetail admin={admin} items={items} onItemDelete={handleItemDelete} onAddToCart={handleAddToCart}/>
                    <ItemVendorNew onVendorAdd={handleVendorAdd} handleAddItemVendor={handleAddItemVendor}></ItemVendorNew>
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
                    <VendorItemNew onItemAdd={handleItemAdd} handleAddItemVendor={handleAddItemVendor}></VendorItemNew>
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
