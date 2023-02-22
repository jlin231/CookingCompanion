import { useDispatch, useSelector } from "react-redux";
import "./SingleRecipePage.css";
import { useEffect, useState } from "react";
import { NavLink, useHistory, useParams } from "react-router-dom";
import { thunkGetSingleRecipe } from "../../store/recipe";

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

    return (
        <div>
            <div className="Top-Info-Container">
                <img className="splashImage" src={`${singleRecipe.previewImage}`} alt="" />
            </div>
        </div>
    )
}

export default SingleRecipePage
