import React, { useEffect, useState } from "react";
import { useParams, useHistory, Link } from "react-router-dom"
import { Card } from "semantic-ui-react"
import AddVendorByNameID from "./AddVendorByNameID";

function ItemDetail({admin, onItemDelete, onAddToCart}) {
    const [item, setItem] = useState(null);
    const { id } = useParams()
    const history = useHistory()
    
    useEffect(() => {
        fetch(`/items/${id}`)
        .then(r => r.json())
        .then(data => {
            console.log(data)
            console.log(data[0])
            setItem(data[0])})
        }, [id])
        
        if (!item) return <h2>Loading...</h2>
        
    const { name, description, image, category, price} = item
    const allvendors = item.vendoritems.map((vi)=>vi.vendor)
    
    function handleDeleteClick() {
        fetch(`/items/${id}`, {
          method: "DELETE"
        }) 
        onItemDelete(id)
        history.push(`/items`)       
    }

    function handleAddToCart(){
        onAddToCart(item)
    }
    
    return (
        <section>
            <header className="detail-header">
                <div className="container">
                    <span className="highlight">{name} | #{id}</span>
                </div>
            </header>
            <div className="detail-intro">
                <span>
                    <label>Category: <span>{category}</span></label>
                    <button type="submit" onClick={handleAddToCart}>Add To Cart</button> 
                    <label>Price: <span>{price}</span></label>
                </span>
                <p>Description: {description}</p>
                <h2>Vendors:</h2>
                <div className="item-vendor-list">
                    <Card.Group className="cards" itemsPerRow={2}>
                        {allvendors && allvendors.map((vendor) => (
                            <div key={vendor.id}>
                                <Link to={`/vendors/${vendor.id}`}>
                                    <h4>{vendor.vendor_name} | #{vendor.id}</h4>
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
                <AddVendorByNameID itemID={id}></AddVendorByNameID>
            </div>
            ) : null}
        </section>
    );
}

export default ItemDetail;