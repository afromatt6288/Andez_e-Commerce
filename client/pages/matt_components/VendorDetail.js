import React, { useEffect, useState } from "react"
import { Card } from "semantic-ui-react"
import Link from 'next/link'
import {useRouter} from "next/router"

function VendorDetail({admin, handleVendorDelete}) {
    const [vendor, setVendor] = useState(null);
    const router = useRouter()
    const { id } = router.query
    
    
    useEffect(() => {
        fetch(`http://127.0.0.1:5555/vendors/${id}`)
            .then(r => r.json())
            .then(data => setVendor(data[0]))
    }, [id])
    
    if (!vendor) return <h2>Loading...</h2>
    
    const {vendor_name, vendor_email, vendor_address, vendor_account_balance, items} = vendor
    
    function handleDeleteClick() {
        fetch(`http://127.0.0.1:5555/vendors/${id}`, {
          method: "DELETE"
        }) 
        handleVendorDelete(id)
        router.push(`/vendors`)       
    }
    
    return (
        <section>
            <header className="vendor-detail-header">
                <div className="container">
                    <span className="highlight">{vendor_name}</span>
                </div>
            </header>
            <div className="vendor-detail-intro">
                <span>
                    <label>Vendor Account Balance: <p>{vendor_account_balance}</p></label> 
                </span>
                <span>
                    <label>Vendor Email:<p>{vendor_email}</p></label> 
                    <label>Vendor Address:<p>{vendor_address}</p></label>
                </span>
                <h2>Items:</h2>
                <div className="vendor-item-list">
                    <Card.Group className="cards" itemsPerRow={2}>
                        {items && items.map((item) => (
                            <div key={item.id}>
                                <h4>{item.name}</h4>
                                <Link href={`/items/${item.id}`}>
                                    <img className="img-thumb" src={item.image} alt={item.name} />
                                </Link>
                                <h4>{item.price}</h4>
                            </div>
                        ))}
                    </Card.Group>  
                </div>
            </div>
            {admin ? (
            <div className="actions">
                <button>
                    <span role="img" aria-label="edit">
                        ✏️
                    </span>
                </button>
                <button onClick={handleDeleteClick}>
                    <span role="img" aria-label="delete">
                        🗑
                    </span>
                </button>
            </div>
            ) : null}
        </section>
    );
}

export default VendorDetail;