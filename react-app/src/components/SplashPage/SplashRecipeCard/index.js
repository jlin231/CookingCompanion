import React from 'react';
import { useState } from 'react';


function SplashRecipeCard({ recipe }) {

    const [imgLoaded, setImgLoaded] = useState(false);
    const [imgError, setImgError] = useState(false);

    return (
        <div className="splashRecipeCard">
            <div className="recipeCardImageContainer">
                {
                    !imgLoaded &&
                    <div className="splashRecipeCardImage-overlay">
                        <img className='Loading-Image' src="https://media.istockphoto.com/id/1335247217/vector/loading-icon-vector-illustration.jpg?s=612x612&w=0&k=20&c=jARr4Alv-d5U3bCa8eixuX2593e1rDiiWnvJLgHCkQM=" />
                    </div>
                }
                <img className="splashRecipeCardImage"
                    alt="loading"
                    src={(!imgError) ? recipe.previewImage : "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Image_not_available.png/640px-Image_not_available.png"}
                    onLoad={() => { setImgLoaded(true) }}
                    onError={() => { setImgError(true) }}
                    style={imgLoaded ? { display: "block" } : { display: "none" }} />
            </div>
            <div className="recipeCardText">
                <div className="titleCardDiv">{recipe.title}</div>
                <div className="authorCardDiv">By {recipe.author.username}</div>
            </div>
        </div>
    )
}

export default SplashRecipeCard;
