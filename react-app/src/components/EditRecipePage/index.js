import { useDispatch, useSelector } from "react-redux";
import "./EditRecipePage.css";
import { useEffect, useState } from "react";
import { NavLink, useHistory, useParams } from "react-router-dom";
import { thunkEditRecipe, thunkGetSingleRecipe } from "../../store/recipe";

const EditRecipePage = () => {
    const sessionUser = useSelector((state) => state.session.user);
    const singleRecipe = useSelector((state) => state.recipes.singleRecipe)
    const [loadedPage, setLoadedPage] = useState(false);

    const [title, setTitle] = useState(singleRecipe.title);
    const [description, setDescription] = useState(singleRecipe.description);
    const [timeToComplete, setTimeToComplete] = useState(singleRecipe.timeToComplete);
    const [previewImage, setPreviewImage] = useState(singleRecipe.previewImage);
    const [errors, setErrors] = useState([]);

    const dispatch = useDispatch();
    const history = useHistory();

    const { recipeId } = useParams()

    const [instructionInputArr, setInstructionInputArr] = useState([])

    //load singleRecipe
    useEffect(() => {
        dispatch(thunkGetSingleRecipe(recipeId)).then((res) => {
            setLoadedPage(true)
            let result = []
            console.log(res.instructions)
            const splitInstruc = res.instructions.split(';')
            splitInstruc.pop();
            splitInstruc.forEach((instruction, index) => {
                result.push({
                    "id": index,
                    "value": instruction
                })
            })
            setInstructionInputArr(result)
            setTitle(res.title)
            setDescription(res.description)
            setTimeToComplete(res.timeToComplete)
            setPreviewImage(res.previewImage)
        })
        return () => {
            setLoadedPage(false);
        }
    }, [dispatch])

    if (!loadedPage && !singleRecipe) {
        console.log("loadedPagecomparater hits")
        return null;
    }

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
        e.preventDefault();
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
        const body = {
            title,
            description,
            previewImage,
            timeToComplete,
            author_id: sessionUser.id,
            instructions
        };

        try {
            const res = await dispatch(thunkEditRecipe(body, recipeId))


            history.push(`/recipes/${recipeId}`)

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
            <div className="editRecipeHeader">Edit Recipe</div>
            <form onSubmit={handleSubmit} className="Global-ModalForm-Container2">
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
                        placeholder="Minutes to Complete"
                        className="Global-Modal-input"
                    />
                </label>
                <label for="previewImage" className="Global-Modal-Label">
                    <input
                        type="text"
                        value={previewImage}
                        onChange={(e) => setPreviewImage(e.target.value)}
                        required
                        placeholder="Preview Image URL"
                        className="Global-Modal-input"
                    />
                </label>
                {
                    <div className="instructionFormDiv">
                        <div>
                            Add Instructions Here
                        </div>
                        <div className="instructionButtonContainer">
                            <button onClick={(e) => addInput(e)}>+</button>
                            {
                                (instructionInputArr.length !== 1) ? <button onClick={(e) => removeInput(e)}>-</button>
                                    : null
                            }
                        </div>
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
                <button type="submit" className="SubmitButtonEdit">
                    Submit
                </button>
            </form>

        </div>
    )
}

export default EditRecipePage