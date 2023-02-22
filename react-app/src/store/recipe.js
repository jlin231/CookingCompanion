const GET_RECIPES = "recipe/GET_RECIPES";
const GET_SINGLE_RECIPE = "recipe/GET_SINGLE_RECIPE";

const actionCreatorgetAllRecipes = (recipes) => ({
    type: GET_RECIPES,
    payload: recipes,
});

const getSingleRecipe = () => ({
    type: GET_SINGLE_RECIPE,
});

const initialState = { user: null };


export const thunkGetAllRecipe = (email, password) => async (dispatch) => {
    const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            email,
            password,
        }),
    });

    if (response.ok) {
        const data = await response.json();
        dispatch(setUser(data));
        return null;
    } else if (response.status < 500) {
        const data = await response.json();
        if (data.errors) {
            return data.errors;
        }
    } else {
        return ["An error occurred. Please try again."];
    }
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case SET_USER:
            return { user: action.payload };
        case REMOVE_USER:
            return { user: null };
        default:
            return state;
    }
}
