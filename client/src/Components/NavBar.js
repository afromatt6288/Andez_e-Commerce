import React from "react";
import { NavLink } from "react-router-dom"

function NavBar({admin}) {
    return (
        <section>
        <nav>
            <NavLink exact to="/">Home</NavLink>
            <NavLink exact to="/items">Items</NavLink>
            <NavLink exact to="/vendors">Vendors</NavLink>        
        </nav>
        {admin ?  
        <nav className="admin">
            <span>ADMIN : 
            <NavLink exact to="/items/new">Add Item</NavLink> 
            <NavLink exact to="/vendors/new">Add Vendor</NavLink> 
            <NavLink exact to="/users">Users</NavLink>    
            </span>       
        </nav>
        : null }
        </section>
    );
}

export default NavBar;