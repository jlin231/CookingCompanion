import { useDispatch, useSelector } from "react-redux";
import "./FirstSplashPage.css";
import { useEffect, useState } from "react";
import * as sessionActions from "../../store/session";
import { NavLink, useHistory, useLocation } from "react-router-dom";
import { thunkGetAllRecipe } from "../../store/recipe";
import { login } from "../../store/session";
import { useModal } from "../../context/Modal";

const FirstSplashPage = () => {
    const dispatch = useDispatch()
    const [loadedPage, setLoadedPage] = useState(false);
    const { closeModal } = useModal();
    const history = useHistory()
    const location = useLocation()
    const sessionUser = useSelector((state) => state.session.user)

    useEffect(() => {
        dispatch(thunkGetAllRecipe()).then(() => setLoadedPage(true));
    }, [dispatch]);

    const demoLogin = () => {
        dispatch(login("demo@aa.io", "password"));
        closeModal();
        return history.push("/recipes");
    };

    if (!loadedPage) {
        return null
    }

    if (sessionUser) {
        history.push('/recipes')
    }

    return (
        <>
            <div className="SplashPage-Container">
                <div className="flex-Container">
                    <div className="leftSplashDiv">
                        <div className="left-flex-text">
                            <div className="splashHeader">
                                Discover new recipes with help from a companion.
                            </div>
                            <div className="splashSubHeading">
                                Join the Cooking Companion community today!
                            </div>
                            <div onClick={() => {
                                history.push('/recipes')
                            }} className="Explore-Splash-Button" >
                                Explore Recipes Now
                            </div>
                            <div onClick={demoLogin} className="Demo-Button">
                                <div>Try Demo</div>
                            </div>
                        </div>
                    </div>
                    <div className="rightSplashDiv" id="pic7">
                        <img className="rightSplashImage" src="https://www.lapband.com/wp-content/themes/yootheme/cache/High-Quality-Foods-to-Eat-After-Bariatric-Surgery-89be1d3d.webp"></img>
                    </div>

                </div>
            </div>
        </>
    )
}

export default FirstSplashPage
