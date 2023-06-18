import { useDispatch, useSelector } from "react-redux";
import "./CreateRecipePage.css";
import { useState } from "react";
import { useHistory, } from "react-router-dom";
import { thunkCreateRecipe } from "../../store/recipe";

const CreateRecipePage = () => {
    const sessionUser = useSelector((state) => state.session.user);
    const dispatch = useDispatch();
    const history = useHistory();

    const initArr = [
        {
            id: 1,
            value: ""
        }
    ];

    const [instructionInputArr, setInstructionInputArr] = useState(initArr)
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [timeToComplete, setTimeToComplete] = useState("");
    const [previewImage, setPreviewImage] = useState("");
    const [errors, setErrors] = useState([]);

    const handleInstructionChange = e => {
        e.preventDefault()

        const index = e.target.id;
        setInstructionInputArr(s => {
            const newArr = s.slice();
            newArr[index].value = e.target.value;
            return newArr;
        })
    }

    const addInput = (e) => {
        e.preventDefault();
        setInstructionInputArr(s => {
            const lastId = s[s.length - 1].id;
            return [
                ...s,
                {
                    value: "",
                    id: lastId
                }
            ]
        })
    }

    const removeInput = (e) => {
        e.preventDefault()
        setInstructionInputArr(s => {
            let newS = [...s];
            newS.pop()
            return newS;
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors([]);

        let instructions = ""
        instructionInputArr.forEach((instruction) => {
            instructions = instructions.concat(instruction.value, ";")
        })
        const body = {
            title,
            description,
            previewImage,
            timeToComplete,
            author_id: sessionUser.id,
            instructions
        };

        try {
            const res = await dispatch(thunkCreateRecipe(body))

            history.push(`/recipes/${res.id}`)

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
        <div>
            <form onSubmit={handleSubmit} className="Global-Form-Container">
                <div className="Global-Header-Container">
                    <div className="Global-Form-Button-Header">Create Recipe</div>
                </div>
                <ul className="Global-Errors-UL">
                    {errors.map((error, idx) => (
                        <li key={idx} className="Global-Errors-LI">
                            {error}
                        </li>
                    ))}
                </ul>
                <label for="title" className="Global-Form-Label">
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                        placeholder="Title"
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
                <label for="timeToComplete" className="Global-Form-Label">
                    <input
                        type="number"
                        value={timeToComplete}
                        onChange={(e) => setTimeToComplete(e.target.value)}
                        required
                        placeholder="Minutes to Complete"
                        className="Global-Form-input"
                        min={1}
                    />
                </label>
                <label for="previewImage" className="Global-Form-Label">
                    <input
                        type="url"
                        value={previewImage}
                        onChange={(e) => setPreviewImage(e.target.value)}
                        required
                        placeholder="Preview Image URL"
                        className="Global-Form-input"
                    />
                </label>
                {
                    <div className="instructionFormDiv">
                        <div className="Global-Form-Button-Holder">
                            <div className="Global-Form-Button-Header">Add Instructions</div>
                            {
                                (instructionInputArr.length < 20) ? <button onClick={(e) => addInput(e)} className="Global-Ingredient-Add-Button"><i class="fa-solid fa-plus add-and-subtract-Icon"></i></button>
                                    : <div className="subHeading">Max Number of Instructions Reached</div>
                            }

                            {
                                (instructionInputArr.length !== 1) ? <button onClick={(e) => removeInput(e)} className="Global-Ingredient-Add-Button"><i class="fa-solid fa-minus add-and-subtract-Icon"></i></button>
                                    : null
                            }
                        </div>
                        {instructionInputArr.map((item, i) => {
                            return (
                                <div key={i} className="Global-Input-Container">
                                    <div className="index"> {i + 1}.</div>
                                    <textarea onChange={handleInstructionChange}
                                        value={item.value}
                                        id={i}
                                        required
                                        type="text"
                                        placeholder="Instruction"
                                        className="Global-Form-Text-Area-Instruction">
                                    </textarea>
                                </div>

                            );
                        })}
                    </div>
                }
                <button type="submit" className="Global-SubmitButton">
                    Submit
                </button>
            </form>

        </div>
    )
}

export default CreateRecipePage
