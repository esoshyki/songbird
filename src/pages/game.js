import React, { useState } from 'react';
import { Button } from '@material-ui/core'
import DataService from '../services/dataService';
import CheckListLabel from './game_components/CheckListLabel';
import HeroInformation from './game_components/HeroInformation';
import AudioPlayer from './game_components/AudioPlayer'
import { makeStyles } from '@material-ui/core/styles'
import { Redirect } from 'react-router-dom'
import './game.sass'
const dataService = new DataService();

const roles = {
	strength: 'strength',
	agility: 'agility',
	magic: 'magic',
	carry: 'carry',
	support: 'support',
	forrest: 'forrest',
	midlane: 'midlane',
	hardlane: 'hardlane'
}

const answers = {
	right: 'ВЕРНО!',
	fail: 'НЕВЕРНО!'
}

const useStyles = makeStyles({
	root: {
		minHeight: '100vh',
		padding: '0 20px'
	},
	gameInfo: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-around',
		alignItems: 'center',
		fontSize: '2rem'
	},
	playerAndRound: {
		color: 'green',
		fontSize: '1.5rem',
		marginLeft: '5px'
	},
	positiveScore: {
		color: 'green',
		fontSize: '1.5rem'
	},
	negativeScore: {
		color: 'red',
		fontSize: '1.5rem'
	},
	nextRoundLabel: {
		color: 'green',
		fontSize: '1.2rem',
		textAlign: 'center'
	}
})

export default function Game(props) {

	const classes = useStyles({})

	const [role, setRole] = useState()
	const [randomHeroes, setRandomHeroes] = useState()
	const [choosedHero, setChosedHero] = useState(false);
	const [secretHero, setSecretHero] = useState();
	const [roundNotFinished, setRoundNotFinished] = useState(true);
	const [answer, setAnswer ] = useState();
	const [sound, setSound ] = useState();
	const [redirect, setRedirect] = useState(false);

	const chooseSecretHero = () => Math.floor(Math.random() * 5)

	const handleButtonClick = (role) => {
		const heroes = dataService.getRandomHeroes(role);
		const secretID = chooseSecretHero();
		setChosedHero(false)
		setRole(role);
		setRandomHeroes(heroes);
		setSecretHero(secretID);
		setSound(heroes[secretID].sound)
		setAnswer(null)
		if (roundNotFinished === false) {
			props.setRound(props.round + 1);
		}
	    setRoundNotFinished(true)
	}

	const handleLabelClick = (event) => {
	}

	const getAnswer = () => {
		const answer = choosedHero === secretHero
		answer ? props.setScore(props.score + 15) : props.setScore(props.score - 15);
		setRoundNotFinished(false)
		setAnswer(answer ? answers.right : answers.fail);
		console.log(redirect);
		console.log(props.round)
		if (props.round >= 10) {
			setRedirect(true)
		}
	}
	return (redirect) ? <Redirect to='/pages/finishGame' /> : (
		<div className={classes.root}>
			<div className='game-header'>
				<Button variant="contained" color="primary" onClick={() => handleButtonClick(roles.strength)}>Силовики</Button>
				<Button variant="contained" color="primary" onClick={() => handleButtonClick(roles.agility)}>Ловкачи</Button>
				<Button variant="contained" color="primary" onClick={() => handleButtonClick(roles.magic)}>Маги</Button>
				<Button variant="contained" color="primary" onClick={() => handleButtonClick(roles.carry)}>Керри</Button>
				<Button variant="contained" color="primary" onClick={() => handleButtonClick(roles.support)}>Саппорты</Button>
				<Button variant="contained" color="primary" onClick={() => handleButtonClick(roles.midlane)}>Мидеры</Button>
				<Button variant="contained" color="primary" onClick={() => handleButtonClick(roles.hardlane)}>Хардлайнеры</Button>
				<Button variant="contained" color="primary" onClick={() => handleButtonClick(roles.forrest)}>Лесники</Button>
			</div>
			<div className={classes.gameInfo}>
				<div >Player: <span className={classes.playerAndRound}>{props.gamer}</span></div>
				<div >Round: <span className={classes.playerAndRound}>{props.round}</span></div>
				<div >Score: <span className={props.score >= 0 ? classes.positiveScore : classes.negativeScore}>{props.score}</span></div>
			</div>
			{!roundNotFinished ? 
				<div className={classes.nextRoundLabel}>
					Для начала следующего раунда, жмякай на любой раздел геров
				</div>
			: ''}
			<div className='game'>
				<div onClick={handleLabelClick}>
				{(randomHeroes && roundNotFinished) ? randomHeroes.map((hero, idx) => (
					<CheckListLabel 
						name={hero.name} 
						image={hero.image} 
						key={idx.toString()} 
						index={idx} 
						setChosedHero={setChosedHero}
						/>
				)) : null}
				</div>
				<div>

						{secretHero || secretHero === 0 ? 
						<AudioPlayer audio={sound}/> : ''
						}
					<div className='answer-line'>
						{(choosedHero || choosedHero === 0 ) && roundNotFinished ?  
						<Button variant="contained" color="primary" 
							onClick={getAnswer}>Ответить</Button>
							: ''
						}
						{answer ?
							<div className='answer-response'>
								{(answer === answers.right) ? 
									<h3 className='right-answer'>{answer}</h3>
									:
									<h3 className='false-answer'>{answer}</h3>
								}
								{(answer === answers.fail) ? 
								<p >Вы ответили 
									<span className='false-answer'>{randomHeroes[choosedHero].name}</span>, <br />
									Но правильный ответ 
									<span className='right-answer'>{randomHeroes[secretHero].name}</span></p>
								:
								<p>Отличный ответ!</p>	

							}
							</div> : ''}
					</div>
					<div>
					{choosedHero || choosedHero === 0?  
						<HeroInformation 
							name={randomHeroes[choosedHero].name} 
							image={randomHeroes[choosedHero].image} 
							description={randomHeroes[choosedHero].description}
							audio={randomHeroes[choosedHero].sound} /> : ''}
					</div>
				</div>
			</div>
		</div>
	) 
}