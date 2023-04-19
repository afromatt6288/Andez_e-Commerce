import React from "react";

function ItemSearch({search, onSearchChange, sortBy, onSortChange, onHandleFilter, filterBy, genres}) {
  
  function handleSortChange(e){
    onSortChange(e.target.value)
  }

  function handleFilter(e){
    onHandleFilter(e.target.value)
  }

  return (
    <div className="ui search">
      <label className="sortBy">Sort By :         
        <input
          type="radio"
          value="Alphabetical"
          name="sort"
          checked={sortBy === "Alphabetical"}
          onChange={handleSortChange}
        />
        Alphabetical
        <input
          type="radio"
          value="Date"
          name="sort"
          checked={sortBy === "Date"}
          onChange={handleSortChange}
        />
        Date
      </label>
      <label className="filter">
        <strong>Genre Filter:</strong>
        <select onChange={handleFilter} value={filterBy}>
          <option value="All">All</option>
          {genres.map((genre)=> <option value={genre}>{genre}</option>)}
        </select>
      </label>
      <div className="ui icon input">
        <input className="prompt" type="text" name="search" placeholder="Search..." value={search} onChange={e=> onSearchChange(e.target.value)}/>
        <i className="search icon" />
      </div>
    </div>
  );
}

export default ItemSearch;