import { useDispatch, useSelector } from "react-redux";
import "./CreateRecipePage.css";
import { useEffect, useState } from "react";
import { NavLink, useHistory, useParams } from "react-router-dom";
import { thunkCreateRecipe, thunkGetSingleRecipe } from "../../store/recipe";

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
        console.log(instructionInputArr)
    }

    const addInput = () => {
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

    const removeInput = () => {
        setInstructionInputArr(s => {
            let newS = [...s];
            newS.pop()
            console.log(newS)
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
        console.log(instructions)
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
            console.log('res=================<', res)

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
            <form onSubmit={handleSubmit} className="Global-ModalForm-Container">
                <ul className="Global-Errors-UL">
                    {errors.map((error, idx) => (
                        <li key={idx} className="Global-Errors-LI">
                            {error}
                        </li>
                    ))}
                </ul>
                <label for="title" className="Global-Modal-Label">
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                        placeholder="Title"
                        className="Global-Modal-input"
                    />
                </label>
                <label for="description" className="Global-Modal-Label">
                    <textarea
                        type="text"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                        placeholder="Description"
                        className="Global-Modal-input"
                    ></textarea>
                </label>
                <label for="timeToComplete" className="Global-Modal-Label">
                    <input
                        type="number"
                        value={timeToComplete}
                        onChange={(e) => setTimeToComplete(e.target.value)}
                        required
                        placeholder="timeToComplete"
                        className="Global-Modal-input"
                    />
                </label>
                <label for="previewImage" className="Global-Modal-Label">
                    <input
                        type="text"
                        value={previewImage}
                        onChange={(e) => setPreviewImage(e.target.value)}
                        required
                        placeholder="previewImage"
                        className="Global-Modal-input"
                    />
                </label>
                {
                    <div className="instructionFormDiv">
                        Add Instructions Here
                        <button onClick={addInput}>+</button>
                        {
                            (instructionInputArr.length !== 1) ? <button onClick={removeInput}>-</button>
                                : null
                        }
                        {instructionInputArr.map((item, i) => {
                            return (
                                <div key={i}>
                                    {i + 1}.
                                    <input
                                        onChange={handleInstructionChange}
                                        value={item.value}
                                        id={i}
                                        required
                                        type="text"
                                    />
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
