import React, { useState } from "react";
import ItemItem from "./ItemItem";
import ItemSearch from "./ItemSearch"
import { Card } from "semantic-ui-react"

function ItemList({items, vendors}) {
    const [search, setSearch] = useState("")
    const [sortBy, setSortBy] = useState("Alphabetical")
    const [filterBy, setFilterBy] = useState("Featured Items")

    // handle my Item sort
    const sortedItems = [...items].sort((item1, item2) => {
        if (sortBy === "Alphabetical") {
            return item1.name.localeCompare(item2.name)
        } else if (sortBy === "Price") {
            return item1.price - item2.price;
        }
        return console.log('error on sort')
    })

    // handle my Category filter    
    const categories = items.map((item)=> item.category)
    const allCategories = categories.flat(1)
    const uniqueCategories = [...new Set(allCategories)]
    const filteredItems = sortedItems.filter((item)=> filterBy === "All" ? sortedItems : item.category === filterBy)

    // this is how I am handling the ItemSearch function
    const displayedItems = filteredItems.filter(item => item.name.toLowerCase().includes(search.toLowerCase()))
        
    return (
        <section id="items">
            <h2 className="header">Andez Items</h2>
            <div className="search-bar">
                <ItemSearch search={search} onSearchChange={setSearch} sortBy={sortBy} onSortChange={setSortBy} filterBy={filterBy} onHandleFilter={setFilterBy} categories={uniqueCategories}/>
            </div>
            <div>
            <div className="item-list">
                <Card.Group className="cards" itemsPerRow={6}>
                    {displayedItems.map((item)=> (
                    <ItemItem key={item.id} item={item} />
                    ))}
                </Card.Group>
            </div>
            </div>
        </section>
    );
}

export default ItemList;
