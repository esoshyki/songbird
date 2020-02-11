import React, { useState } from 'react';
import { Button } from '@material-ui/core';
import DataService from '../../services/dataService';
import { makeStyles } from '@material-ui/core/styles';

const dataService = new DataService;

const answers = {
	right: 'ВЕРНО!',
	fail: 'НЕВЕРНО!'
}

const classesStatus = {
    noAnswer: 'no-answer',
    wrongAnswer: 'wrong-answer',
    rightAnswer: 'right-answer',
}

export default function CheckListLabel(props) {

    const [ blured, setBlured ] = useState('not-blure');
    const [ classs, setClasss] = useState(classesStatus.noAnswer)
    const [ wasChosen, setWasChosen ] = useState(props.roundFinished ? false : true);
    const [ round, setRound ] = useState(1);

    const handleBlur = () => {
        setBlured('blure')
    }

    const handleClick = () => {
        props.handleAnswer(props.index);
        if (props.index == props.secretHero) {
            setClasss(classesStatus.rightAnswer)
            setRound(props.round + 1);
        } else {
            setClasss(classesStatus.wrongAnswer)            
        }
        setWasChosen(true)
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