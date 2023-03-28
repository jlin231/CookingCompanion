const GET_ALL_COLLECTION = "recipe/GET_ALL_COLLECTIONS";
const GET_SINGLE_COLLECTION = "recipe/GET_SINGLE_COLLECTION";
const DELETE_SINGLE_COLLECTION = "recipe/DELETE_SINGLE_COLLECTION";
const EDIT_SINGLE_COLLECTION = "recipe/EDIT_SINGLE_COLLECTION";
const DELETE_RECIPE_FROM_COLLECTION = "recipe/DELETE_RECIPE_FROM_COLLECTION";

const getAllCollections = (data) => ({
    type: GET_ALL_COLLECTION,
    payload: data,
});

const getSingleCollections = (data) => ({
    type: GET_SINGLE_COLLECTION,
    payload: data,
});

const deleteSingleCollection = (collectionId) => ({
    type: DELETE_SINGLE_COLLECTION,
    payload: collectionId,
});

const editSingleCollection = (data) => ({
    type: EDIT_SINGLE_COLLECTION,
    payload: data,
})

const deleteRecipeFromCollections = (data) => ({
    type: DELETE_RECIPE_FROM_COLLECTION,
    payload: data,
});

const initialState = { singleCollection: {}, allCollections: {} };

export const thunkGetAllCollections = () => async (dispatch) => {
    console.log("thunk is hit")
    const response = await fetch("/api/collections/", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        }
    });
    console.log("fetch is finished")
    if (response.ok) {
        const data = await response.json();
        console.log('collection action is dispatched')
        dispatch(getAllCollections(data));
        return null;
    } else if (response.status < 500) {
        const data = await response.json();
        if (data.errors) {
            return data.errors;
        }
    }
};

export const thunkGetSingleCollection = (collectionId) => async (dispatch) => {
    const response = await fetch(`/api/collections/${collectionId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        }
    });
    if (response.ok) {
        const data = await response.json();
        dispatch(getSingleCollections(data));
        return data;
    } else if (response.status < 500) {
        const data = await response.json();
        if (data.errors) {
            return data.errors;
        }
    }
};

export const thunkEditCollection = (collectionId, body) => async (dispatch) => {
    console.log('thunk is reached')
    const response = await fetch(`/api/collections/${collectionId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            ...body
        })
    });
    if (response.ok) {
        const data = await response.json();
        dispatch(editSingleCollection(collectionId));
        return data;
    } else if (response.status < 500) {
        const data = await response.json();
        throw new Error(JSON.stringify(data));
    }
};

export const thunkDeleteRecipeFromCollection = (recipeId, collectionId) => async (dispatch) => {
    console.log('delete thunk is reached')
    const response = await fetch(`/api/collections/${collectionId}/recipe/${recipeId}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    });
    if (response.ok) {
        const data = await response.json();
        dispatch(deleteRecipeFromCollections({
            collectionId,
            recipeId
        }));
        return
    } else if (response.status < 500) {
        const data = await response.json();
        throw new Error(JSON.stringify(data));
    }
};

export const thunkDeleteCollection = (collectionId) => async (dispatch) => {
    const response = await fetch(`/api/collections/${collectionId}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    });
    if (response.ok) {
        const data = await response.json();
        dispatch(deleteSingleCollection(collectionId));
        return data;
    } else if (response.status < 500) {
        const data = await response.json();
        throw new Error(JSON.stringify(data));
    }
};

export default function collectionReducer(state = initialState, action) {
    let newState;
    switch (action.type) {
        case GET_ALL_COLLECTION:
            let result = {}
            console.log(action.payload)
            action.payload.Collection.forEach((collection) => {
                result[collection.id] = collection;
            });
            return { allCollections: result };
        case GET_SINGLE_COLLECTION:
            newState = Object.assign({}, state);
            newState.singleCollection = { ...action.payload }
            return newState;
        case EDIT_SINGLE_COLLECTION:
            newState = Object.assign({}, state);
            newState.singleCollection = { ...newState.singleCollection, ...action.payload }
            return newState;
        case DELETE_SINGLE_COLLECTION:
            newState = Object.assign({}, state);
            return newState;
        case DELETE_RECIPE_FROM_COLLECTION:
            console.log(action.payload, 'payload')
            newState = Object.assign({}, state);
            console.log(newState.singleCollection.recipes.length, 'length')
            for (let i = 0; i < newState.singleCollection.recipes.length; i++) {
                if (newState.singleCollection.recipes[i].id == action.payload.recipeId) {
                    newState.singleCollection.recipes.splice(i, 1);
                    console.log(newState.singleCollection.recipes, 'splice result')
                    return { ...newState };
                }
            }
            return newState
        default:
            return state;
    }
}
