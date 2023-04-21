import { useState } from "react"


export default function AddVendorByNameID({itemID}){
    const [vendorID, setVendorID] = useState(null)
    const [vendorName, setVendorName] = useState(null)

    function handleSubmit(vend_id){
            fetch("/vendoritems", {
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({
                    vendor_id:vend_id,
                    item_id:itemID
                })
            }).then(resp=>resp.json())
    }

    return (
    <div className="add-vendor-by-id-name">

        <form onSubmit={()=>{handleSubmit()}}>
            <input type = "number" placeholder="Vendor ID" value={vendorID} onChange={e=>{setVendorID(e.target.value)}}></input>
            <input type="name" placeholder="vendor name" value = {vendorName} onChange={e=>{setVendorName(e.target.value)}}></input>
            <button type="submit">Submit</button>
        </form>
    </div>
    )
}