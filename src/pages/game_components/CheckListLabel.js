import React, { useState } from 'react';

export default function CheckListLabel(props) {

    const [ blured, setBlured ] = useState('not-blure');

    const handleBlur = () => {
        setBlured('blure')
    }

    const handleClick = () => {
        props.handleAnswer(props.index);
    }

    return(
        <div className={props.class}
          onBlur={handleBlur}
          onClick={props.roundFinished ? null : handleClick}
        >
          <img src={props.image} alt={props.name} index={props.index}></img>
          <p className={blured} index={props.index}>{props.name}</p>
        </div>
    )
}