import React from "react";
import Link from 'next/link';

function ItemItem({ film }) {
    const { id, title, poster, release_date, genres} = film
    const [genre1, genre2] = genres

    return (
        <div className="film-item">
            <Link href={`/films/${id}`}>
                <img className="img-thumb" src={poster} alt={title} />
            </Link>
            <p>{genre1}/{genre2}</p>
            <p>{release_date}</p>
        </div>
    );
}

export default ItemItem;