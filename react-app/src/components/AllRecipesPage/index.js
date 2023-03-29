import { useDispatch, useSelector } from "react-redux";
import "./AllRecipesPage.css";
import { useEffect, useState } from "react";
import { NavLink, useHistory, useLocation } from "react-router-dom";
import { thunkGetAllRecipe } from "../../store/recipe";
import AllRecipeCard from "./AllRecipeCard";

const AllRecipePage = () => {
    const allRecipes = useSelector((state) => state.recipes.allRecipes)
    const dispatch = useDispatch();
    const [loadedPage, setLoadedPage] = useState(false);
    const location = useLocation()

    useEffect(() => {
        console.log("does it break here?")
        dispatch(thunkGetAllRecipe()).then(() => setLoadedPage(true));
    }, [dispatch]);


    if (!loadedPage || !allRecipes) return null

    //split allRecipes into arrays of 4 recipes
    let recipeValues = Object.values(allRecipes)

    if (location.query) {
        recipeValues = recipeValues.filter((recipe) => {
            if ((recipe.description.toLowerCase()).includes(location.query) ||
                (recipe.title.toLowerCase()).includes(location.query) ||
                (recipe.instructions.toLowerCase()).includes(location.query)) {
                return true
            }
            else {
                return false
            }
        })
    }

    let recipeArray = []
    for (let i = 0; i < recipeValues.length; i = i + 4) {
        recipeArray.push(recipeValues.slice(i, i + 4))
    }

    return (
        <div className="outerMostDiv">
            {
                recipeArray.map((recipes, index) => {
                    return (
                        <div className="rowCardDiv" key={index}>
                            {recipes.map((recipe) => {
                                return (
                                    <NavLink exact to={`/recipes/${recipe.id}`} key={recipe.id} className="navLinkRecipeCard">
                                        <AllRecipeCard recipe={recipe} />
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
