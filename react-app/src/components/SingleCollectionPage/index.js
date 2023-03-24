import { useDispatch, useSelector } from "react-redux";
import "./singleCollectionPage.css";
import { useEffect, useState } from "react";
import { NavLink, useHistory, useParams } from "react-router-dom";
import { thunkGetSingleCollection } from "../../store/collection";
import AllRecipeCard from "../AllRecipesPage/AllRecipeCard";

const SingleCollectionPage = () => {
    const singleCollection = useSelector((state) => state.collections.singleCollection)
    const dispatch = useDispatch();
    const [loadedPage, setLoadedPage] = useState(false);
    const history = useHistory()
    const { collectionId } = useParams();

    useEffect(() => {
        dispatch(thunkGetSingleCollection(collectionId)).then(() => setLoadedPage(true));
        return () => {
            setLoadedPage(false);
        }
    }, [dispatch]);

    if (!loadedPage || !singleCollection) {
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

    const recipeValues = singleCollection.recipes
    let recipeArray = []
    for (let i = 0; i < recipeValues.length; i = i + 4) {
        recipeArray.push(recipeValues.slice(i, i + 4))
    }

    console.log(recipeArray, 'recipeArray')

    return (
        <>
            <div className="SplashPage-Container">
                <img className="splashImage" src="https://burst.shopifycdn.com/photos/flatlay-iron-skillet-with-meat-and-other-food.jpg?width=1200&format=pjpg&exif=1&iptc=1" alt=""
                    onError={({ currentTarget }) => {
                        currentTarget.onerror = null; // prevents looping
                        currentTarget.src = "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Image_not_available.png/640px-Image_not_available.png";
                    }} />
            </div>
            <div className="lowerDiv">
                <div className="navLinkContainer">
                    <NavLink exact to='/recipes/explore' className="whatToCookDiv">
                        <div className="whatToCookText">What to Cook This Week</div>
                    </NavLink>
                    {singleCollection.name}
                    {singleCollection.description}
                </div>
            </div>
            <div onClick={addRecipesToCollection} className="addIngredientsButton">
                Add Recipes to Collection
            </div>
            <div onClick={editCollection} className="addIngredientsButton">
                Edit Collection
            </div>
            <div className="outerMostDiv">
                {
                    recipeArray.map((recipes, index) => {
                        console.log(recipes)
                        return (
                            <div className="rowCardDiv" key={index}>
                                {recipes.map((recipe) => {
                                    console.log('recipe', recipe)
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
