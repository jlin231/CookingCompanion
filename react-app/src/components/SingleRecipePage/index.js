import { useDispatch, useSelector } from "react-redux";
import "./SingleRecipePage.css";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { thunkGetSingleRecipe, thunkAddCommentToRecipe, thunkDeleteCommentRecipe } from "../../store/recipe";
import OpenModalButton from "../OpenModalButton";
import ConfirmDeleteRecipeModal from "./ConfirmDeleteRecipeModal";
import CommentCard from "./EditCommentCard";

const SingleRecipePage = () => {
    const sessionUser = useSelector((state) => state.session.user);
    const singleRecipe = useSelector((state) => state.recipes.singleRecipe)
    const dispatch = useDispatch();
    const history = useHistory();
    const [loadedPage, setLoadedPage] = useState(false);
    const [imgLoaded, setImgLoaded] = useState(false);
    const [imgError, setImgError] = useState(false);
    const [errors, setErrors] = useState([]);
    const [comment, setComment] = useState("");


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

    const handleAddIngredients = () => {
        history.push(`/recipes/${recipeId}/ingredients`)
    }

    const handleEditDeleteIngredients = () => {

        history.push(`/recipes/${recipeId}/ingredients/edit`)
    }

    const deleteComment = async (e, commentId) => {
        e.preventDefault();
        
        try {
            const res = await dispatch(thunkDeleteCommentRecipe(commentId, recipeId))
        } catch (error) {
            let errorObject = JSON.parse(error.message);
            console.log(errorObject, 'errorObject')
            // const result = errorObject.errors.map((error) => {
            //     return error.split(": ")[1];
            // });
            // if (errorObject) setErrors(result);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors([]);
        try {
            const res = await dispatch(thunkAddCommentToRecipe({
                comment: comment
            }, recipeId))
                .then(() => {
                    setComment("");
                })
        } catch (error) {
            let errorObject = JSON.parse(error.message);
            const result = errorObject.errors.map((error) => {
                return error.split(": ")[1];
            });
            if (errorObject) setErrors(result);
        }
    }

    return (
        <div>
            <div className="Top-Info-Container">
                <div className="left-Info-Container bottomBorder">
                    <div className="titleSingleRecipe">{singleRecipe.title}</div>
                    <div className="authorSingleRecipe">Recipe from {singleRecipe.author.username}</div>
                </div>
                <div className="right-Info-Container " >
                    {
                        !imgLoaded &&
                        <div className="splashImageSingle">
                            <img className='Loading-Image' src="https://media.istockphoto.com/id/1335247217/vector/loading-icon-vector-illustration.jpg?s=612x612&w=0&k=20&c=jARr4Alv-d5U3bCa8eixuX2593e1rDiiWnvJLgHCkQM=" />
                        </div>
                    }
                    <img className="splashImageSingle"
                        alt="loading"
                        src={(!imgError) ? singleRecipe.previewImage : "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Image_not_available.png/640px-Image_not_available.png"}
                        onLoad={() => { setImgLoaded(true) }}
                        onError={() => { setImgError(true) }}
                        style={imgLoaded ? { display: "block" } : { display: "none" }} />
                </div>
            </div>
            <div className="Info-Container2">
                <div className="left-Info-Container2">
                    <div className="left-Info-left-Div">
                        <div className="left-Info-left-left-Div">
                            <div className="textSingleRecipeLower">Time </div>
                        </div>
                        <div className="left-Info-left-right-Div">
                            <div className="textSingleRecipeLower">{singleRecipe.timeToComplete} minutes</div>
                        </div>
                    </div>
                    <div className="buttonContainer">
                        {(sessionUser && singleRecipe.author_id === sessionUser.id) ?
                            <>
                                <div className="updateButton" onClick={handleEdit}>Edit Recipe</div>
                                <OpenModalButton
                                    buttonText={"Delete Recipe"}
                                    className="updateButton"
                                    modalComponent={<ConfirmDeleteRecipeModal recipeId={recipeId} />}
                                />
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
                                    <div className="instruction">{instruction}</div>
                                </div>
                            )
                        })
                    }
                    <div className="commentHeading">Comments</div>
                    {sessionUser && <form onSubmit={handleSubmit}>
                        <ul>
                            {errors.map((error, idx) => (
                                <li key={idx}>{error}</li>
                            ))}
                        </ul>
                        <label>
                            <textarea
                                type="comment"
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                required>
                            </textarea>
                        </label>
                        <button type="submit">Add Comment</button>
                    </form>}
                    {
                        singleRecipe.comments.map((comment, index) => {
                            return (
                                <div key={index}>
                                    <div className="instruction">By {comment.author.username}</div>
                                    <div className="instruction">{comment.comment}</div>
                                    {
                                        (sessionUser && (sessionUser.id === comment.author.id)) &&
                                        <div>

                                            <CommentCard comment={comment} recipeId={singleRecipe.id} />
                                            <div onClick={(e) => deleteComment(e, comment.id)}><i class="fa-regular fa-trash-can"></i></div>
                                        </div>
                                    }
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
