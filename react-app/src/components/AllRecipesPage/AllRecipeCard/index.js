import React from 'react';
import { useState } from 'react';

function AllRecipeCard({ recipe }) {

    const [imgLoaded, setImgLoaded] = useState(false);
    const [imgError, setImgError] = useState(false);

    return (
        <div className="recipeCardDiv">
            {
                !imgLoaded &&
                <div className="allRecipeCardImage-overlay">
                    <img className='Loading-Image' src="http://simpleicon.com/wp-content/uploads/loading.png" />
                </div>
            }
            <img className="recipeCardImg"
                alt="loading"
                src={(!imgError) ? recipe.previewImage : "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Image_not_available.png/640px-Image_not_available.png"}
                onLoad={() => { setImgLoaded(true) }}
                onError={() => { setImgError(true) }}
                style={imgLoaded ? { display: "block" } : { display: "none" }} />
            <div className="textContainer">
                <div className="recipeCardTextDivUpper">
                    <div className="cardTextTitle">{recipe.title}</div>
                    <div className="cardTextAuthor">{recipe.author.username}</div>
                </div>
                <div className="recipeCardTextDivLower">
                    <div className="cardTextTime">{recipe.timeToComplete} minutes</div>
                </div>
            </div>
        </div>
    )
}

export default AllRecipeCard
