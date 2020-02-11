import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from "react-router-dom";
import { Container, Box, Typography, Avatar, TextField, Paper } from '@material-ui/core'
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
	paperGrid: {
		background: 'none',
		color: 'white',
		marginTop: '20px'
	},
	paper: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		background: 'none',
		margin: '0 auto',
		padding: '5px 10px'
	},
	titlePaper: {
		color: 'wheat',
		fontSize: '1.5rem',
		fontWeight: '700',
		textAlign: 'center',
		margin: theme.spacing(3, 3)
	},
	avatar: {
		margin: theme.spacing(1),
	},
	form: {
		width: '100%', // Fix IE 11 issue.
		marginTop: theme.spacing(1),
	},
	submitText: {
		textDecoration: 'none',
		color: 'wheat',
		fontWeight: '700',
		fontSize: '1.2rem'
	},
	textField: {
		color: 'wheat !important',
		background: 'none',
		marginBottom: theme.spacing(1)
	}
}));

export default function Home(props) {
	const classes = useStyles({});

	const handleChangeName = ({target}) => {
		props.setGamer(target.value)
	}

	return (
    <Container maxWidth="sm" className={classes.root}>
      <Box component={Paper} elevation={6} square className={classes.paperGrid} >
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5" className={classes.title}>
						Введите имя
          </Typography>
            <TextField className={classes.textField}
              variant="filled"
              margin="normal"
              fullWidth
              id="name"
              label="Введите имя"
              name="name"
			  			onChange={handleChangeName}
			  			InputLabelProps={{
        				className: classes.textField
        			}}
        			InputProps={{
        				className: classes.textField
        			}}
							/>

							<Link to='/pages/game'>
								<button	className='start-game'>
									<span className={classes.submitText}>Начать игру</span>
								</button>
							</Link>
			        <Typography component="h1" variant="h2" className={classes.titlePaper}>
								Викторина! Угадай героя Доты по голосу
			        </Typography>      

        </div>
      </Box>
    </Container>
	)
}