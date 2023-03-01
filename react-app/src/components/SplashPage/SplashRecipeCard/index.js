import React from 'react';
import { useState } from 'react';

function SplashRecipeCard({ recipe }) {

    const [imgLoaded, setImgLoaded] = useState(false);
    const [imgError, setImgError] = useState(false);


    const onImageLoaded = () => {
        setImgLoaded(true);
    }

    const onImageError = () => {
        setImgError(true);
    }

    return (
        <div className="splashRecipeCard">
            <div className="recipeCardImageContainer">
                {
                    !imgLoaded &&
                    <div className="splashRecipeCardImage-overlay">
                        <img className='Loading-Image' src="http://simpleicon.com/wp-content/uploads/loading.png" />
                    </div>
                }
                <img className="splashRecipeCardImage"
                    alt="loading"
                    src={(!imgError) ? recipe.previewImage : "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Image_not_available.png/640px-Image_not_available.png"}
                    onLoad={()=>{setImgLoaded(true)}}
                    onError={()=>{setImgError(true)}}
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
