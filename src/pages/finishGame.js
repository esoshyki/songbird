import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { Link, Redirect } from "react-router-dom";
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles({
  root: {
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    fontSize: '2rem',
    backgroundImage: 'url(https://images5.alphacoders.com/387/thumb-1920-387546.jpg)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat'
  },
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
    <div className={classes.root}>
      <h3>Hey, <span className={classes.highScore}>{props.gamer}</span>, <br/>
      you have earned <span className={chooseStyle()}>{props.score} </span> 
      points from <span className={classes.highScore}>40</span> maximum</h3>
    <Link to='/'>
      <Button
		  variant="contained"
			color="primary"
      className={classes.submit}
      onClick={handleClick}
			>
        Вернуться
		  </Button>
    </Link>
  </div>  
  )
}