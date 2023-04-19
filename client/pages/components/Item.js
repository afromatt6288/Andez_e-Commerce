import { useState } from "react"

function Item({items, setItems, id, image, price, description}){
    
    const [inCart, setInCart] = useState(false)

      
    return( 
    <li className="card">
      <div className="card-image">
        <span className="price">${price}</span>
        <img src={image} alt={"description"} />
      </div>
      <div className="details">
        {inCart ? (
          <button className="emoji-button favorite active" onClick = {()=>{setInCart((f)=>!f)}}>★</button>
        ) : (
          <button className="emoji-button favorite" onClick = {()=>{setInCart((f)=>!f)}}>☆</button>
        )}
        <strong>{description}</strong>
      </div>
    </li>
    )
}

export default Item