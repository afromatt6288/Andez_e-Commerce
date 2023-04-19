import React, { useEffect, useState } from "react";
// import { useParams, useHistory, Link } from "react-router-dom"
import { useParams } from 'next/navigation';
import { useRouter } from 'next/router'
import Link from 'next/link';

import { Card } from "semantic-ui-react"

function ItemDetail({admin, onFilmDelete}) {
    const [film, setFilm] = useState(null);
    const { id } = useParams()
    const router = useRouter()
    
    useEffect(() => {
        fetch(`http://localhost:3001/films/${id}`)
            .then(r => r.json())
            .then(data => setFilm(data))
    }, [id])
    
    if (!film) return <h2>Loading...</h2>
    
    const { title, original_title, original_title_romanised, synopsis, poster, genres, movie_banner, release_date, director, screenwriters, producers, music, rating, running_time, budgetUSD, boxOfficeUSD, awards, reviews, characters} = film
    const [genre1, genre2] = genres
    const {rottenTomatoes, imdb} = reviews
    
    function handleDeleteClick() {
        fetch(`http://localhost:3001/films/${id}`, {
          method: "DELETE"
        }) 
        onFilmDelete(id)
        router.push(`/films`)       
    }
    
    return (
        <section>
            <header className="detail-header">
                <div className="container">
                    <span className="highlight">{title}</span>
                </div>
                <div className="container">
                    <span className="highlight">{original_title}</span>
                </div>
                <div className="container">
                    <span className="highlight">{original_title_romanised}</span>
                </div>
            </header>
            <div className="detail-intro">
                <span>
                    <label>Genres: <p>{genre1} / {genre2}</p></label> 
                    <label>Released: <p>{release_date}</p></label>
                    <label>Running time:<p>{running_time} min</p></label>
                    <label>Rated: <p>{rating}</p></label>
                </span>
                <p>{synopsis}</p>
                <span>
                    <label>Directed by:<p>{director}</p></label> 
                    <label>Produced by:<p>{producers}</p></label>
                    <label>Music by:<p>{music}</p></label>
                    <label>Screenwriters:<p>{screenwriters}</p></label>
                </span>
                <h3>Reviews: rottenTomatoes: {rottenTomatoes} / imdb: {imdb}</h3>
                <h2>Characters:</h2>
                <div className="film-character-list">
                    <Card.Group className="cards" itemsPerRow={2}>
                        {characters.map((character)=> (
                        <div>
                            <h4>{character.name}</h4>
                            <Link href={`/characters/${character.id}`}>
                                <img className="img-thumb" src={character.still} alt={character.name} />
                            </Link>
                        </div>
                        ))}
                    </Card.Group>  
                </div>               
                <h2>Awards:</h2>
                <div>{awards}</div>
                <span>
                    <label>Budget USD: <p>${budgetUSD}</p></label> 
                    <label>Box Office USD: <p>${boxOfficeUSD}</p></label>
                </span>
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

export default ItemDetail;