import { useDispatch, useSelector } from "react-redux";
import "./editCollectionPage.css";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { thunkEditRecipe } from "../../store/recipe";
import { thunkGetSingleCollection, thunkEditCollection } from "../../store/collection";

const EditCollectionPage = () => {
    const sessionUser = useSelector((state) => state.session.user);
    const singleCollection = useSelector((state) => state.recipes.singleCollection)
    const [loadedPage, setLoadedPage] = useState(false);

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [errors, setErrors] = useState([]);

    const dispatch = useDispatch();
    const history = useHistory();

    const { collectionId } = useParams()

    //load singleCollection
    useEffect(() => {
        dispatch(thunkGetSingleCollection(collectionId)).then((res) => {
            setLoadedPage(true)
            setName(res.name)
            setDescription(res.description)
        })
        return () => {
            setLoadedPage(false);
        }
    }, [dispatch])

    if (!loadedPage && !singleCollection) {
        return null;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors([]);

        const body = {
            name,
            description
        };

        try {
            const res = await dispatch(thunkEditCollection(collectionId, body))
            history.push(`/collections/${collectionId}`)

            // const data = await res.json();
        } catch (error) {
            let errorObject = JSON.parse(error.message);
            const result = errorObject.errors.map((error) => {
                return error.split(": ")[1];
            });
            if (errorObject) setErrors(result);
        }
    };

    return (
        <div className="outerMostDivEdit">
            <form onSubmit={handleSubmit} className="Global-Form-Container">
                <div className="Global-Header-Container">
                    <div className="Global-Form-Button-Header">Edit Collection</div>
                </div>
                <ul className="Global-Errors-UL">
                    {errors.map((error, idx) => (
                        <li key={idx} className="Global-Errors-LI">
                            {error}
                        </li>
                    ))}
                </ul>
                <label for="name" className="Global-Form-Label">
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        placeholder="Name"
                        className="Global-Form-input"
                    />
                </label>
                <label for="description" className="Global-Form-Label">
                    <textarea
                        type="text"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                        placeholder="Description"
                        className="Global-Form-input Global-Form-Text-Area-Description"
                    ></textarea>
                </label>
                <button type="submit" className="Global-SubmitButton">
                    Submit
                </button>
            </form>

        </div>
    )
}

export default EditCollectionPage
