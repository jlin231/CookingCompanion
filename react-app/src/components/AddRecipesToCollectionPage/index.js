import { useDispatch, useSelector } from "react-redux";
import "./addRecipesToCollection.css";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { thunkGetSingleCollection, thunkEditCollection } from "../../store/collection";

const AddRecipesToCollection = () => {
    const sessionUser = useSelector((state) => state.session.user);
    const singleCollection = useSelector((state) => state.collections.singleCollection)
    const allRecipes = useSelector((state) => state.recipes.allRecipes)
    const [loadedPage, setLoadedPage] = useState(false);

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [errors, setErrors] = useState([]);
    const [recipesToAddArray, setRecipesToAddArray] = useState([]);

    const dispatch = useDispatch();
    const history = useHistory();

    const { collectionId } = useParams()

    //load singleCollection
    useEffect(() => {
        dispatch(thunkGetSingleCollection(collectionId)).then((res) => {
            console.log('res', res)
            setLoadedPage(true)
            setName(res.name)
            setDescription(res.description)
        })
        return () => {
            setLoadedPage(false);
        }
    }, [dispatch])

    if (!loadedPage && !singleCollection || !singleCollection.recipes) {
        console.log("loadedPagecomparater hits")
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

    const toggleAddRecipeClass = (recipe) => {
        console.log(recipe)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors([]);

        const body = {
            name,
            description
        };
    };

    return (
        <div className="outerMostDivAddRecipe">
            <div>
                {
                    recipeArray.map((recipes) => {
                        return (
                            <div className="AddRecipesRowDiv">
                                {
                                    recipes.map((recipe) => {
                                        return (
                                            <div className="imageRowDiv" >
                                                <img src={recipe.previewImage}
                                                    alt=""
                                                    className="recipeImg"
                                                    onClick={(recipe) => toggleAddRecipeClass(recipe)} />
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        )
                    })
                }
            </div>
            <form onSubmit={handleSubmit} className="Global-Form-Container">
                <div className="Global-Header-Container">
                    <div className="Global-Form-Button-Header">Add Recipes To Collection</div>
                </div>
                <label for="name" className="Global-Form-Label">
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        placeholder="Name"
                        className="Global-Form-input"
                    />
                </label>
                <label for="description" className="Global-Form-Label">
                    <textarea
                        type="text"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                        placeholder="Description"
                        className="Global-Form-input Global-Form-Text-Area-Description"
                    ></textarea>
                </label>
                <button type="submit" className="Global-SubmitButton">
                    Submit
                </button>
            </form>

        </div >
    )
}

export default AddRecipesToCollection
