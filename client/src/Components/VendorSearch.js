import React from "react";

function VendorSearch({search, onSearchChange, onHandleItemCategoryFilter, filterByItemCategory, categories}) {

  function handleItemCategoryFilter(e){
    onHandleItemCategoryFilter(e.target.value)
  }
  
  return (
    <section>
        <div className="ui search">
            <label className="filter">
                <strong> Filter by Item Category:</strong>
                <select onChange={handleItemCategoryFilter} value={filterByItemCategory}>
                    <option value="All">All</option>
                    {categories.map((category)=> <option value={category}>{category}</option>)}
                </select>
            </label>
          <div className="ui icon input">
            <input className="prompt" type="text" name="search" placeholder="Search..." value={search} onChange={e=> onSearchChange(e.target.value)}/>
            <i className="search icon" />
          </div>          
        </div>
    </section>
  );
}

export default VendorSearch;