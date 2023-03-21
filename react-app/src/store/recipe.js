const GET_ALL_RECIPES = "recipe/GET_ALL_RECIPES";
const GET_SINGLE_RECIPE = "recipe/GET_SINGLE_RECIPE";
const CREATE_SINGLE_RECIPE = "recipe/CREATE_SINGLE_RECIPE";
const EDIT_SINGLE_RECIPE = "recipe/EDIT_SINGLE_RECIPE";
const DELETE_SINGLE_RECIPE = "recipe/DELETE_SINGLE_RECIPE";
const ADD_INGREDIENTS = "ingredient/ADD_INGREDIENTS";
const EDIT_DELETE_INGREDIENTS = "ingredient/EDIT_DELETE_INGREDIENTS"
const ADD_COMMENT_TO_RECIPE = "recipe/ADD_COMMENT_TO_RECIPE"
const EDIT_COMMENT_TO_RECIPE = "recipe/EDIT_COMMENT_TO_RECIPE"
const DELETE_COMMENT_TO_RECIPE = "recipe/DELETE_COMMENT_TO_RECIPE"

const getAllRecipes = (data) => ({
    type: GET_ALL_RECIPES,
    payload: data,
});

const getSingleRecipe = (data) => ({
    type: GET_SINGLE_RECIPE,
    payload: data
});

const createSingleRecipe = (data) => ({
    type: CREATE_SINGLE_RECIPE,
    payload: data
});

const editSingleRecipe = (data) => ({
    type: EDIT_SINGLE_RECIPE,
    payload: data
});

const deleteSingleRecipe = (recipeId) => ({
    type: DELETE_SINGLE_RECIPE,
    payload: recipeId
});

const addIngredientToRecipe = (data) => ({
    type: ADD_INGREDIENTS,
    payload: data
})

const editDeleteIngredientsToRecipe = (data) => ({
    type: EDIT_DELETE_INGREDIENTS,
    payload: data
})

const addCommentToRecipe = (data) => ({
    type: ADD_COMMENT_TO_RECIPE,
    payload: data
})

const editCommentOfRecipe = (data) => ({
    type: EDIT_COMMENT_TO_RECIPE,
    payload: data
})

const deleteCommentOfRecipe = (commentId) => ({
    type: DELETE_COMMENT_TO_RECIPE,
    payload: commentId
})

const initialState = { singleRecipe: {}, allRecipes: {} };


export const thunkGetAllRecipe = () => async (dispatch) => {
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

export const thunkGetSingleRecipe = (recipeId) => async (dispatch) => {
    const response = await fetch(`/api/recipes/${recipeId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        }
    });
    if (response.ok) {
        const data = await response.json();
        dispatch(getSingleRecipe(data));
        return data;
    } else if (response.status < 500) {
        const data = await response.json();
        if (data.errors) {
            return data.errors;
        }
    }
};

export const thunkCreateRecipe = (body) => async (dispatch) => {
    const response = await fetch(`/api/recipes/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            ...body
        }),
    });
    if (response.ok) {
        const data = await response.json();
        dispatch(createSingleRecipe(data));
        return data;
    } else if (response.status < 500) {
        const data = await response.json();
        throw new Error(JSON.stringify(data));
    }
};

export const thunkEditRecipe = (body, recipeId) => async (dispatch) => {
    const response = await fetch(`/api/recipes/${recipeId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            ...body
        }),
    });
    if (response.ok) {
        const data = await response.json();
        dispatch(editSingleRecipe(data));
        return data;
    } else if (response.status < 500) {
        const data = await response.json();
        throw new Error(JSON.stringify(data));
    }
};

export const thunkDeleteRecipe = (recipeId) => async (dispatch) => {
    const response = await fetch(`/api/recipes/${recipeId}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        }
    });
    if (response.ok) {
        const data = await response.json();
        dispatch(deleteSingleRecipe(recipeId));
        return data;
    } else if (response.status < 500) {
        const data = await response.json();
        throw new Error(JSON.stringify(data));
    }
};


export const thunkAddIngredients = (body, recipeId) => async (dispatch) => {
    console.log(body, "body")

    const response = await fetch(`/api/recipes/${recipeId}/ingredients`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            "Ingredients": body
        })
    });
    if (response.ok) {
        const data = await response.json();
        dispatch(addIngredientToRecipe(recipeId));
        return data;
    } else if (response.status < 500) {
        const data = await response.json();
        throw new Error(JSON.stringify(data));
    }
}

export const thunkEditDeleteIngredients = (body, recipeId) => async (dispatch) => {
    console.log(body, "body")

    const response = await fetch(`/api/recipes/${recipeId}/ingredients`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            "Ingredients": body
        })
    });
    if (response.ok) {
        const data = await response.json();
        dispatch(editDeleteIngredientsToRecipe(recipeId));
        return data;
    } else if (response.status < 500) {
        const data = await response.json();
        throw new Error(JSON.stringify(data));
    }
}

export const thunkAddCommentToRecipe = (body, recipeId) => async (dispatch) => {
    const response = await fetch(`/api/recipes/${recipeId}/comments`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body)
    });
    if (response.ok) {
        const data = await response.json();
        dispatch(addCommentToRecipe(data));
        return data;
    } else if (response.status < 500) {
        const data = await response.json();
        throw new Error(JSON.stringify(data));
    }
};

export const thunkEditCommentOfRecipe = (body, commentId, recipeId) => async (dispatch) => {

    const response = await fetch(`/api/recipes/${recipeId}/comments/${commentId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body)
    });

    if (response.ok) {
        const data = await response.json();
        dispatch(editCommentOfRecipe(data));
        return data;
    } else if (response.status < 500) {
        const data = await response.json();
        throw new Error(JSON.stringify(data));
    }
};

export const thunkDeleteCommentRecipe = (commentId, recipeId) => async (dispatch) => {
    const response = await fetch(`/api/recipes/${recipeId}/comments/${commentId}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        }
    });
    if (response.ok) {
        const data = await response.json();
        dispatch(deleteCommentOfRecipe(commentId));
        return data;
    } else if (response.status < 500) {
        const data = await response.json();
        throw new Error(JSON.stringify(data));
    }
};

export default function recipeReducer(state = initialState, action) {
    let newState;
    switch (action.type) {
        case GET_ALL_RECIPES:
            let result = {}
            action.payload.Recipes.forEach((recipe) => {
                result[recipe.id] = recipe;
            });
            return { allRecipes: result };
        case GET_SINGLE_RECIPE:
            newState = Object.assign({}, state);
            newState.singleRecipe = {...action.payload}
            return newState;
        case CREATE_SINGLE_RECIPE:
            newState = Object.assign({}, state);
            console.log(newState)
            newState.allRecipes[action.payload.id] = action.payload;
            console.log(newState)
            return newState;
        case EDIT_SINGLE_RECIPE:
            newState = Object.assign({}, state);
            newState.allRecipes[action.payload.id] = action.payload;
            return newState;
        case DELETE_SINGLE_RECIPE:
            newState = Object.assign({}, state);
            delete newState.allRecipes[action.payload]
            return newState;
        case ADD_INGREDIENTS:
            newState = Object.assign({}, state);
            return newState;
        case EDIT_DELETE_INGREDIENTS:
            newState = Object.assign({}, state);
            return newState;
        case ADD_COMMENT_TO_RECIPE:
            newState = Object.assign({}, state);
            newState = { allRecipes: { ...newState.allRecipes }, singleRecipe: { ...newState.singleRecipe, comments: [...newState.singleRecipe.comments, action.payload] } };
            return newState;
        case EDIT_COMMENT_TO_RECIPE:
            newState = Object.assign({}, state);
            //search through comments array, find comment by id, and replace comment
            for (let i = 0; i < newState.singleRecipe.comments.length; i++) {
                const comment = newState.singleRecipe.comments[i]
                if (comment.id === action.payload.id) {
                    newState.singleRecipe.comments[i] = action.payload
                }
            }
            newState = { allRecipes: { ...newState.allRecipes }, singleRecipe: { ...newState.singleRecipe, comments: [...newState.singleRecipe.comments] } };
            return newState;
        case DELETE_COMMENT_TO_RECIPE:
            console.log('reducer hit')
            newState = Object.assign({}, state);
            for (let i = 0; i < newState.singleRecipe.comments.length; i++) {
                const comment = newState.singleRecipe.comments[i]
                if (comment.id === action.payload) {
                    newState.singleRecipe.comments.splice(i, 1);
                }
            }
            newState = { allRecipes: { ...newState.allRecipes }, singleRecipe: { ...newState.singleRecipe, comments: [...newState.singleRecipe.comments] } };
            return newState;
        default:
            return state;
    }
}
