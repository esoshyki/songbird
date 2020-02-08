import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { Link, Redirect } from "react-router-dom";
import './home.sass'
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
    displey: 'flex',
    flexDirection: 'columb',
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export default function FinishGame(props) {

  const [redirect, setRedirect ] = useState(false);

  const classes = useStyles({});

  const handleClick = () => {
    props.setScore(0);
    props.setRound(1);
    setRedirect(true);
  }

  return (
    redirect ? <Redirect to='/' />  : 
    <div className={classes.root}>
    <h3>Hey, <span>{props.gamer}</span>, you have earned <span>{props.score}</span></h3>
    <Link to='/'>
      <Button
			fullWidth
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