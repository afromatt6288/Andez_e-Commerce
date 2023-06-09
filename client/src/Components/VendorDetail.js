import React, { useEffect, useState } from "react";
import { useParams, useHistory, Link } from "react-router-dom"
import { Card } from "semantic-ui-react"
import AddItemByID from "./AddItemByID"

function VendorDetail({admin, onVendorDelete}) {
    const [vendor, setVendor] = useState(null);
    const { id } = useParams()
    const history = useHistory()
    
    useEffect(() => {
        fetch(`/vendors/${id}`)
            .then(r => r.json())
            .then(data => setVendor(data[0]))
    }, [id])
    
    if (!vendor) return <h2>Loading...</h2>
    
    const {vendor_name, vendor_email, vendor_address, vendor_account_balance} = vendor
    const allitems = vendor.vendoritems.map((vi)=>vi.item)

    function handleDeleteClick() {
        fetch(`/vendors/${id}`, {
          method: "DELETE"
        }) 
        onVendorDelete(id)
        history.push(`/vendors`)       
    }
    
    return (<div>
        <section>
            <header className="vendor-detail-header">
                <div className="container">
                    <span className="highlight">{vendor_name} | #{id}</span>
                </div>
            </header>
            <div className="vendor-detail-intro">
                <span>
                    <label>Vendor Email:<p>{vendor_email}</p></label> 
                    <label>Vendor Account Balance: <p>{vendor_account_balance}</p></label> 
                    <label>Vendor Address:<p>{vendor_address}</p></label>
                </span>
                <h2>Items:</h2>
                <div className="vendor-item-list">
                    <Card.Group className="cards" itemsPerRow={2}>
                        {allitems && allitems.map((item) => (
                            <div key={item.id}>
                                <h4>{item.name} | #{item.id}</h4>
                                <Link to={`/items/${item.id}`}>
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
                <AddItemByID vendorID={id}>hi!</AddItemByID>
            </div>
            ) : null}

        </section>
        </div>
    );
}

export default VendorDetail;