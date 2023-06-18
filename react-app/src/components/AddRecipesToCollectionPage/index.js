import { useDispatch, useSelector } from "react-redux";
import "./addRecipesToCollection.css";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { thunkGetSingleCollection, thunkAddRecipeToCollection } from "../../store/collection";

const AddRecipesToCollection = () => {
    const sessionUser = useSelector((state) => state.session.user);
    const singleCollection = useSelector((state) => state.collections.singleCollection)
    const allRecipes = useSelector((state) => state.recipes.allRecipes)
    const [loadedPage, setLoadedPage] = useState(false);

    const [recipesToAddObject, setRecipesToAddObject] = useState({});

    const dispatch = useDispatch();
    const history = useHistory();

    const { collectionId } = useParams()

    useEffect(() => {
        dispatch(thunkGetSingleCollection(collectionId)).then((res) => {
            setLoadedPage(true)
        })
        return () => {
            setLoadedPage(false);
        }
    }, [dispatch])

    if (!loadedPage && !singleCollection || !singleCollection.recipes) {
        return null;
    }
    //filter recipes, make a list which are owned by sessionUser, and not in collection
    const recipesToAdd = Object.values(allRecipes).filter((recipe) => {
        //check if recipe is inside current collection
        for (let i = 0; i < singleCollection.recipes.length; i++) {
            if (singleCollection.recipes[i].id === recipe.id) {
                return false;
            }
        }
        if (recipe.author_id === sessionUser.id) {
            return true
        }
        else {
            return false
        }
    })
    let recipeArray = []
    for (let i = 0; i < recipesToAdd.length; i = i + 3) {
        recipeArray.push(recipesToAdd.slice(i, i + 3))
    }

    let currentRecipeArray = []
    for (let i = 0; i < singleCollection.recipes.length; i = i + 3) {
        currentRecipeArray.push(singleCollection.recipes.slice(i, i + 3))
    }

    const toggleAddRecipeClass = (recipeId) => {
        if (!recipesToAddObject[recipeId]) {
            let tempObject = { ...recipesToAddObject }
            tempObject[recipeId] = recipeId
            setRecipesToAddObject({ ...tempObject })
        }
        else {
            let tempObject = { ...recipesToAddObject }
            delete tempObject[recipeId]
            setRecipesToAddObject(tempObject)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        let body = { recipes: [] }
        for (const i in recipesToAddObject) {
            body.recipes.push({ "id": i })
        }
        dispatch(thunkAddRecipeToCollection(singleCollection.id, body)).then(() => {
            history.push(`/collections/${singleCollection.id}`)
        })
    };
    return (
        <div className="outerMostDivAddRecipe">
            <div className="Add-Recipe-Header-Container">
                <div className="Global-Form-Button-Header">Add Recipes To Collection</div>
            </div>
            <div>
                {
                    recipeArray.map((recipes) => {
                        return (
                            <div className="AddRecipesRowDiv">
                                {
                                    recipes.map((recipe) => {
                                        let imageClass = "recipeImg"
                                        if (recipesToAddObject[recipe.id]) {
                                            imageClass = "recipeImg highLight"
                                        }
                                        return (
                                            <div className="imageRowDiv" >
                                                <div className={imageClass} onClick={() => toggleAddRecipeClass(recipe.id)}>
                                                    <img src={recipe.previewImage}
                                                        alt=""
                                                        className="recipeImg"
                                                    />
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        )
                    })
                }
            </div>
            <button type="submit" className="addRecipeButton" onClick={(e) => handleSubmit(e)}>
                Submit
            </button>
            <div className="Add-Recipe-Header-Container">
                <div className="Global-Form-Button-Header">Current Recipes in Collection</div>
            </div>
            <div>
                {
                    currentRecipeArray.map((recipes) => {
                        return (
                            <div className="AddRecipesRowDiv">
                                {
                                    recipes.map((recipe) => {
                                        return (
                                            <div className="imageRowDiv" >
                                                <img src={recipe.previewImage}
                                                    alt=""
                                                    className="recipeImgNotInCollection"
                                                />
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        )
                    })
                }
            </div>
        </div >
    )
}

export default AddRecipesToCollection
