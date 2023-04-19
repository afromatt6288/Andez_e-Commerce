import React, { useState } from "react";
import ItemItem from "./ItemItem";
import ItemSearch from "./ItemSearch"
import { Card } from "semantic-ui-react"

function ItemList({items, setItems}) {
    console.log("helpmeplz", items)
    let films = [...items]
    const [search, setSearch] = useState("")
    const [sortBy, setSortBy] = useState("Alphabetical")
    const [filterBy, setFilterBy] = useState("All")
    // const tempFilms = [12,34]
    // handle my Film sort
    const sortedFilms = [...films].sort((film1, film2) => {
        if (sortBy === "Alphabetical") {
            return film1.title.localeCompare(film2.title)
        } else if (sortBy === "Date") {
            const dateA = new Date(film1.release_date);
            const dateB = new Date(film2.release_date);
            return dateA.getTime() - dateB.getTime();
        }
        return console.log('error on sort')
    })

    // handle my Genre filter    
    const genres = films.map((film)=> film.genres)
    const allGenres = genres.flat(1)
    const uniqueGenres = [...new Set(allGenres)]
    const filteredFilms = sortedFilms.filter((film)=> filterBy === "All" ? sortedFilms : film.genres[0] === filterBy || film.genres[1] === filterBy )

    // this is how I am handling the ItemSearch function
    const displayedFilms = filteredFilms.filter(film => film.title.toLowerCase().includes(search.toLowerCase()))
        
    return (
        <section id="films">
            <h2 className="header">Ghibli Films</h2>
            <div className="search-bar">
                <ItemSearch search={search} onSearchChange={setSearch} sortBy={sortBy} onSortChange={setSortBy} filterBy={filterBy} onHandleFilter={setFilterBy} genres={uniqueGenres}/>
            </div>
            <div>
            <div className="film-list">
                <Card.Group className="cards" itemsPerRow={6}>
                    {displayedFilms.map((film)=> (
                    <ItemItem key={film.id} film={film} />
                    ))}
                </Card.Group>
            </div>
            </div>
        </section>
    );
}

export default ItemList;
