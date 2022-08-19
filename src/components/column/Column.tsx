import React, { useState } from 'react'
import { FaCheck, FaEdit, FaPlus, FaSave, FaTimes, FaTrash } from 'react-icons/fa'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { addCard, removeCardByColumnId } from '../../slices/CardSlice'
import { deleteColumn, editColumn } from '../../slices/ColumnSlice'
import { ColumnProps } from '../../types/ColumnType'
import StyledBtn from '../../UI/StyledBtn'
import Card from '../Card/Card'
import { ModalWindow } from '../ModalWindow/ModalWIndow'
const { v4: uuidv4 } = require('uuid');

const Column: React.FC<ColumnProps> = (props) => {
    const cards = useAppSelector(state => state.cards).cards.filter(i => i.columnID === props.id);
    const [active, setActive] = useState(false);
    const [isEditColumnName, setIsEditColumnName] = useState(false);
    const dispatch = useAppDispatch();
    const [newColumnName, setNewColumnName] = useState(props.name);
    const [cardState, setCardState] = useState({ title: '', description: '' });
    const author = useAppSelector(state => state.auth.author);

    const changeColumnName = () => {
        dispatch(editColumn({ id: props.id, name: newColumnName, author: props.author }));
        setNewColumnName("");
    }

    const addNewCard = () => {
        dispatch(addCard({
            id: uuidv4(),
            description: cardState.description,
            columnID: props.id,
            title: cardState.title,
            author: author,
            columnName: props.name,
        }))
        setActive(false);
    }

    const deleteColumnAndAllCardFromThisColumn = () => {
        dispatch(deleteColumn(props.id));
        dispatch(removeCardByColumnId(props.id));
    }

    const newCardModalWindow = () => {
        return (
            <div className='modal-content rounded-4 shadow'>
                <div className='modal-header'>
                    Add new card
                    {/* <FaTimes onClick={() => setActive(false)} /> */}
                    <StyledBtn style={'btn-dark d-flex align-items-center'} icon={FaTimes} onClick={() => setActive(false)}/>
                </div>
                <div className="modal-body p-4 text-center">
                    <input
                        className='form-control rounded-3 mb-3'
                        type="text"
                        placeholder='name'
                        value={cardState.title}
                        onChange={e => setCardState({ ...cardState, title: e.target.value })} />
                    <input
                        className='form-control rounded-3 mb-3'
                        type="text"
                        placeholder='decsription'
                        value={cardState.description}
                        onChange={e => setCardState({ ...cardState, description: e.target.value })} />
                    <StyledBtn text={'save'} style={'btn-lg btn-primary w-100 mx-0 mb-2 text-center'} onClick={() => addNewCard()} />
                    {/* <button onClick={() => addNewCard()} className="btn btn-lg btn-primary w-100 mx-0 mb-2">save</button> */}
                </div>
            </div>
        )
    }

    return (
        <div className='col-xs-2 col-sm-6 col-md-5 col-lg-4 col-xl-4 col-xxl-3'>
            <div className='card shadow-1-strong m-3 p-2 pb-0'>
                <ModalWindow
                    closeByClickOnGrayArea={false}
                    active={active}
                    setActive={setActive}
                    child={newCardModalWindow} />
                <div className='card-body'>
                    <div className='card-header d-flex justify-content-between pl-1 pr-0 pb-3 border-0'>
                        {!isEditColumnName ?
                            <>
                                <div className='overflow-auto fs-5 align-items-center d-flex mx-1'>
                                    {props.name}
                                </div>
                                <div className='d-flex jusify-content-between'>
                                    <StyledBtn icon={FaEdit} style={'btn-secondary d-flex align-items-center'} onClick={() => setIsEditColumnName(true)} />
                                    <StyledBtn icon={FaTrash} style={'btn-danger d-flex align-items-center'} onClick={deleteColumnAndAllCardFromThisColumn} />
                                </div>
                            </>
                            :
                            <div className='d-flex '>
                                <input
                                    className='form-control rounded-3'
                                    placeholder='text new name here...'
                                    type="text"
                                    onChange={e => setNewColumnName(e.target.value)}
                                    value={newColumnName} />
                                <StyledBtn icon={FaSave} onClick={changeColumnName} style={"btn-secondary d-flex align-items-center"} />
                            </div>
                        }
                    </div>
                    <div className='mb-3 opacity-50'>
                        {props.author}
                    </div>
                    <StyledBtn icon={FaPlus} style={'mb-3 d-flex align-items-center btn-light'} onClick={() => setActive(true)} />
                    <div className="">
                        {cards ? cards.map((card) => {
                            return (
                                <Card {...card} key={uuidv4()} />
                            )
                        }) : <></>}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Column;