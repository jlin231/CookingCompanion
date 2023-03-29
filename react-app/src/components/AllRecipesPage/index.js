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
    for (let i = 0; i < recipeValues.length; i = i + 4) {
        recipeArray.push(recipeValues.slice(i, i + 4))
    }

    let collectionArray = []
    for (let i = 0; i < 4; i = i + 4) {
        collectionArray.push(collectionValues.slice(i, i + 4))
    }
    console.log('collection', collectionArray)
    return (
        <>
            <div className="outerAllRecipeDiv">
                {
                    collectionArray.map((collections, index) => {
                        return (
                            <div className="rowCardDiv" key={index}>
                                {collections.map((collection) => {
                                    return (
                                        <NavLink exact to={`/collections/${collection.id}`} key={collection.id} className="navLinkRecipeCard">
                                            <AllCollectionCard collection={collection} />
                                        </NavLink>
                                    )
                                })}
                            </div>
                        )
                    })
                }
            </div>
            <div className="outerAllRecipeDiv">
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
        </>
    )
}

export default AllRecipePage
