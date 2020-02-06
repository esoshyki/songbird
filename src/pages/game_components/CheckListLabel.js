import React from 'react';
import { Button } from '@material-ui/core';
import DataService from '../../services/dataService';
import './CheckListLabel.sass'

const dataService = new DataService;

export default function CheckListLabel(props) {

    const handleClick = () => {
        props.setChosedHero(props.index)
    }

    return(
        <div className='_label' onClick={handleClick}>
            <img src={props.image} alt={props.name}></img>
            <p>{props.name}</p>
        </div>
    )
}