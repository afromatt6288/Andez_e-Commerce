import React, { useState } from "react";

function ListingCard({description, location, image, id, listings, setListings}) {
  const [faved, setFaved] = useState(false)
  function deleteFunction(){
    fetch(`http://localhost:6001/listings/${id}`, {method:"DELETE"})
    setListings(listings.filter((listing)=>{
      if (listing.id === id){
        return false
      }
      return true
    }
    )
    )
  }
  
  return (
    <li className="card">
      <div className="image">
        <span className="price">$0</span>
        <img src={image} alt={"description"} />
      </div>
      <div className="details">
        {faved ? (
          <button className="emoji-button favorite active" onClick = {()=>{setFaved((f)=>!f)}}>★</button>
        ) : (
          <button className="emoji-button favorite" onClick = {()=>{setFaved((f)=>!f)}}>☆</button>
        )}
        <strong>{description}</strong>
        <span> · {location}</span>
        <button className="emoji-button delete" onClick={()=>{deleteFunction()}}>🗑</button>
      </div>
    </li>
  );
}

export default ListingCard;
