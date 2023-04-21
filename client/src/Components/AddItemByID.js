import { useState } from "react"

export default function AddItemByID({vendorID}){
    const [itemID, setItemID] = useState(null)

    function handleSubmit(){
        fetch("/vendoritems", {
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                vendor_id:vendorID,
                item_id:itemID
            })
        }).then(resp=>resp.json())
    }

    return (
    <div className="add-item-by-id">
        <form onSubmit={()=>{handleSubmit()}}>
            <input type = "number" placeholder="Item ID" id = "input-item-id" value={itemID} onChange={e=>{setItemID(e.target.value)}}></input>
            <br/>
            <button type="submit">Submit</button>
        </form>
    </div>
    )
}