import { useDispatch, useSelector } from "react-redux";
import "./singleCollectionPage.css";
import { useEffect, useState } from "react";
import { NavLink, useHistory, useParams } from "react-router-dom";
import { thunkGetSingleCollection, thunkDeleteCollection, thunkDeleteRecipeFromCollection } from "../../store/collection";
import AllRecipeCard from "../AllRecipesPage/AllRecipeCard";


const SingleCollectionPage = () => {
    const singleCollection = useSelector((state) => state.collections.singleCollection)
    const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state.session.user)
    const [loadedPage, setLoadedPage] = useState(false);
    const history = useHistory()
    const { collectionId } = useParams();

    useEffect(() => {
        dispatch(thunkGetSingleCollection(collectionId)).then(() => setLoadedPage(true));
        return () => {
            setLoadedPage(false);
        }
    }, [dispatch]);

    if (!loadedPage || Object.values(singleCollection).length === 0) {
        return null
    }

    const addRecipesToCollection = (e) => {
        e.preventDefault()
        history.push(`/collections/${collectionId}/recipe/edit`)
    }

    const editCollection = (e) => {
        e.preventDefault()
        history.push(`/collections/${collectionId}/edit`)
    }

    const removeRecipeFromCollection = (recipeId, collectionId) => {
        console.log(recipeId, collectionId)
        dispatch(thunkDeleteRecipeFromCollection(recipeId, collectionId)).then(() => {
            dispatch(thunkGetSingleCollection(collectionId))
        })
    }

    const deleteCollection = () => {
        dispatch(thunkDeleteCollection(collectionId)).then(() => {
            history.push('/')
        })
    }

    const recipeValues = singleCollection.recipes
    let recipeArray = []
    if (recipeValues) {
        for (let i = 0; i < recipeValues.length; i = i + 4) {
            recipeArray.push(recipeValues.slice(i, i + 4))
        }
    }

    return (
        <>
            <div className="upperContainer">
                <div className="CollectionUpper-Container">
                    <div className="CollectionUpper-Container-Left">
                        <img className="imageCollection" src={singleCollection.imageUrl} alt=""
                            onError={({ currentTarget }) => {
                                currentTarget.onerror = null; // prevents looping
                                currentTarget.src = "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Image_not_available.png/640px-Image_not_available.png";
                            }} />
                    </div>
                    <div className="CollectionUpper-Container-Right">
                        <div className="underRightHeading">
                            <div className="collectionHeading">Collection</div>
                            <div className="collectionName">{singleCollection.name}</div>
                            <div className="collectionDescription">{singleCollection.description}</div>
                            <div className="collectionAuthor">By {singleCollection.author.username}</div>
                        </div>
                        <div className="buttonClass">
                            {
                                (sessionUser && sessionUser.id === singleCollection.author.id) &&
                                (
                                    <>
                                        <div onClick={addRecipesToCollection} className="splashButtons">
                                            Add Recipes to Collection
                                        </div>
                                        <div onClick={editCollection} className="splashButtons">
                                            Edit Collection
                                        </div>
                                        <div onClick={deleteCollection} className="splashButtons">
                                            Delete Collection
                                        </div>
                                    </>
                                )
                            }
                        </div>
                    </div>

                </div>
            </div>
            <div className="outerDivCollectionRecipes">
                {
                    recipeArray.map((recipes, index) => {
                        return (
                            <div className="rowCardDiv" key={index}>
                                {recipes.map((recipe) => {
                                    return (
                                        <div>
                                            <NavLink exact to={`/recipes/${recipe.id}`} key={recipe.id} className="navLinkRecipeCard">
                                                <AllRecipeCard recipe={recipe} />
                                            </NavLink>
                                            {
                                                (sessionUser && sessionUser.id === singleCollection.author.id) &&
                                                <div className="removeRecipeButton" onClick={() => removeRecipeFromCollection(recipe.id, singleCollection.id)}>Remove Recipe from Collection</div>
                                            }
                                        </div>
                                    )
                                })}
                            </div>
                        )
                    })
                }
            </div>
            <div className="footerHomePage">
                Created By: Jonathan Lin
                <div>
                    <a
                        class='githubIcon'
                        href="https://github.com/jlin231/CookingCompanion"
                        target='_blank'
                        rel="noopener"
                        aria-label='Github'
                    >
                        <i class="fa-brands fa-github gitHubFontAwesome"></i>
                        Github
                    </a>
                </div>
                <div>
                    <a
                        class='linkedInIcon'
                        href="https://www.linkedin.com/in/jonathan-lin-a71088158/"
                        target='_blank'
                        rel="noopener"
                        aria-label='Github'
                    >
                        <i class="fa-brands fa-linkedin gitHubFontAwesome"></i>
                        LinkedIn
                    </a>
                </div>
            </div>
        </>
    )
}

export default SingleCollectionPage
