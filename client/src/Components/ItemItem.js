import React from "react";
import { Link } from "react-router-dom";

function ItemItem({ item }) {
    const { id, name, image, price, category} = item

    return (
        <div className="item-item">
            {/* console.log({id}) */}
            <Link to={`/items/${id}`}>
                <img className="img-thumb" src={image} alt={name} />
            </Link>
            <p>{name}</p>
            <p>{category}</p>
            <p>${price} Nuts</p>
        </div>
    );
}

export default ItemItem;