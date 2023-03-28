import { useDispatch, useSelector } from "react-redux";
import "./createCollectionPage.css";
import { useState } from "react";
import { useHistory, } from "react-router-dom";
import { thunkCreateCollection } from "../../store/collection";

const CreateCollectionPage = () => {
    const sessionUser = useSelector((state) => state.session.user);
    const dispatch = useDispatch();
    const history = useHistory();

    const initArr = [
        {
            id: 1,
            value: ""
        }
    ];

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");

    const [errors, setErrors] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors([]);

        const body = {
            name,
            description,
        };

        try {
            const res = await dispatch(thunkCreateCollection(body))
            console.log('res=================<', res)

            history.push(`/collections/${res.id}`)

        } catch (error) {
            let errorObject = JSON.parse(error.message);
            const result = errorObject.errors.map((error) => {
                return error.split(": ")[1];
            });
            if (errorObject) setErrors(result);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit} className="Global-Form-Container">
                <div className="Global-Header-Container">
                    <div className="Global-Form-Button-Header">Create Collection</div>
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
                <label for="description" className="Global-Form-Label ">
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

export default CreateCollectionPage
