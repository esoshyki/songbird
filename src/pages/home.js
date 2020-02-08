import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { Link } from "react-router-dom";
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
import { Redirect } from 'react-router-dom'

const useStyles = makeStyles(theme => ({
	root: {
		height: '100vh',
		padding: '10px 30px',
	},
	title: {
		textAlign: 'center',
		color: 'red',
		fontWeight: '700'
	},
	image: {
		backgroundImage: 'url(https://source.unsplash.com/random)',
		backgroundRepeat: 'no-repeat',
		backgroundSize: 'cover',
		backgroundPosition: 'center',
	},
	paperGrid: {
		background: 'none',
		color: 'white'
	},
	paper: {
		margin: theme.spacing(8, 4),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		background: 'none'
	},
	avatar: {
		margin: theme.spacing(1),
		// backgroundColor: theme.palette.secondary.main,
	},
	form: {
		width: '100%', // Fix IE 11 issue.
		marginTop: theme.spacing(1),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
	snack: {
		backgroundColor: theme.palette.error.dark,
	},
	closeSnack: {
		padding: theme.spacing(0.5),
	},
	textField: {
		color: 'white !important' 
	}
}));

export default function Home(props) {
	const classes = useStyles({});

	const handleChangeName = ({target}) => {
		props.setGamer(target.value)
		console.log(props.score)
	}


	return (
    <Grid container component="main" className={classes.root}>
      {/* <CssBaseline /> */}
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square className={classes.paperGrid} >
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
						Введите имя
          </Typography>
              <TextField className={classes.textField}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="name"
                label="Введите имя"
                name="name"
                autoComplete="name"
								autoFocus
								onChange={handleChangeName}
              />
							<Link to='/pages/game'>+
								<Button
									fullWidth
									variant="contained"
									color="primary"
									className={classes.submit}
								>
									Начать игру
								</Button>
							</Link>
        </div>
      </Grid>
    </Grid>
	)
}