import { useDispatch, useSelector } from "react-redux";
import "./SplashPage.css";
import { useEffect, useState } from "react";
import * as sessionActions from "../../store/session";
import { NavLink, useHistory } from "react-router-dom";
import { thunkGetAllRecipe } from "../../store/recipe";

const SplashPage = () => {
    const sessionUser = useSelector((state) => state.session.user);
    const allRecipes = useSelector((state) => state.recipes.allRecipes)
    const dispatch = useDispatch();
    const history = useHistory();
    const [loadedPage, setLoadedPage] = useState(false);
    // if (sessionUser) return <Redirect to="/photos" />;

    useEffect(() => {
        dispatch(thunkGetAllRecipe()).then(() => setLoadedPage(true));
    }, [dispatch]);

    if (!loadedPage) {
        return null
    }

    return (
        <>
            <div className="SplashPage-Container">
                <img className="splashImage" src="https://static01.nyt.com/images/2022/01/05/dining/04KINGCAKEREX/merlin_199582518_c01765ae-60d5-494c-be98-a64ef03b51fc-threeByTwoMediumAt2X.jpg" alt="" />
            </div>
            {
                Object.values(allRecipes).map((recipe) => {
                    return (
                        <NavLink exact to={`/recipes/${recipe.id}`} key={recipe.id}>
                            <div>
                                <div>{recipe.id}</div>
                                <div>{recipe.title}</div>
                                <div>{recipe.description}</div>
                                <div>{recipe.timeToComplete}</div>
                                <div>{recipe.previewImage}</div>
                            </div>
                        </NavLink>
                    )
                })
            }
        </>
    )
}

export default SplashPage
