import { use, useEffect, useState } from "react"
import Item from "./Item"
const temp =[    {
    "id": 1,
    "description": "heater",
    "image": "https://th.bing.com/th/id/R.18131eb5f0b32a3862315cf782a58f1a?rik=4V%2brJ0cF%2fWnkCQ&riu=http%3a%2f%2fsercblog.si.edu%2fwp-content%2fuploads%2f2013%2f03%2fCommon_shore_crab_Arthro.jpg&ehk=Lhx%2b73SvICUT%2fk3IRzTaz9jmH2C%2fZ%2fySsX1oO8WYJAg%3d&risl=&pid=ImgRaw&r=0",
    "location": "BROOKLYN",
    "price":8
  },
  {
    "id": 3,
    "description": "Free Braun 3735 Electric Toothbrush charger",
    "image": "./images/toothbrush-charger.jpg",
    "location": "Williamsburg",
    "price":8
  },
  {
    "id": 4,
    "description": "FREE Hundreds of DVD/CD Cases - Different Sizes and Colors",
    "image": "./images/dvd-cases.jpg",
    "location": "Prospect Heights",
    "price":8
  },
  {
    "id": 5,
    "description": "wood",
    "image": "./images/wood.jpg",
    "location": "Greenpoint",
    "price":8
  },
  {
    "id": 6,
    "description": "Beautiful couch",
    "image": "./images/couch.jpg",
    "location": "Bay Ridge",
    "price":8

  }
]




function ItemsDisplay({searchTerm}){
    const isSorted = false
    const [items, setItems] = useState([])
    useEffect(()=>{setItems(temp)},[])
    const isLoaded = true
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
    displayList = items.filter((element, index)=>{return element.description.includes(searchTerm)})
    .sort((item1,item2)=>{return compareStrings(item1.description, item2.description)});
    }
    else{
    displayList = items.filter((element)=>{return element.description.includes(searchTerm)});
    console.log("workin")
    }
    
    if (!isLoaded) return <h3>loading...</h3>


    return( 
    <div>
      <ul className="store-items-list">
        {displayList.map((item=>{return <Item items = {items} setItems = {setItems} 
        price = {item.price} iamge = {item.image} description={item.description}
        key = {item.id} id = {item.id}></Item>}))
        }
      </ul>
    </div>
    )
}

export default ItemsDisplay