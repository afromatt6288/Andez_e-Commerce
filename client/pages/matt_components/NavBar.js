import React from "react";
import Link from 'next/link';

function NavBar({admin}) {
    return (
        <section>
            <nav>
                <Link href="/">Home</Link>
                <Link href="/items">Items</Link>
                <Link href="/vendors">Vendors</Link>
                <Link href="/cart">Cart</Link>         
            </nav>
            {admin ?  
            <nav className="admin">
                <span>ADMIN : 
                <Link href="/items/new">Add Item</Link> 
                <Link href="/vendors/new">Add Vendor</Link> 
                <Link href="/users">Users</Link>    
                </span>       
            </nav>
            : null }
        </section>
    );
}

export default NavBar;