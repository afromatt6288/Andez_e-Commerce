import React from "react";
import { Link } from "react-router-dom";

function CharacterItem({ character }) {
    const { id, name, still, film, species} = character


    return (
        <div className="character-item">
            <p>{name}</p>
            <Link to={`/characters/${id}`}>
                <img className="img-thumb" src={still} alt={name} onError="this.onerror=null;this.src='https://image.shutterstock.com/image-vector/blank-avatar-photo-place-holder-260nw-1114445501.jpg';" />
            </Link>
            <p>{species}</p>
            <p>{film.title}</p>
        </div>
    );
}

export default CharacterItem;