import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Link from 'next/link';

import SignUp from "./SignUp";
import Login from "./Login";
import NavBar from "./NavBar";
import Home from "./Home";

function Homepage() {
  const [user, setUser] = useState(null);

  useEffect(() => {         // auto-login
    fetch("/check_session")
    .then((response) => {
      if (response.ok) {
        response.json()
    .then((user) => setUser(user));
      }
    });
  }, []);

  return (
    <>
      <NavBar user={user} setUser={setUser} />
    </>
  );
}

export default Homepage;