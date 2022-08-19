import React, { useState } from 'react';
import { FaCheck, FaTimes } from 'react-icons/fa';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { setName } from '../../slices/AuthSlice';
import { addColumn } from '../../slices/ColumnSlice';
import { ColumnProps } from '../../types/ColumnType';
import StyledBtn from '../../UI/StyledBtn';
import Column from '../column/Column';
import { ModalWindow } from '../ModalWindow/ModalWIndow';
const { v4: uuidv4 } = require('uuid');

function Board() {
  const columns: ColumnProps[] = useAppSelector(state => state.columns).columns
  const [columnNameInput, setColumnNameInput] = useState("");
  const author = useAppSelector(state => state.auth.author)
  const [active, setActive] = useState(author === "");
  const dispatch = useAppDispatch();

  const addNewColumn = () => {
    dispatch(addColumn({ name: columnNameInput, id: uuidv4(), author: author }));
  }

  const Auth = () => {
    const [author, setAuthor] = useState('');
    const dispatch = useAppDispatch();

    const submitNameBtn = () => {
      dispatch(setName(author));
      setActive(false);
    }

    return (
      <div className='modal-content rounded-4 shadow'>
        <div className='modal-header'>
          Hi! What's your name?
        </div>
        <div className="modal-body p-4 text-center">
          <input className='form-control rounded-3 mb-3' type="text" onChange={e => setAuthor(e.target.value)} value={author} />
          <button className="btn btn-lg btn-primary mb-2 w-100" onClick={submitNameBtn}>OK</button>
        </div>
      </div>
    )
  }

  return (
    <div className="mx-2">
      <ModalWindow
        active={active}
        setActive={setActive}
        child={Auth}
        closeByClickOnGrayArea={false} />
      <div className='d-flex'>
        <div className='col-xs-2 col-sm-6 col-md-5 col-lg-4 col-xl-4 col-xxl-3 my-3'>
          <div className='card p-3'>
            <div>
              add new column
            </div>
            <div>
              <input
                className='form-control rounded-3'
                type="text"
                onChange={e => setColumnNameInput(e.target.value)}
                value={columnNameInput} />
            </div>
            <div>
              <StyledBtn icon={FaCheck} onClick={addNewColumn} style={'btn-lg btn-success d-flex align-items-center'} />
            </div>
          </div>
        </div>
        {columns.map((i, key) => {
          return (
            <Column {...i} key={uuidv4()} />
          )
        })}
      </div>
    </div>
  );
}

export default Board;
