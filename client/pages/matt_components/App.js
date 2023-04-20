import React, {useState, useEffect} from "react";
import Link from 'next/link';
import { useRouter } from 'next/router'
import NavBar from "./NavBar"
import Home from "./Home";
import ItemList from "./ItemList";
import ItemDetail from "./ItemDetail";
import ItemNew from "./ItemNew";
import VendorList from "./VendorList"
import VendorDetail from "./VendorDetail";
import VendorNew from "./VendorNew"
import Cart from "../Cart"
import Login from "./Login"
import Users from "./Users"

function App({seen, setSeen, admin, setAdmin, setItems, items, vendors, setVendors, users, setUsers, handleAddUser, handleUserDelete, togglePop, currentUser, setCurrentUser} ) {
    // if(admin == null){
    //     return <div>loading...</div>
    // }

    // console.log("seen", seen, "setseen", setSeen, "admin", admin, "setadmin", setAdmin,"setitems", setItems,"items", items,
    // "vendors", vendors,"setvend", setVendors,"users", users,"setusers", setUsers, "handleadduser", handleAddUser, "handleuserdelete", handleUserDelete, 
    // "togglepop", togglePop, "currentuser", currentUser,"setcurrentuser", setCurrentUser)

    return (
        <div className={currentUser ? "background-image-login" : "background-image-logout"}>
            <header className="app-header"> 
            <h1>Andez E-Commerce Emporium</h1>
            <h5>Formerly Andez Nuts</h5>
            <div>
                <button className="login" onClick={()=>{togglePop()}} >{currentUser ? "Profile" : "Log In"}</button>
                {seen ? <Login currentUser={currentUser} setCurrentUser={setCurrentUser} admin={admin} users={users} onAddUser={handleAddUser}/> : null}
            </div>
            </header>
            {currentUser ? <NavBar admin={admin} /> : seen ? null : <h2 className="please">Please Log In</h2>}
            {currentUser ? 
            <div>
                <Link href="/">
                    Home{/* <Home currentUser={currentUser}/> */}
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
                <Link href="/cart">
                    {/* <Cart currentUser={currentUser} items={items} vendors={vendors}/> */}
                </Link>
                {/* <Link href="*">
                    <h1>404 not found</h1>
                </Link> */}
            </div> : null
            }
        </div>
    );
}

export default App;
