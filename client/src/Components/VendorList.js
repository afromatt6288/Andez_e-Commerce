import React, { useState } from "react";
import VendorItem from "./VendorItem";
import VendorSearch from "./VendorSearch"
import { Card } from "semantic-ui-react"

function VendorList({vendors, items}) {    
    const [search, setSearch] = useState("")
    const [filterByItemCategory, setFilterByItemCategory] = useState("All")

    // Set my vendors in Alphabetical order
    const alphabeticalVendors = [...vendors].sort((vendor1, vendor2) =>  vendor1.vendor_name.localeCompare(vendor2.vendor_name))


    // handle my Category filter    
    const categories = items.map((item)=> item.category)
    const allCategories = categories.flat(1)
    const uniqueCategories = [...new Set(allCategories)]
    
    // Handle the filter output
    const filteredVendors = alphabeticalVendors.filter((vendor) => {
        const matchItem = filterByItemCategory === "All" || vendor.vendoritems.some((vendoritem) => {
          return vendoritem.item && vendoritem.item.category === filterByItemCategory;
        });
        return matchItem;
      });

    // this is how I am handling the VendorSearch function
    const displayedVendors = filteredVendors.filter(vendor => vendor.vendor_name.toLowerCase().includes(search.toLowerCase()))
        
    return (
        <section id="vendors">
            <h2 className="header">Andez Vendors</h2>
            <div className="search-bar">
                <VendorSearch search={search} onSearchChange={setSearch} filterByItemCategory={filterByItemCategory} onHandleItemCategoryFilter={setFilterByItemCategory} items={items} categories={uniqueCategories}/>
            </div>
            <div>
                <div className="vendor-list">
                    <Card.Group className="cards" itemsPerRow={6}>
                        {displayedVendors.map((vendor)=> (
                        <VendorItem key={vendor.id} vendor={vendor} />
                        ))}
                    </Card.Group>
                </div>
            </div>
        </section>
    );
}

export default VendorList;

