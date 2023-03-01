import { useDispatch, useSelector } from "react-redux";
import "./AllRecipesPage.css";
import { useEffect, useState } from "react";
import { NavLink, useHistory, useParams } from "react-router-dom";
import { thunkGetAllRecipe } from "../../store/recipe";

const AllRecipePage = () => {
    const sessionUser = useSelector((state) => state.session.user);
    const allRecipes = useSelector((state) => state.recipes.allRecipes)
    const dispatch = useDispatch();
    const history = useHistory();
    const [loadedPage, setLoadedPage] = useState(false);

    useEffect(() => {
        dispatch(thunkGetAllRecipe()).then(() => setLoadedPage(true));
    }, [dispatch]);


    if (!loadedPage || !allRecipes) return null

    //split allRecipes into arrays of 4 recipes
    const recipeValues = Object.values(allRecipes)

    let recipeArray = []
    for (let i = 0; i < recipeValues.length; i = i + 4) {
        recipeArray.push(recipeValues.slice(i, i + 4))
    }

    return (
        <div className="outerMostDiv">
            {
                recipeArray.map((recipes) => {
                    return (
                        <div className="rowCardDiv">
                            {recipes.map((recipe) => {
                                return (
                                    <NavLink exact to={`/recipes/${recipe.id}`} key={recipe.id} className="navLinkRecipeCard">
                                        <div className="recipeCardDiv">
                                            <img src={recipe.previewImage} alt="" className="recipeCardImg"
                                                onError={({ currentTarget }) => {
                                                    currentTarget.onerror = null; // prevents looping
                                                    currentTarget.src = "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Image_not_available.png/640px-Image_not_available.png";
                                                }} />
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
                                    </NavLink>
                                )
                            })}
                        </div>
                    )
                })
            }
        </div>
    )
}

export default AllRecipePage
