import '@/styles/globals.css'
import { deepStrictEqual } from 'assert'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import "../styles/index.css" 


export default function App({ Component, pageProps }) {
  
  const [seen, setSeen] = useState(false)

  const [currentUser, setCurrentUser] = useState("")
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


    // Add and Delete

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





  

//search={search} setSearch={setSearch} sortBy={sortBy} setSortBy={setSortBy} 
// filterBy={filterBy} setFilterBy={setFilterBy}
  return (
  <Component {...pageProps } seen={seen} setSeen={setSeen} togglePop={togglePop} handleItemAdd = {handleItemAdd} handleItemDelete={handleItemDelete} 
  handleVendorAdd={handleVendorAdd} handleVendorDelete={handleVendorDelete} currentUser={currentUser} setCurrentUser={setCurrentUser} admin = {admin} 
  handleAddUser={handleAddUser} handleUserDelete={handleUserDelete} users={users} setUsers={setUsers} items = {items} setItems = {setItems} 
  vendors = {vendors} setVendors = {setVendors}/>
  )
}
