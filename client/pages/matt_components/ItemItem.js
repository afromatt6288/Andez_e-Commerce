import React from "react";
import Link from 'next/link';

function ItemItem({ item }) {
    if (item == null){
        return <div>loading</div>
    }

    const { id, name, image, price, category} = item

    return (
        <div className="item-item">
            <Link href={`/items/${id}`} as = {`items/${id}`}>
                <img className="img-thumb" src={image} alt={name} />
            </Link>
            <p>{name}</p>
            <p>{category}</p>
            <p>${price} Nuts</p>
        </div>
        )
}

export default ItemItem;