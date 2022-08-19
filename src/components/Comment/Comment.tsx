import React from 'react';
import { useState } from 'react';
import { FaEdit, FaSave, FaTrash } from 'react-icons/fa';
import { useAppDispatch } from '../../app/hooks';
import { deleteComment, editComment } from '../../slices/CommentSlice';
import { CommnetProp } from '../../types/CommentType';
import StyledBtn from '../../UI/StyledBtn';

export const Comment = (props: CommnetProp) => {
    const [edit, setEdit] = useState(false);
    const [comState, setComState] = useState(props.comment);
    const dispatch = useAppDispatch();

    const editCom = () => {
        dispatch(editComment({ ...props, comment: comState }));
        setEdit(false);
    }

    return (
        <div className='card p-3 mb-3'>
            <div className='d-flex justify-content-between mb-3'>
                <div>
                    <strong className='fs-5'>
                        {props.author}
                    </strong>
                </div>
            </div>
            <div>
                {edit ?
                    <div className='d-flex align-items-center'>
                        <textarea
                            className='form-control rounded-3 mb-3'
                            value={comState}
                            onChange={e => setComState(e.target.value)}></textarea>
                        <StyledBtn icon={FaSave} onClick={editCom} style={"d-flex align-items-center btn-success"} />
                    </div>
                    :
                    <>
                        <div className='text-start fw-normal'>
                            {props.comment}
                        </div>
                        < div className='d-flex justify-content-end '>
                            <StyledBtn icon={FaEdit} onClick={() => setEdit(!edit)} style={'d-flex align-items-center btn-light'} />
                            <StyledBtn icon={FaTrash} style={'d-flex align-items-center btn-danger'} onClick={() => dispatch(deleteComment(props.commnetID))} />
                        </div>
                    </>
                }
            </div>
        </div >
    )
}
