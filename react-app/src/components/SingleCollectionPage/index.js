import { useDispatch, useSelector } from "react-redux";
import "./singleCollectionPage.css";
import { useEffect, useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { thunkGetAllRecipe } from "../../store/recipe";

const SingleCollectionPage = () => {
    const allRecipes = useSelector((state) => state.recipes.allRecipes)
    const dispatch = useDispatch();
    const history = useHistory();
    const [loadedPage, setLoadedPage] = useState(false);

    

    useEffect(() => {
        dispatch(thunkGetAllRecipe()).then(() => setLoadedPage(true));
    }, [dispatch]);

    if (!loadedPage || !allRecipes) {
        return null
    }

    //make a new set of arrays, with arrays with 2 recipes in them
    const recipeValues = Object.values(allRecipes)

    let recipeArray = []
    for (let i = 0; i < recipeValues.length; i = i + 2) {
        recipeArray.push(recipeValues.slice(i, i + 2))
    }

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
                </div>
                {
                    recipeArray.map((array) => {
                        return (<div className="splashRecipeContainer">
                            {array.map((recipe) => {
                                return (
                                    <NavLink exact to={`/recipes/${recipe.id}`} key={recipe.id} className="splashNavLink">

                                    </NavLink>
                                )
                            })}
                        </div>)
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
