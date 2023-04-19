import React from "react";
import { Link } from "react-router-dom";

function ItemItem({ item }) {
    const { id, name, image, price, category} = item

    return (
        <div className="item-item">
            <Link to={`/items/${id}`}>
                <img className="img-thumb" src={image} alt={name} />
            </Link>
            <p>{category}</p>
            <p>{price}</p>
        </div>
    );
}

export default ItemItem;