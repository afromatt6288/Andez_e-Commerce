import React from "react";
import { NavLink } from "react-router-dom"

function NavBar({admin, CartCounter}) {
    return (
        <section>
        <nav>
            <NavLink exact to="/">Home</NavLink>
            <NavLink exact to="/items">Items</NavLink>
            <NavLink exact to="/vendors">Vendors</NavLink>     
            <NavLink id="shoppingcart" exact to="/shoppingcart">Shopping Cart ({CartCounter})</NavLink>    
        </nav>
        {admin ?  
        <nav className="admin">
            <span>ADMIN : 
            <NavLink exact to="/items/new">Add Item</NavLink> 
            <NavLink exact to="/vendors/new">Add Vendor</NavLink> 
            <NavLink exact to="/users">Users</NavLink> 
            {/* <NavLink exact path="/transactions">All Transactions</NavLink>    */}
            </span>       
        </nav>
        : null }
        </section>
    );
}

export default NavBar;