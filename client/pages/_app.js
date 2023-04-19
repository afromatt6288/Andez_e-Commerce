import '@/styles/globals.css'
import { deepStrictEqual } from 'assert'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
export default function App({ Component, pageProps }) {
  
  
  
  
  
  // Gather user data with NEW Methods
  useEffect(() => {
    fetch("http://localhost:5555/check_session")
    .then((response) => {
      if (response.ok) {
        response.json()
        .then((currentUser) => setCurrentUser(currentUser)).catch((err)=>{console.log("Error")});
      }
    });
  }, []);
  
  // gather my User Data
  const [users, setUsers] = useState([]) 
  useEffect(() => {
    fetch("http://localhost:5555/users")
    .then(r => r.json())
    .then(data => {
      setUsers(data)
    })
  }, [])
  
  // Gather my Item Data
  const [items, setItems] = useState([])
  useEffect(() => {
      fetch("http://localhost:5555/items")
          .then(r => r.json())
          .then(data => {
              setItems(data);
          })
  }, [])

  // Gather my Vendor Data
  const [vendors, setVendors] = useState([]);    
  useEffect(() => {
      fetch("http://localhost:5555/vendors")
          .then(r => r.json())
          .then(data => {
              setVendors(data)     
          })
  }, [])

  // Gather my Species Data
  const [species, setSpecies] = useState([]);
  useEffect(() => {
      fetch("http://localhost:3001/species")
          .then(r => r.json())
          .then(data => {
              setSpecies(data)     
          }).catch((err)=>{console.log("Error")})
      }, [])

  // Gather my Vehicles Data
  const [vehicles, setVehicles] = useState([]);
  useEffect(() => {
      fetch("http://localhost:3001/vehicles")
          .then(r => r.json())
          .then(data => {
              setVehicles(data)     
          }).catch((err)=>{console.log("Error")})
      }, [])








  return (
  // <DataComponent >
  <Component {...pageProps } test = {"deepStrictEqual"} users={users} setUsers={setUsers} items = {items} setItems = {setItems} vendors = {vendors} setVendors = {setVendors}/>
  // {/* </DataComponent>  */}
  )
}
