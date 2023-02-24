import { useDispatch, useSelector } from "react-redux";
import "./AllRecipesPage.css";
import { useEffect, useState } from "react";
import { NavLink, useHistory, useParams } from "react-router-dom";
import { thunkGetAllRecipe } from "../../store/recipe";

const AllRecipePage = () => {
    const sessionUser = useSelector((state) => state.session.user);
    const allRecipes = useSelector((state) => state.recipes.allRecipes)
    const dispatch = useDispatch();
    const history = useHistory();
    const [loadedPage, setLoadedPage] = useState(false);

    useEffect(() => {
        dispatch(thunkGetAllRecipe()).then(() => setLoadedPage(true));
    }, [dispatch]);


    if (!loadedPage) return null

    return (
        <>
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

export default AllRecipePage
