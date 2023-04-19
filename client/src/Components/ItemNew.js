import React, { useState } from "react";
import { useHistory } from "react-router-dom";

function ItemNew({onItemAdd}) {
    const [title, setTitle] = useState("");
    const [originalTitle, setOriginalTitle] = useState("");
    const [originalTitleRomanised, setOriginalTitleRomanised] = useState("")
    const [poster, setPoster] = useState("");
    const [movieBanner, setMovieBanner] = useState("")
    const [synopsis, setSynopsis] = useState("");
    const [genre1, setGenre1] = useState("")
    const [genre2, setGenre2] = useState("")
    const [releaseDate, setReleaseDate] = useState("")
    const [director, setDirector] = useState("");
    const [music, setMusic] = useState("");
    const [rating, setRating] = useState("");
    const [budgetUSD, setBudgetUsd] = useState("");    
    const [runningTime, setRunningTime] = useState("");
    const [boxOfficeUSD, setBoxOfficeUSD] = useState("");
    const [rottenTomatoes, setRottenTomatoes] = useState("");
    const [imdb, setImdb] = useState("");
    const [screenwriters, setScreenwriters] = useState([]);
    const [producers, setProducers] = useState([]);
    const [awards, setAward] = useState([]);
        
    const history = useHistory();
    
    function handleSubmit(e) {
        e.preventDefault()
        const date = new Date(releaseDate)             
        const formattedDate = date.toLocaleDateString('en-US', {month: 'long', day: 'numeric', year: 'numeric', })
        const formData = {
                title: title,
                original_title: originalTitle,
                original_title_romanised: originalTitleRomanised,
                poster: poster,
                movie_banner: movieBanner,
                synopsis: synopsis,
                director: director,
                release_date: formattedDate,
                music: music,
                rating: rating,
                running_time: runningTime,
                budgetUSD: budgetUSD,
                boxOfficeUSD: boxOfficeUSD,
                genres: [genre1, genre2],
                screenwriters: [screenwriters],
                producers: [producers],
                awards: [awards],
                reviews: {
                    rottenTomatoes: rottenTomatoes,
                    imdb: imdb
                },
                characters: [],
                species: [],
                locations: [],
                vehicles: []
        }
        fetch("http://localhost:5555/items", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        })
            .then(r => r.json())
            .then(data => {
                onItemAdd(data)
                history.push(`/items/${data.id}`)
            })
    }
    

    return (
        <section >
            <h3 className="header">Add New Item</h3>
            <form className="new-F-fom" onSubmit={handleSubmit}>
                <input type="text" id="title" placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} />
                <input type="text" id="originalTitle" placeholder="Original Title" value={originalTitle} onChange={e => setOriginalTitle(e.target.value)} />
                <input type="text" id="originalTitleRomanised" placeholder="Original Title Romanised" value={originalTitleRomanised} onChange={e => setOriginalTitleRomanised(e.target.value)} />
                <input type="text" id="genre1" placeholder="Genre 1" value={genre1} onChange={e => setGenre1(e.target.value)} />
                <input type="text" id="genre2" placeholder="Genre 1" value={genre2} onChange={e => setGenre2(e.target.value)} />
                <input type="text" id="poster" placeholder="Poster URL" value={poster} onChange={e => setPoster(e.target.value)} />
                <input type="text" id="movieBanner" placeholder="F Baner URL" value={movieBanner} onChange={e => setMovieBanner(e.target.value)} />
                <input type="text" id="director" placeholder="Director" value={director} onChange={e => setDirector(e.target.value)} />
                <input type="text" id="screenwriters" placeholder="Screenwriter 1, Screenwriter 2, etc..." value={screenwriters} onChange={e => setScreenwriters(e.target.value)} />
                <input type="text" id="producers" placeholder="Producer1, Producer 2, etc..." value={producers} onChange={e => setProducers(e.target.value)} />
                <input type="text" id="music" placeholder="Music By" value={music} onChange={e => setMusic(e.target.value)} />
                <input type="text" id="rating" placeholder="Rating" value={rating} onChange={e => setRating(e.target.value)} />
                <input type="text" id="runningTime" placeholder="Running Time" value={runningTime} onChange={e => setRunningTime(e.target.value)} />
                <input type="text" id="budgetUSD" placeholder="Budget USD" value={budgetUSD} onChange={e => setBudgetUsd(e.target.value)} />
                <input type="text" id="boxOfficeUSD" placeholder="Box Office USD" value={boxOfficeUSD} onChange={e => setBoxOfficeUSD(e.target.value)} />
                <input type="text" id="awards" placeholder="Award 1, Award 2, etc..." value={awards} onChange={e => setAward(e.target.value)} />
                <input type="text" id="rottenTomatoes" placeholder="Rotten Tomatoes Rating" value={rottenTomatoes} onChange={e => setRottenTomatoes(e.target.value)} />
                <input type="text" id="imdb" placeholder="IMDB Rating" value={imdb} onChange={e => setImdb(e.target.value)} />
                <label>Release Date<input type="date" id="releaseDate" placeholder="Release Date" value={releaseDate} onChange={e => setReleaseDate(e.target.value)} /></label>
                <textarea id="synopsis" placeholder="Synopsis" value={synopsis} onChange={e => setSynopsis(e.target.value)} />
                <br/>
                <button type="submit">Submit</button>
            </form>
        </section>
    )
}

export default ItemNew


