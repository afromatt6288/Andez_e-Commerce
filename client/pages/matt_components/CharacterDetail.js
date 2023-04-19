import React, { useEffect, useState } from "react";
import { useParams, useHistory, Link } from "react-router-dom"

function CharacterDetail({admin}) {
    const [character, setCharacter] = useState(null);
    const { id } = useParams()
    const history = useHistory()
    
    useEffect(() => {
        fetch(`http://localhost:3001/characters/${id}`)
            .then(r => r.json())
            .then(data => setCharacter(data))
    }, [id])
    
    if (!character) return <h2>Loading...</h2>
    
    const {name, originalCast, lastEnglishDubbingActor, film, still, gender, age, eye_color, hair_color, species} = character
    const {title, poster, movie_banner} = film
    
    function handleDeleteClick() {
        fetch(`http://localhost:3001/characters/${id}`, {
          method: "DELETE"
        }) 
        history.push(`/characters`)       
    }
    
    return (
        <section>
            <header className="character-detail-header">
                <div className="container">
                    <span className="highlight">{name}</span>
                    <img className="character-img" src={still} alt={name}/>
                </div>
            </header>
            <div className="character-detail-intro">
                <span>
                    <label>Age: <p>{age}</p></label> 
                    <label>Hair Color: <p>{hair_color}</p></label>
                </span>
                <span>
                    <label>Gender: <p>{gender}</p></label>
                    <label>Eye Color:<p>{eye_color}</p></label>
                </span>
                <label>Species: <p>{species}</p></label>
                <span>
                    <label>Original Cast:<p>{originalCast}</p></label> 
                    <label>Last English Dubbing Actor:<p>{lastEnglishDubbingActor}</p></label>
                </span>
                <h2>Movie:</h2>
                <div>
                    <h4>{title}</h4>
                    <Link to={`/films/${film.id}`}>
                        <img className="img-thumb" src={poster} alt={title} />
                    </Link>  
                </div>                
            </div>
            <div className="detail-image-container">
                <img className="detail-image" src={poster} alt={title}/>
            </div>
            <div className="detail-banner-container">
                <img className="detail-banner" src={movie_banner} alt={`${title} banner`} />
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

export default CharacterDetail;