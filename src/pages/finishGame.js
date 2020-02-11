import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Link, Redirect } from "react-router-dom";
import Button from '@material-ui/core/Button';

const useStyles = makeStyles({
  lowScore: {
    color: 'red'
  },
  midScore: {
    color: 'yellow'
  },
  highScore: {
    color: 'green'
  },
})

export default function FinishGame(props) {

  const [redirect, setRedirect ] = useState(false);

  const classes = useStyles({});

  const handleClick = () => {
    props.setScore(0);
    props.setRound(1);
    setRedirect(true);
  }

  const chooseStyle = () => {
    if (props.score > 30) {
      return classes.highScore
    } else if (props.score > 15 && props.score <= 30) {
      return classes.midScore
    } else {
      return classes.lowScore
    }
  }

  return (
    redirect ? <Redirect to='/' />  : 
    <div className='finish-game'>
      <h3>Эй, <span className={classes.highScore}>{props.gamer}</span>, <br/>
      Ты заработал <span className={chooseStyle()}>{props.score} </span> 
      баллов из <span className={classes.highScore}>40</span> возможных</h3>
    <Link to='/'>
      <Button
		  variant="contained"
			color="primary"
      className='_button'
      onClick={handleClick}
			>
        Вернуться
		  </Button>
    </Link>
  </div>  
  )
}