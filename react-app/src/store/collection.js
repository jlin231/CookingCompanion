const GET_ALL_COLLECTION = "recipe/GET_ALL_COLLECTIONS";
const GET_SINGLE_COLLECTION = "recipe/GET_SINGLE_COLLECTION";


const getAllCollections = (data) => ({
    type: GET_ALL_COLLECTION,
    payload: data,
});

const getSingleCollections = (data) => ({
    type: GET_SINGLE_COLLECTION,
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
        default:
            return state;
    }
}
