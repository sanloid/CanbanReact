import React, { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { editCard, removeCardById } from '../../slices/CardSlice'
import { CardProps } from '../../types/CardType'
import { ModalWindow } from '../ModalWindow/ModalWIndow'
import { Comment } from '../Comment/Comment'
import { addComment } from '../../slices/CommentSlice'
import { FaCheck, FaList, FaPaperPlane, FaSave, FaTimes, FaTrash, } from 'react-icons/fa';
import { BiConversation } from "react-icons/bi";
const { v4: uuidv4 } = require('uuid');


const Card: React.FC<CardProps> = (props) => {
  const dispatch = useAppDispatch();
  const comments = useAppSelector(state => state.comments).comments.filter(i => i.cardID === props.id);
  const [active, setActive] = useState(false);
  const author = useAppSelector(state => state.auth.author);
  const [commentState, setCommentState] = useState('');
  const [cardContent, setCardContent] = useState({
    title: props.title,
    description: props.description,
    id: props.id,
    columnID: props.columnID,
    author: author,
    columnName: props.columnName,
  })


  const saveNewCardContent = () => {
    dispatch(editCard({ ...cardContent }));
    setActive(false);
  }

  const EditCardModalWindow = () => {
    return (
      <div className='modal-content rounded-4 shadow'>
        <div className='modal-header'>
          <div className='fw-bold'>
            Edit card
          </div>
          <div className='btn btn-dark d-flex align-items-center p-2' onClick={() => setActive(false)} >
            <FaTimes />
          </div>
        </div>
        <div className="modal-body p-4 text-center">
          <div className='fw-bold fs-3 text-start'>
            {props.columnName}
          </div>
          <div className='fw-bold mb-3 opacity-25 text-start'>
            {props.author}
          </div>
          <div>
            <input
              className='form-control rounded-3 mb-3'
              type="text"
              value={cardContent.title}
              onChange={e => setCardContent({ ...cardContent, title: e.target.value })} />
          </div>
          <div>
            <textarea
              className='form-control rounded-3 mb-3'
              value={cardContent.description}
              onChange={e => setCardContent({ ...cardContent, description: e.target.value })} />
          </div>
          <div className='btn btn-lg btn-primary w-100 mx-0 mb-2' onClick={() => saveNewCardContent()}>
            <FaSave />
          </div>
          <div className='fw-bold mb-3'>
            Comments:
            <div>
              {comments.map((i) => <Comment {...i} key={uuidv4()} />)}
            </div>
          </div>
          <div className='mb-3'>
            Leave a comment:
          </div>
          <div className="mb-3">
            <textarea className="form-control" value={commentState} onChange={e => setCommentState(e.target.value)}></textarea>
          </div>
          <div className='btn btn-lg btn-primary w-100' onClick={() => dispatch(addComment({ comment: commentState, author: author, commnetID: uuidv4(), cardID: props.id }))} >
            <FaPaperPlane />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className='card mb-3 p-3'>
      <ModalWindow
        closeByClickOnGrayArea={false}
        active={active}
        setActive={setActive}
        child={EditCardModalWindow} />
      <div className='mb-0'>
        {props.title}
      </div>
      <div className='mb-3 opacity-75'>
        {props.description}
      </div>
      <div className='d-flex justify-content-between align-items-center'>
        <div className='btn btn-secondary d-flex align-items-center p-2' onClick={() => setActive(true)} >
          <FaList />
        </div>
        <div>
          {comments.length}
          <BiConversation />
        </div>
        <div className='btn btn-danger d-flex align-items-center p-2' onClick={() => dispatch(removeCardById(props.id))}>
          <FaTrash/>
        </div>
      </div>
    </div>
  )
}
export default Card