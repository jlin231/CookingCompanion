import React, { useState } from "react";
import { login } from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { useHistory } from "react-router-dom";
import './ConfirmDeleteRecipeModal.css'
import { thunkDeleteRecipe, thunkGetAllRecipe } from "../../store/recipe";

function ConfirmDeleteRecipeModal({ recipeId }) {
    const dispatch = useDispatch();
    const { closeModal } = useModal();
    const history = useHistory()

    const deleteRecipe = () => {
        dispatch(thunkDeleteRecipe(recipeId))
            .then(() => {
                closeModal()
            })
            .then(() => {
                dispatch(thunkGetAllRecipe)
            }).then(() => {
                history.push('/recipes')
            })
    };

    return (
        <>
            <h1 className="Global-Modal-Header">Confirm Delete</h1>

            <div className="confirm-Delete-Container">
                <div onClick={deleteRecipe} className="confirmButton">
                    <div>
                        Yes
                    </div>
                </div>
                <div onClick={() => closeModal()} className="confirmButton">
                    <div>
                        No
                    </div>
                </div>
            </div>
        </>
    );
}

export default ConfirmDeleteRecipeModal;
