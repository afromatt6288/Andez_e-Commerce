import React from "react";

function SpeciesDetail({species}) {
    
    const {name, classification, eye_colors, hair_colors} = species
    
    return (
        <div className="species-detail-intro">
            <span>
                <label>Species <p>{name}</p></label> 
                <label>Clasification: <p>{classification}</p></label>
                <label>Hair Colors: <p>{hair_colors}</p></label>
                <label>Eye Colors:<p>{eye_colors}</p></label>
            </span>              
        </div>
    );
}

export default SpeciesDetail;