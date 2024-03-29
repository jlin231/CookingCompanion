import React, { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { thunkEditCommentOfRecipe, thunkDeleteCommentRecipe, thunkGetSingleRecipe } from '../../../store/recipe';

function CommentCard({ comment, recipeId }) {
    const dispatch = useDispatch()
    const [errors, setErrors] = useState([]);
    const [editCommentContent, setEditCommentContent] = useState(comment.comment);
    const [showEditField, setShowEditField] = useState(false);
    const sessionUser = useSelector((state) => state.session.user);

    useEffect(() => {
        setEditCommentContent(comment.comment)
    }, [comment])

    //convert createdAt date from comment
    let commentDate = comment.createdAt
    const month = ["Jan", "Fen", "Mar", "Apr", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"]
    commentDate = new Date(commentDate)
    commentDate = `${month[commentDate.getMonth()]} ${commentDate.getDate()}, ${commentDate.getFullYear()}`

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
            };
        }
    }

    const deleteComment = async (e, commentId) => {
        e.preventDefault();

        try {
            const res = await dispatch(thunkDeleteCommentRecipe(commentId, recipeId))
        } catch (error) {
            let errorObject = JSON.parse(error.message);
        }
    }


    return (
        <>
            <div className="leftCommentContainer">
                <div>
                    {comment.author.username}
                </div>
                <div className="commentDate">
                    {commentDate}
                </div>
            </div>
            {
                !showEditField && <div className="rightCommentContainer">{comment.comment}</div>}
            {showEditField &&
                <div className='editDeleteCommentContainer'>
                    <form onSubmit={(e) => handleEditSubmit(e)} className="handleEditForm">
                        <label className='addCommentLabel'>
                            <textarea
                                type="editCommentContent"
                                value={editCommentContent}
                                onChange={(e) => setEditCommentContent(e.target.value)}
                                className="editCommentContainer"
                                required>
                            </textarea>
                        </label>
                        <ul className='ulEditErrors'>
                            {errors.map((error, idx) => (
                                <li key={idx}>{error}</li>
                            ))}
                        </ul>
                        <button type="submit" className='addCommentButton'>Submit Edit Comment</button>
                    </form>
                </div>
            }
            {
                sessionUser &&
                <>
                    <div onClick={(e) => {
                        setShowEditField(!showEditField)
                        setEditCommentContent(comment.comment)
                        setErrors([])
                    }}><i class="fa-regular fa-pen-to-square"></i></div>
                    <div onClick={(e) => deleteComment(e, comment.id)}><i class="fa-regular fa-trash-can"></i></div>
                </>

            }


        </>
    )
}

export default CommentCard
