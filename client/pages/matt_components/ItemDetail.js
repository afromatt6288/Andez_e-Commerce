import React, { useEffect, useState } from "react";
// import { useParams, useHistory, Link } from "react-router-dom"
import { useParams } from 'next/navigation';
import { useRouter } from 'next/router'
import Link from 'next/link';

import { Card } from "semantic-ui-react"

function ItemDetail({admin, handleItemDelete}) {
    const [item, setItem] = useState(null);
    const { id } = useParams()
    const router = useRouter()
    
    useEffect(() => {
        fetch(`http://127.0.0.1:5555/items/${id}`)
            .then(r => r.json())
            .then(data => {
                console.group(data)
                setItem(data[0])})
    }, [id])
    
    if (!item) return <h2>Loading...</h2>
    
    const { name, description, image, category, price, vendors} = item
    
    function handleDeleteClick() {
        fetch(`http://127.0.0.1:5555/items/${id}`, {
          method: "DELETE"
        }) 
        handleItemDelete(id)
        router.push(`/items`)       
    }
    
    return (
        <section>
            <header className="detail-header">
                <div className="container">
                    <span className="highlight">{name}</span>
                </div>
            </header>
            <div className="detail-intro">
                <span>
                    <label>Category: <span>{category}</span></label> 
                    <label>Price: <span>{price}</span></label>
                </span>
                <p>Description: {description}</p>
                <h2>Vendors:</h2>
                <div className="item-vendor-list">
                    <Card.Group className="cards" itemsPerRow={2}>
                        {vendors && vendors.map((vendor) => (
                            <div key={vendor.id}>
                                <Link href={`/vendors/${vendor.id}`}>
                                    <h4>{vendor.vendor_name}</h4>
                                </Link>
                            </div>
                        ))}
                    </Card.Group>  
                </div>               
            </div>
            <div className="detail-image-container">
                <img className="detail-image" src={image} alt={name}/>
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

export default ItemDetail;