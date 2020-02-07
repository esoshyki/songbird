import React, { useState } from 'react';
import { Button } from '@material-ui/core';
import DataService from '../../services/dataService';
import './CheckListLabel.sass'

const dataService = new DataService;

export default function CheckListLabel(props) {

    const [ blured, setBlured ] = useState('not-blure');

    const handleClick = () => {
        props.setChosedHero(props.index)
    }

    const handleBlur = () => {
        setBlured('blure')
    }

    return(
        <div className='_label' onClick={handleClick} onBlur={handleBlur}>
            <img src={props.image} alt={props.name}></img>
            <p className={blured}>{props.name}</p>
        </div>
    )
}