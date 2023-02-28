import { useDispatch, useSelector } from "react-redux";
import "./SingleRecipePage.css";
import { useEffect, useState } from "react";
import { NavLink, useHistory, useParams } from "react-router-dom";
import { thunkDeleteRecipe, thunkGetAllRecipe, thunkGetSingleRecipe } from "../../store/recipe";

const SingleRecipePage = () => {
    const sessionUser = useSelector((state) => state.session.user);
    const singleRecipe = useSelector((state) => state.recipes.singleRecipe)
    const dispatch = useDispatch();
    const history = useHistory();
    const [loadedPage, setLoadedPage] = useState(false);

    let { recipeId } = useParams()

    useEffect(() => {
        dispatch(thunkGetSingleRecipe(recipeId)).then(() => setLoadedPage(true));
    }, [dispatch]);

    if (!loadedPage || !singleRecipe) {
        return null
    }

    //process instructions
    const instructionSplit = singleRecipe.instructions.split(';');
    instructionSplit.pop()


    const handleEdit = () => {
        history.push(`/recipes/${recipeId}/edit`)
    }

    const handleDelete = () => {
        dispatch(thunkDeleteRecipe(recipeId)).then(() => {
            dispatch(thunkGetAllRecipe)
        }).then(() => {
            history.push('/recipes')
        })
    }

    const handleAddIngredients = () => {
        history.push(`/recipes/${recipeId}/ingredients`)
    }

    const handleEditDeleteIngredients = () => {

        history.push(`/recipes/${recipeId}/ingredients/edit`)
    }

    return (
        <div>
            <div className="Top-Info-Container">
                <div className="left-Info-Container bottomBorder">
                    <div className="titleSingleRecipe">{singleRecipe.title}</div>
                    <div className="authorSingleRecipe">Recipe from {singleRecipe.author.username}</div>
                </div>
                <div className="right-Info-Container " >
                    <img className="splashImageSingle" src={`${singleRecipe.previewImage}`} alt="" />
                </div>
            </div>
            <div className="Info-Container2">
                <div className="left-Info-Container2">
                    <div className="left-Info-left-Div">
                        <div className="left-Info-left-left-Div">
                            <div className="textSingleRecipeLower">Time </div>
                            {/* <div className="textSingleRecipeLower">Rating</div> */}
                        </div>
                        <div className="left-Info-left-right-Div">
                            <div className="textSingleRecipeLower">{singleRecipe.timeToComplete} minutes</div>
                            {/* <div>Rating to Come</div> */}

                        </div>
                    </div>
                    <div className="buttonContainer">
                        {(sessionUser && singleRecipe.author_id === sessionUser.id) ?
                            <>
                                <div className="updateButton" onClick={handleEdit}>Update Recipe</div>
                                <div className="updateButton" onClick={handleDelete}>Delete Recipe</div>
                            </> : null
                        }
                    </div>
                </div>
                <div className="right-Info-Container">
                    <div className="authorSingleDescription">{singleRecipe.description}</div>
                    <div className="authorText"> —{singleRecipe.author.username}</div>
                </div>
            </div>
            <div className="Top-Info-Container3">
                <div className="left-Info-Container3 topBorder">
                    <div className="infoHeading">
                        <div>INGREDIENTS</div>
                        {(sessionUser && singleRecipe.author_id === sessionUser.id) ?
                            <div className="ingredientButtonHolder">
                                <div className="addIngredientsButton" onClick={handleAddIngredients}>Add Ingredients</div>
                                <div className="addIngredientsButton" onClick={handleEditDeleteIngredients}>Edit/Delete Ingredients</div>
                            </div>
                            : null
                        }
                    </div>
                    {
                        singleRecipe.ingredients.map((ingredient) => {
                            return (
                                <div className="ingredient">{ingredient["quantity"]} {ingredient.unit} {ingredient.name}</div>
                            )
                        })
                    }
                </div>
                <div className="right-Info-Container topBorder" >
                    <div className="infoHeading">PREPARATION</div>
                    {
                        instructionSplit.map((instruction, index) => {
                            return (
                                <div key={index}>
                                    <div className="step">Step {index + 1}</div>
                                    <div className="instruction">{`${instruction}`}</div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default SingleRecipePage
