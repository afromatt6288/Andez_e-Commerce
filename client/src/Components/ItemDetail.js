import React, { useEffect, useState } from "react";
import { useParams, useHistory, Link } from "react-router-dom"
import { Card } from "semantic-ui-react"
import ItemNew from "./ItemNew";
import VendorItemNew from "./VendorItemNew";

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
    
    const { name, description, image, category, price, vendors} = item
    // if (item.vendoritems.length > 0){
    // console.log(item)
    // console.log(item.vendoritems[0].vendor,"5555555", vendors)
    // }
    const allvendors = item.vendoritems.map((vi)=>vi.vendor)
    // console.log(item.vendoritems, allvendors)
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
    
    return (<div>
        <section>
            <header className="detail-header">
                <div className="container">
                    <span className="highlight">{name}</span>
                </div>
                <button onClick={handleAddToCart}>Add To Cart</button>
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
                        {allvendors && allvendors.map((vendor, index) => (
                            <div key={String(vendor.id)+"ind"+String(index)}>
                                <Link to={`/vendors/${vendor.id}`}>
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
        </div>
    );
}

export default ItemDetail;