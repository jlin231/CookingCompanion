import { useDispatch, useSelector } from "react-redux";
import "./AllRecipesPage.css";
import { useEffect, useState } from "react";
import { NavLink, useHistory, useLocation } from "react-router-dom";
import { thunkGetAllRecipe } from "../../store/recipe";
import { thunkGetAllCollections } from "../../store/collection";
import AllRecipeCard from "./AllRecipeCard";
import AllCollectionCard from "./AllCollectionCard";

const AllRecipePage = () => {
    const allRecipes = useSelector((state) => state.recipes.allRecipes)
    const allCollections = useSelector((state) => state.collections.allCollections)
    const dispatch = useDispatch();
    const [loadedPage, setLoadedPage] = useState(false);
    const location = useLocation()

    useEffect(() => {
        dispatch(thunkGetAllRecipe()).then(() => dispatch(thunkGetAllCollections())).then(() => setLoadedPage(true));
    }, [dispatch]);

    if (!loadedPage || !allRecipes || !allCollections) return null

    //split allRecipes into arrays of 4 recipes
    let recipeValues = Object.values(allRecipes)
    let collectionValues = Object.values(allCollections)

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
        collectionValues = collectionValues.filter((collection) => {
            if ((collection.description.toLowerCase()).includes(location.query) ||
                (collection.name.toLowerCase()).includes(location.query)) {
                return true
            }
            else {
                return false
            }
        })
    }

    let recipeArray = []
    let resultsValues = collectionValues.concat(recipeValues)


    let resultsArray = []
    for (let i = 0; i < resultsValues.length; i = i + 4) {
        resultsArray.push(resultsValues.slice(i, i + 4))
    }

    for (let i = 0; i < recipeValues.length; i = i + 4) {
        recipeArray.push(recipeValues.slice(i, i + 4))
    }

    let collectionArray = []
    for (let i = 0; i < collectionValues.length; i = i + 4) {
        collectionArray.push(collectionValues.slice(i, i + 4))
    }
    return (
        <>
            <div className="outerAllRecipeDiv">
                {
                    resultsArray.map((results, index) => {
                        return (
                            <div className="rowCardDiv" key={index}>
                                {results.map((result) => {
                                    if (!result.createdAt) {
                                        return (
                                            <NavLink exact to={`/collections/${result.id}`} key={result.id} className="navLinkRecipeCard">
                                                <AllCollectionCard collection={result} />
                                            </NavLink>
                                        )
                                    }
                                    else {
                                        return (
                                            <NavLink exact to={`/recipes/${result.id}`} key={result.id} className="navLinkRecipeCard">
                                                <AllRecipeCard recipe={result} />
                                            </NavLink>
                                        )
                                    }
                                })}
                            </div>
                        )
                    })
                }
            </div>
        </>
    )
}

export default AllRecipePage
