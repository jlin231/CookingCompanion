const GET_ALL_COLLECTIONS = "recipe/GET_ALL_RECIPES";

const getAllRecipes = (data) => ({
    type: GET_ALL_COLLECTIONS,
    payload: data,
});

const initialState = { singleCollection: {}, allCollections: {} };

export const thunkGetAllCollections = () => async (dispatch) => {
    const response = await fetch("/api/recipes/", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        }
    });
    if (response.ok) {
        const data = await response.json();
        dispatch(getAllRecipes(data));
        return null;
    } else if (response.status < 500) {
        const data = await response.json();
        if (data.errors) {
            return data.errors;
        }
    }
};

export default function collectionReducer(state = initialState, action) {
    let newState;
    switch (action.type) {
        case GET_ALL_COLLECTIONS:
            let result = {}
            action.payload.Recipes.forEach((recipe) => {
                result[recipe.id] = recipe;
            });
            return { allRecipes: result };
        default:
            return state;
    }
}
