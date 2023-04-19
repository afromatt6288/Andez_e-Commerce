import React, { useState } from "react";
import CharacterItem from "./CharacterItem";
import CharacterSearch from "./CharacterSearch"
import { Card } from "semantic-ui-react"

function CharacterList({films, characters, species, vehicles}) {    
    const [search, setSearch] = useState("")
    const [filterBySpecies, setFilterBySpecies] = useState("All")
    const [filterByFilm, setFilterByFilm] = useState("All")

    

    // set uniqueSpecies filter    
    // const species = characters.map((character)=> character.species)
    // const allSpecies = species.flat(1)
    // const uniqueSpecies = [...new Set(allSpecies)]
   
    // set uniqueMovies filter   
    // const films = characters.map((character)=> character.film.title)
    // const allFilms = films.flat(1)
    // const uniqueFilms = [...new Set(allFilms)]

    // Set my characters in Alphabetical order
    const alphabeticalCharacters = [...characters].sort((character1, character2) =>  character1.name.localeCompare(character2.name))

    // Handle the dual filter output
    const filteredCharacters = alphabeticalCharacters.filter((character) => {
        const matchSpecies = filterBySpecies === "All" || character.species === filterBySpecies;
        const matchFilm = filterByFilm === "All" || character.film.title === filterByFilm;
        return matchSpecies && matchFilm;
      });

    // this is how I am handling the CharacterSearch function
    const displayedCharacters = filteredCharacters.filter(character => character.name.toLowerCase().includes(search.toLowerCase()))
        
    return (
        <section id="characters">
            <h2 className="header">Ghibli Characters</h2>
            <div className="search-bar">
                <CharacterSearch search={search} onSearchChange={setSearch} filterBySpecies={filterBySpecies} onHandleSpeciesFilter={setFilterBySpecies} filterByFilm={filterByFilm} onHandleFilmFilter={setFilterByFilm} species={species} films={films}/>
            </div>
            <div>
            <div className="character-list">
                <Card.Group className="cards" itemsPerRow={6}>
                    {displayedCharacters.map((character)=> (
                    <CharacterItem key={character.id} character={character} />
                    ))}
                </Card.Group>
            </div>
            </div>
        </section>
    );
}

export default CharacterList;

