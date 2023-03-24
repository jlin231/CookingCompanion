import React from 'react';
import { useState } from 'react';

function AllRecipeCard({ recipe }) {

    const [imgLoaded, setImgLoaded] = useState(false);
    const [imgError, setImgError] = useState(false);
    console.log('allrecipe is reached', recipe)
    return (
        <div className="recipeCardDiv">
            {
                !imgLoaded &&
                <div className="allRecipeCardImage-overlay">
                    <img className='Loading-Image' src="https://media.istockphoto.com/id/1335247217/vector/loading-icon-vector-illustration.jpg?s=612x612&w=0&k=20&c=jARr4Alv-d5U3bCa8eixuX2593e1rDiiWnvJLgHCkQM=" />
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
