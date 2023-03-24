import { useDispatch, useSelector } from "react-redux";
import "./addRecipesToCollection.css";
import { useEffect, useState } from "react";
import { NavLink, useHistory, useParams } from "react-router-dom";
import { thunkGetSingleCollection } from "../../store/collection";
import AllRecipeCard from "../AllRecipesPage/AllRecipeCard";

const AddRecipeToCollection = () => {
    const singleCollection = useSelector((state) => state.collections.singleCollection)
    const dispatch = useDispatch();
    const [loadedPage, setLoadedPage] = useState(false);
    const history = useHistory()
    const { collectionId } = useParams();

    useEffect(() => {
        dispatch(thunkGetSingleCollection(collectionId)).then(() => setLoadedPage(true));
    }, [dispatch]);

    if (!loadedPage || !singleCollection) {
        return null
    }

    let recipeArray = singleCollection.recipes

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
                        <div className="whatToCookText">ADD RECIPES TO COLLECTION PAGE</div>
                    </NavLink>
                    {singleCollection.name}
                    {singleCollection.description}
                </div>
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

export default AddRecipeToCollection
