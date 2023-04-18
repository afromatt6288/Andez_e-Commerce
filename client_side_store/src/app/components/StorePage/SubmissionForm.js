import React, { useState } from "react";

function SubmissionForm({gregsListings, setGregsListings}){
    const [desc, setDesc] = useState("")
    const [img, setImg] = useState("")
    const [loc, setLoc] = useState("")

    function handleSubmit(e){
        e.preventDefault()
        const listingData = {
            "description": `${desc}`,
            "image": `${img}`,
            "location": `${loc}`
        }

        fetch("http://localhost:6001/listings",{
            method:"POST",
            headers:{
                "Content-Type":"application/json",
            },
            body:JSON.stringify(listingData),
        }).then(resp => resp.json()).then(item=>{setGregsListings([...gregsListings, {...listingData, id:item.id}])}).then(_=>{setDesc("");setImg(""); setLoc("");})
    }

    return(
    <form onSubmit={handleSubmit}>
        <input
        type="text"
        id="submit-desc"
        placeholder="Description"
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
        />    
        <input
        type="text"
        id="submit-img"
        placeholder="Image URL"
        value={img}
        onChange={(e) => setImg(e.target.value)}
        />            
        <input
        type="text"
        id="submit-loc"
        placeholder="location"
        value={loc}
        onChange={(e) => setLoc(e.target.value)}
        />    
        <button type="submit">submit</button>
    </form>
    )
}

export default SubmissionForm;