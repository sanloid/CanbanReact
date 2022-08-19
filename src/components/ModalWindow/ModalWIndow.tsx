import React, { useState } from 'react'

interface ModalProps {
    active: boolean;
    setActive: Function;
    child: Function;
    closeByClickOnGrayArea: boolean;
}

export const ModalWindow: React.FC<ModalProps> = (props) => {
    return (
        props.active ?
            <div
                className='modal modal-signin  d-block bg-secondary'
                onClick={props.closeByClickOnGrayArea ? () => props.setActive(false) : () => null}>
                <div
                    className='modal-dialog'
                    onClick={e => e.stopPropagation()}>
                    {props.child()}
                </div>
            </div> : <></>
    )
}