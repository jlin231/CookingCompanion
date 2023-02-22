import { useDispatch, useSelector } from "react-redux";
import Navigation from "../Navigation";
import "./SplashPage.css";
import * as sessionActions from "../../store/session";
import { useHistory } from "react-router-dom";


const SplashPage = () => {
    const sessionUser = useSelector((state) => state.session.user);
    const dispatch = useDispatch();
    const history = useHistory();
    // if (sessionUser) return <Redirect to="/photos" />;

    const demoLogin = () => {
        dispatch(sessionActions.login("demo@aa.io", "password"));
        return history.push("/photos");
    };

    return (
        <>
            <div className="SplashPage-Container">
                <img className="splashImage" src="https://static01.nyt.com/images/2022/01/05/dining/04KINGCAKEREX/merlin_199582518_c01765ae-60d5-494c-be98-a64ef03b51fc-threeByTwoMediumAt2X.jpg" alt=""/>
            </div>
        </>
    )
}

export default SplashPage
