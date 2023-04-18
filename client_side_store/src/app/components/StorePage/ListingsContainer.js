import React, {useEffect, useState} from "react";
import ListingCard from "./ListingCard";

const temp =[    {
      "id": 1,
      "description": "heater",
      "image": "https://th.bing.com/th/id/R.18131eb5f0b32a3862315cf782a58f1a?rik=4V%2brJ0cF%2fWnkCQ&riu=http%3a%2f%2fsercblog.si.edu%2fwp-content%2fuploads%2f2013%2f03%2fCommon_shore_crab_Arthro.jpg&ehk=Lhx%2b73SvICUT%2fk3IRzTaz9jmH2C%2fZ%2fySsX1oO8WYJAg%3d&risl=&pid=ImgRaw&r=0",
      "location": "BROOKLYN"
    },
    {
      "id": 3,
      "description": "Free Braun 3735 Electric Toothbrush charger",
      "image": "./images/toothbrush-charger.jpg",
      "location": "Williamsburg"
    },
    {
      "id": 4,
      "description": "FREE Hundreds of DVD/CD Cases - Different Sizes and Colors",
      "image": "./images/dvd-cases.jpg",
      "location": "Prospect Heights"
    },
    {
      "id": 5,
      "description": "wood",
      "image": "./images/wood.jpg",
      "location": "Greenpoint"
    },
    {
      "id": 6,
      "description": "Beautiful couch",
      "image": "./images/couch.jpg",
      "location": "Bay Ridge"
    }
  ]


function ListingsContainer({searchTerm, isSorted, gregsListings, setGregsListings}) {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(()=>{
    setGregsListings(temp); setIsLoaded(true);
    // fetch("http://localhost:6001/listings").then(res=>res.json()).then(arr=>setGregsListings(arr)).then(setIsLoaded(true));
  }, []);

  function compareStrings(str1, str2){
    if (str1<str2){
      return -1
    }
    if (str1 > str2){
      return 1
    }
    return 0
  }

  let displayList = []
  if(isSorted){
  displayList = gregsListings.filter((element, index)=>{return element.description.includes(searchTerm)})
  .sort((ls1,ls2)=>{return compareStrings(ls1.description, ls2.description)});
  }
  else{
    displayList = gregsListings.filter((element)=>{return element.description.includes(searchTerm)});
  }
  
  if (!isLoaded) return <h3>loading...</h3>
  return (
    <main>
      <ul className="cards">
        {displayList.map((listing=>{return <ListingCard listings = {gregsListings} setListings = {setGregsListings} description = {listing.description} location = {listing.location} image = {listing.image} key = {listing.id} id = {listing.id}></ListingCard>}))
        }
      </ul>
    </main>
  );
}

export default ListingsContainer;
