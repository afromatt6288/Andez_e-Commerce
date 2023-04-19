import React from "react";
import { Link } from "react-router-dom";

function ItemItem({ film }) {
    const { id, title, poster, release_date, genres} = film
    const [genre1, genre2] = genres

    return (
        <div className="film-item">
            <Link to={`/films/${id}`}>
                <img className="img-thumb" src={poster} alt={title} />
            </Link>
            <p>{genre1}/{genre2}</p>
            <p>{release_date}</p>
        </div>
    );
}

export default ItemItem;