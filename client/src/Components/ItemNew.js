import React, { useState } from "react";
import { useHistory } from "react-router-dom";

function ItemNew({onItemAdd}) {
    const [name, setName] = useState("");
    const [image, setImage] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("")
    const [price, setPrice] = useState("")
        
    const history = useHistory();
    
    function handleSubmit(e) {
        e.preventDefault()
        const formData = {
                name: name,
                image: image,
                description: description,
                price: parseInt(price),
                category: category,
        }
        fetch("/items", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        })
            .then(r => r.json())
            .then(data => {
                onItemAdd(data)
                console.log(data)
                console.log(formData)
                history.push(`/items/${data.id}`)
            })
    }
    
    return (
        <section >
            <h3 className="header">Add New Item</h3>
            <form className="new-vendoritem-form" onSubmit={handleSubmit}>
                <input type="text" id="name" placeholder="Name" value={name} onChange={e => setName(e.target.value)} />
                <input type="text" id="category" placeholder="Category" value={category} onChange={e => setCategory(e.target.value)} />
                <input type="text" id="image" placeholder="Image URL" value={image} onChange={e => setImage(e.target.value)} />
                <label>Price<input type="number" id="price" placeholder="Price" value={price} onChange={e => setPrice(e.target.value)} /></label>
                <textarea id="description" placeholder="description" value={description} onChange={e => setDescription(e.target.value)} />
                <br/>
                <button type="submit">Submit</button>
            </form>
        </section>
    )
}

export default ItemNew


