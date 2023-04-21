import React from "react";
import { Link } from "react-router-dom";

function ItemItem({ item , handleAddToCart}) {
    const { id, name, image, price, category} = item

    return (
        <div className="item-item">
            <Link to={`/items/${id}`}>
                <img className="img-thumb" src={image} alt={name} />
            </Link>
            <p>{name} | #{id}</p>
            <p>{category}</p>
            <div className="cart-button-card">

                <p>${price} Nuts</p>
                <button type="submit" onClick={()=>{handleAddToCart(item)}}>+</button>

            </div>
        </div>
    );
}

export default ItemItem;