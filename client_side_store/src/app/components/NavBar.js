import React from "react";
import Link from 'next/link';
import { useRouter } from 'next/router'

function NavBar({ user, setUser }) {
  function handleLogoutClick() {
    fetch("/logout", { method: "DELETE" }).then((r) => {
      if (r.ok) {
        setUser(null);
      }
    });
  }
  // const router = useRouter()

  return (
    <header>
      <div>
        <Link href={{ pathname: '/home', query: { user: "joe" } }}>Home</Link>
      </div>
      <div>
        {false ? (
          <button onClick={handleLogoutClick}>Logout</button>
        ) : (
          <>
            <Link href="/signup">Signup</Link>
            <Link href="/login">Login</Link>
          </>
        )}
      </div>
    </header>
  );
}

export default NavBar;
