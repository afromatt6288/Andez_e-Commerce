import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

function CharacterNew() {
    const [name, setName] = useState("")
    const [originalCast, setOriginalCast] = useState("");
    const [lastEnglishDubbingActor, setLastEnglishDubbingActor] = useState("");
    const [still, setStill] = useState("");
    const [gender, setGender] = useState("");
    const [age, setAge] = useState("");
    const [eyeColor, setEyeColor] = useState("");
    const [hairColor, setHairColor] = useState("");

    //fetching film data for character entry and patching
    const [films, setFilms] = useState([]); 
    const [filmTitle, setFilmTitle] = useState("Please Select Film")   
    const [filmPoster, setFilmPoster] = useState("")
    const [filmMovieBanner, setFilmMovieBanner] = useState("")
    
    useEffect(() => {
        fetch("http://localhost:3001/films")
            .then(r => r.json())
            .then(data => setFilms(data))
    }, [])  

    function handleFilmFilter(e) {
        const title = e.target.value
        setFilmTitle(title);
        const poster = films.find((film) => e.target.value === film.title).poster
        setFilmPoster(poster);
        const banner = films.find((film) => e.target.value === film.title).movie_banner
        setFilmMovieBanner(banner);
      }
    // End of Film data

    //fetching Species data for character entry and patching
    const [species, setSpecies] = useState([]); 
    const [speciesName, setSpeciesName] = useState("Please Select Species")   
    useEffect(() => {
        fetch("http://localhost:3001/species")
            .then(r => r.json())
            .then(data => setSpecies(data))
    }, [])
    
    function handleSpeciesFilter(e){
        setSpeciesName(e.target.value)
    }
    // End of Species data
    
    
    const history = useHistory();
    
    function handleSubmit(e) {
        e.preventDefault()        
        const formData = {
                name: name,
                film: {
                    title: filmTitle,
                    poster: filmPoster,
                    movie_banner: filmMovieBanner
                },
                originalCast: originalCast,
                lastEnglishDubbingActor: lastEnglishDubbingActor,
                still: still,
                gender: gender,
                age: age,
                eye_color: eyeColor,
                hair_color: hairColor,
                species: species,
                vehicle: []
            }
        fetch("http://localhost:3001/characters", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        })
            .then(r => r.json())
            .then(data => {
                history.push(`/characters/${data.id}`)
            })
    }
    

    return (
        <section >
            <h3 className="header">Add New Character</h3>
            <form className="new-film-form" onSubmit={handleSubmit}>
                <input type="text" id="name" placeholder="Name" value={name} onChange={e => setName(e.target.value)} />
                <input type="text" id="originalCast" placeholder="Original Cast" value={originalCast} onChange={e => setOriginalCast(e.target.value)} />
                <input type="text" id="lastEnglishDubbingActor" placeholder="Last English Dubbing Actor" value={lastEnglishDubbingActor} onChange={e => setLastEnglishDubbingActor(e.target.value)} />
                <input type="text" id="still" placeholder="Still Image" value={still} onChange={e => setStill(e.target.value)} />
                <input type="text" id="gender" placeholder="Gender" value={gender} onChange={e => setGender(e.target.value)} />
                <input type="text" id="age" placeholder="Age" value={age} onChange={e => setAge(e.target.value)} />
                <input type="text" id="eyeColor" placeholder="Eye Color" value={eyeColor} onChange={e => setEyeColor(e.target.value)} />
                <input type="text" id="hairColor" placeholder="Hair Color" value={hairColor} onChange={e => setHairColor(e.target.value)} />
                    <select onChange={handleSpeciesFilter} value={speciesName}>
                        <option value="pleaseSelectSpecies">Please Select Species</option>
                        {species.map((specie)=> <option value={specie.name}>{specie.name}</option>)}
                    </select>
                <div>
                    <select onChange={handleFilmFilter} value={filmTitle}>
                        <option value="pleaseSelectFilm">Please Select Film</option>
                        {films.map((film)=> <option value={film.title}>{film.title}</option>)}
                    </select>
                <input type="text" id="poster" placeholder="Film Poster ULR" value={filmPoster} readOnly={true}/>
                <input type="text" id="movie_banner" placeholder="Film Movie Banner" value={filmMovieBanner} readOnly={true}/>                
                
                </div>
                <br/>
                <button type="submit">Submit</button>
            </form>
        </section>
    )
}

export default CharacterNew

// need too be able to have the new character patch into the films as well...
// need to push species to the DB
// 
// 






