import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { thunkEditCommentOfRecipe } from '../../../store/recipe';

function CommentCard({ comment, recipeId }) {
    const dispatch = useDispatch()
    const [errors, setErrors] = useState([]);
    const [editCommentContent, setEditCommentContent] = useState(comment.comment);
    const [showEditField, setShowEditField] = useState(false);

    const handleEditSubmit = async (e) => {
        e.preventDefault()
        setErrors([])
        try {
            const res = await dispatch(thunkEditCommentOfRecipe(
                {
                    comment: editCommentContent
                },
                comment.id,
                recipeId)).then(() => {
                    setShowEditField(false)
                })

        } catch (error) {
            let errorObject = JSON.parse(error.message);
            const result = errorObject.errors.map((error) => {
                return error.split(": ")[1];
            });
            if (errorObject) {

                setErrors(result)
                console.log(errors, 'errors')
            };
        }
    }

    return (
        <>
            <div onClick={(e) => setShowEditField(!showEditField)}><i class="fa-regular fa-pen-to-square"></i></div>
            {showEditField &&
                <>
                    <ul>
                        {errors.map((error, idx) => (
                            <li key={idx}>{error}</li>
                        ))}
                    </ul>
                    <form onSubmit={(e) => handleEditSubmit(e)}>
                        <label>
                            <textarea
                                type="editCommentContent"
                                value={editCommentContent}
                                onChange={(e) => setEditCommentContent(e.target.value)}
                                required>
                            </textarea>
                        </label>
                        <button type="submit">Submit Edit Comment</button>
                    </form>
                </>}
        </>
    )
}

export default CommentCard
