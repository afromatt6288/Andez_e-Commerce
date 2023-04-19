import React, {useState, useEffect} from "react";
import Link from 'next/link';
import { useRouter } from 'next/router'
import NavBar from "./NavBar"
import Home from "./Home";
import ItemList from "./ItemList";
import ItemDetail from "./ItemDetail";
import ItemNew from "./ItemNew";
import CharacterList from "./CharacterList"
// import CharacterDetail from "./CharacterDetail";
import CharacterNew from "./CharacterNew"
import Login from "./Login"
import Users from "./Users"

function App({setItems, items} ) {
    const [currentUser, setCurrentUser] = useState("")
    const [seen, setSeen] = useState(false)
    const admin = currentUser.admin
    
    // // Gather user data with NEW Methods
    // useEffect(() => {
    //   fetch("http://localhost:5555/check_session")
    //   .then((response) => {
    //     if (response.ok) {
    //       response.json()
    //   .then((currentUser) => setCurrentUser(currentUser));
    //     }
    //   });
    // }, []);

    // // gather my User Data
    // const [users, setUsers] = useState([]) 
    // useEffect(() => {
    //     fetch("http://localhost:5555/users")
    //         .then(r => r.json())
    //         .then(data => {
    //             setUsers(data)
    //         })
    // }, [])
        
    // // Gather my Item Data
    // // const [items, setItems] = useState([5,6]);
    // useEffect(() => {
    //     fetch("http://localhost:5555/items")
    //         .then(r => r.json())
    //         .then(data => {
    //             console.log("mayflower", setItems);setItems(data);
    //         })
    // }, [])

    // // Gather my Vendor Data
    // const [vendors, setVendors] = useState([]);    
    // useEffect(() => {
    //     fetch("http://localhost:5555/vendors")
    //         .then(r => r.json())
    //         .then(data => {
    //             setVendors(data)     
    //         })
    // }, [])

    // // Gather my Species Data
    // const [species, setSpecies] = useState([]);
    // useEffect(() => {
    //     fetch("http://localhost:3001/species")
    //         .then(r => r.json())
    //         .then(data => {
    //             setSpecies(data)     
    //         })
    //     }, [])
    
    // // Gather my Vehicles Data
    // const [vehicles, setVehicles] = useState([]);
    // useEffect(() => {
    //     fetch("http://localhost:3001/vehicles")
    //         .then(r => r.json())
    //         .then(data => {
    //             setVehicles(data)     
    //         })
    //     }, [])

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
    function handleFilmAdd(addFilm) {
        const updatedFilms = [...items, addFilm]
        setItems(updatedFilms);
    }

    function handleFilmDelete(id) {
        const updatedFilms = items.filter(film => film.id !== id)
        setItems(updatedFilms)
    }

    // Handle Login and registration Pop-up
    function togglePop () {
        setSeen(!seen);
    };

    // tempItems = [4,5,6]
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
            {currentUser ? 
            <div>
                <Link href="/">
                    {/* <Home currentUser={currentUser}/> */}
                </Link>
                <Link href="/items">
                    {/* <ItemList items={items}/> */}
                </Link>
                {admin ? 
                <Link href="/items/new">
                    {/* <ItemNew onFilmAdd={handleFilmAdd}/> */}
                </Link> : null }
                <Link href="/items/:id">
                    {/* <ItemDetail admin={admin} onFilmDelete={handleFilmDelete}/> */}
                </Link>
                <Link href="/vendors">
                    {/* <CharacterList items={items} vendors={vendors} species={species} vehicles={vehicles}/> */}
                </Link>
                {admin ? 
                <Link href="/vendors/new">
                    {/* <CharacterNew key={vendors.id}/> */}
                </Link> : null }
                <Link href="/vendors/:id"/>
                    {/* <CharacterDetail admin={admin}/> */}
                {admin ? 
                <Link href="/users">
                    {/* <Users users={users} onUserDelete={handleUserDelete}/> */}
                </Link> : null }
                {/* <Route path="*">
                    <h1>404 not found</h1>
                </Route> */}
            </div> : null
            }
        </div>
    );
}

export default App;
