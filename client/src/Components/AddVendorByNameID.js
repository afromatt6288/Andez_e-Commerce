import { useState } from "react"

export default function AddVendorByNameID({itemID}){
    const [vendorID, setVendorID] = useState(null)
    const [vendorName, setVendorName] = useState("")

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

    function handleParseNameSubmit(e){
        e.preventDefault()
        if (vendorName !== "" && vendorName != null){
            fetch("/vendors").then(resp=>resp.json())
            .then(ls=>{
                for (let vend of ls){
                    if (vend.vendor_name === vendorName){
                        return vend.id
                    }
                }
                return -1
            }).then(parsedId=>{
                if (parsedId === -1){
                    return null
                }
                handleSubmit(parsedId)
            })
        }
        else if (vendorID !== null && vendorID !== 0){
            handleSubmit(vendorID)
        }
    }

    return (
    <div className="add-vendor-by-id-name">
        <form onSubmit={e=>{handleParseNameSubmit(e)}}>
            <input type = "number" placeholder="Vendor ID" value={vendorID} onChange={e=>{setVendorID(e.target.value)}}></input>
            <br/>
            <input type="name" placeholder="vendor name" value = {vendorName} onChange={e=>{setVendorName(e.target.value)}}></input>
            <button type="submit">Submit</button>
        </form>
    </div>
    )
}