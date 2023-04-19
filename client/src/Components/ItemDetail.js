import React, { useEffect, useState } from "react";
import { useParams, useHistory, Link } from "react-router-dom"
import { Card } from "semantic-ui-react"

function ItemDetail({admin, onItemDelete}) {
    const [item, setItem] = useState(null);
    const { id } = useParams()
    const history = useHistory()
    
    useEffect(() => {
        fetch(`http://127.0.0.1:5555/items/${id}`)
            .then(r => r.json())
            .then(data => setItem(data))
    }, [id])
    
    if (!item) return <h2>Loading...</h2>
    
    const { name, description, image, category, price, vendors} = item
    
    function handleDeleteClick() {
        fetch(`http://127.0.0.1:5555/items/${id}`, {
          method: "DELETE"
        }) 
        onItemDelete(id)
        history.push(`/items`)       
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
                    <label>Category: <p>{category}</p></label> 
                    <label>Price: <p>{price}</p></label>
                </span>
                <p>{description}</p>
                <h2>Vendors:</h2>
                {/* <div className="item-vendor-list">
                    <Card.Group className="cards" itemsPerRow={2}>
                        {vendors.map((vendor)=> (
                        <div>
                            <Link to={`/vendors/${vendor.id}`}>
                                <h4>{vendor.name}</h4>
                            </Link>
                        </div>
                        ))}
                    </Card.Group>  
                </div>                */}
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