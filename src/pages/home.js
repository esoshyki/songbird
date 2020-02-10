import React, { useState } from 'react';
import { makeStyles,  withStyles, } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { Link } from "react-router-dom";
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

const useStyles = makeStyles(theme => ({
	root: {
		height: '100vh',
		padding: '10px 30px',
		color: 'wheat'
	},
	title: {
		textAlign: 'center',
		color: 'wheat !important',
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
		background: 'none',
		margin: '0 auto',
		padding: '5px 10px'
	},
	titlePaper: {
		margin: theme.spacing(8, 4),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		background: 'none',
		color: 'wheat',
		padding: '5px 10px',
		margin: '0 auto'
	},
	avatar: {
		margin: theme.spacing(1),
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
		color: 'wheat !important',
		background: 'none'
	}
}));

export default function Home(props) {
	const classes = useStyles({});

	const handleChangeName = ({target}) => {
		props.setGamer(target.value)
	}

	return (
    <Grid container component="main" className={classes.root}>
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square className={classes.paperGrid} >
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5" className={classes.title}>
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
			  			InputLabelProps={{
        				className: classes.textField
        			}}
        			InputProps={{
        				className: classes.textField
        			}}
							/>

							<Link to='/pages/game'>
								<Button
									fullWidth
									variant="contained"
									color="primary"
									className={classes.submit}>
									Начать игру
								</Button>
							</Link>
        </div>
      </Grid>
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square className={classes.titlePaper} >
        <Typography component="h1" variant="h2">
					Викторина! Угадай героя Доты по голосу
        </Typography>      
      </Grid>
    </Grid>
	)
}