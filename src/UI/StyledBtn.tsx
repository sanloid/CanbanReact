import React from 'react'

export interface StyledBtnProps {
    icon?: Function;
    text?: string;
    style?: string;
    onClick?: any;
}

export default function StyledBtn(props: StyledBtnProps) {
    let style_ = 'btn p-2 m-2 justify-content-center '
    let styles = props.style? style_.concat(props.style) : style_;
    return (
        <div className={styles} onClick={props.onClick}>
            {props.icon ? props.icon() : <></>}
            {props.text ? props.text : <></>}
        </div>
    )
}
