import React, { Component, useEffect } from "react";
import "./ZoomingImage.css"

function ZoomingImage ({onCategoryClick = () => {}, text = "", src = "chip.jpg", alt = "chip.jpg", stop = 50}) {
    
    return ( 
        <div onClick={onCategoryClick} className="zooming-image-container" >
            <p>{text}</p>
            <img className="zooming-image" src={src} alt={alt}></img>
        </div>
     );
}

export default ZoomingImage;
