import { useDispatch, useSelector } from "react-redux";
import "./AddIngredientsPage.css";
import { useEffect, useState } from "react";
import { NavLink, useHistory, useParams } from "react-router-dom";
import { thunkAddIngredients, thunkGetAllRecipe, thunkGetSingleRecipe } from "../../store/recipe";

const AddIngredientsPage = () => {
    const sessionUser = useSelector((state) => state.session.user);
    const dispatch = useDispatch();
    const history = useHistory();
    const { recipeId } = useParams()

    const initArr = [
        {
            name: "",
            quantity: "",
            unit: ""
        }
    ];
    const [ingredientInputArr, setIngredientInputArr] = useState(initArr)

    const [errors, setErrors] = useState([]);

    const handleIngredientChange = (index, e) => {
        e.preventDefault()

        console.log('ingredientARray', ingredientInputArr)
        let newFormValues = [...ingredientInputArr];
        console.log(e, "raw string value")
        console.log(Number(e.target.value), "int value")

        newFormValues[index][e.target["name"]] = e.target.value;

        setIngredientInputArr(newFormValues);
    }

    const addInput = (e) => {
        e.preventDefault()
        setIngredientInputArr(s => {
            const lastId = s[s.length - 1].id;
            return [
                ...s,
                {
                    name: "",
                    quantity: "",
                    unit: ""
                }
            ]
        })
    }

    const removeInput = (e) => {
        e.preventDefault()
        setIngredientInputArr(s => {
            let newS = [...s];
            newS.pop()
            return newS;
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors([]);

        let body = [];

        ingredientInputArr.forEach((ingredient) => {
            body.push({
                "name": ingredient.name,
                "quantity": Number(ingredient.quantity),
                "unit": ingredient.unit
            })
        });

        try {
            const res = await dispatch(thunkAddIngredients(body, recipeId))
            console.log('res=================<', res)

            history.push(`/recipes/${recipeId}`)

        } catch (error) {
            let errorObject = JSON.parse(error.message);

            if (errorObject) setErrors(errorObject.errors);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit} className="Global-Form-Container">
                <ul className="Global-Errors-UL">
                    {errors.map((error, idx) => (
                        <li key={idx} className="Global-Errors-LI">
                            {error}
                        </li>
                    ))}
                </ul>
                <div className="instructionFormDiv">
                    <div className="Global-Form-Button-Holder">
                        <div className="Global-Form-Button-Header">Add Ingredients</div>
                        <button onClick={(e) => addInput(e)} className="Global-Ingredient-Add-Button"><i class="fa-solid fa-plus add-and-subtract-Icon"></i></button>
                        {
                            (ingredientInputArr.length !== 1) ? <button onClick={(e) => removeInput(e)}className="Global-Ingredient-Add-Button"><i class="fa-solid fa-minus add-and-subtract-Icon"></i></button>
                                : null
                        }
                    </div>
                    {ingredientInputArr.map((item, index) => {
                        return (
                            <div key={index} className="Global-Input-Container">
                                <input
                                    onChange={(e) => handleIngredientChange(index, e)}
                                    value={item.name}
                                    id={index}
                                    placeholder="Name"
                                    required
                                    name="name"
                                    type="text"
                                    className="Global-Input-Text"
                                />
                                <input
                                    onChange={(e) => handleIngredientChange(index, e)}
                                    value={item.unit}
                                    id={index}
                                    placeholder="Unit"
                                    required
                                    name="unit"
                                    type="text"
                                    className="Global-Input-Text unit"
                                />
                                <input
                                    onChange={(e) => handleIngredientChange(index, e)}
                                    value={item.quantity}
                                    placeholder="Quantity"
                                    id={index}
                                    required
                                    name="quantity"
                                    type="number"
                                    className="Global-Input-Text"
                                />
                            </div>

                        );
                    })}
                </div>
                <button type="submit" className="Global-SubmitButton">
                    Submit

                </button>
            </form>

        </div>
    )
}

export default AddIngredientsPage
