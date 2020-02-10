import React, { useState, useEffect } from 'react';
import { Button } from '@material-ui/core'
import DataService from '../services/dataService';
import CheckListLabel from './game_components/CheckListLabel';
import HeroInformation from './game_components/HeroInformation';
import AudioPlayer from './game_components/AudioPlayer';
import Answer from './game_components/Answer'
import { makeStyles } from '@material-ui/core/styles'
import { Redirect } from 'react-router-dom'
const dataService = new DataService();

const roles = {
	1: 'strength',
	2: 'agility',
	3: 'magic',
	4: 'carry',
	5: 'support',
	6: 'forrest',
	7: 'midlane',
	8: 'hardlane'
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
	game: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'top'
	},
	gameHeader: {
		display: 'flex',
		justifyContent: 'space-around',
		alignItems: 'center',
		padding: '5px'
	},
	gameInfo: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-around',
		alignItems: 'center',
		fontSize: '2rem',
		margin: '10px 0'
	},
	answerLine: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'flex-start',
		alignItems: 'center'
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
	},
	levelTitle: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		padding: '0 10px',
		backgroundColor: '#008966',
		color: 'white',
		minWidth: '100px',
		height: '30px',
		lineHeight: '0'
	},
		currentLevelTitle: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		padding: '0 10px',
		backgroundColor: '#00bc8c',
		color: 'white',
		minWidth: '100px',
		height: '30px',
		lineHeight: '0'
	},
	nextRoundButton: {
		backgroundColor: '#4caf50',
		color: 'white'
	},
	wrongAnswer: {
		color: 'red',
		opacity: '0.5'
	},
	rightAnswer: {
		color: 'green'
	},
	disabledButton: {
		opacity: 0.2
	}

})


const classesStatus = {
    noAnswer: 'no-answer',
    wrongAnswer: 'wrong-answer',
    rightAnswer: 'right-answer',
}

const startClasses = {
	0: classesStatus.noAnswer,
	1: classesStatus.noAnswer,
	2: classesStatus.noAnswer,
	3: classesStatus.noAnswer,
	4: classesStatus.noAnswer,
	5: classesStatus.noAnswer,
}


export default function Game(props) {

	const classes = useStyles({})

	const [randomHeroes, setRandomHeroes] = useState()
	const [choosedHero, setChosedHero] = useState(false);
	const [secretHero, setSecretHero] = useState();
	const [sound, setSound ] = useState();
	const [redirect, setRedirect] = useState(false);
	const [answer, setAnswer] = useState(null)
	const [roundFinished, setRoundFinished] = useState(true);
	const [madeAnswers, setMadeAnswers] = useState(startClasses);
	const [scoreCount, setScoreCount] = useState(5);
	const [gameFinished, setGameFinished] = useState(false);
	const [removeHeroInformation, setRemoveHeroInformation] = useState(false);
	const [choosedAudio, setChoosedAudio] = useState(null);
	const chooseSecretHero = () => Math.floor(Math.random() * 5)

	const startNewLvL = () => {
		setMadeAnswers(startClasses);
		setRemoveHeroInformation(true);
		const round = props.round + 1;
		if (round > Object.keys(roles).length) {
			setRedirect(true)
			setGameFinished(true)
		}
		else {
			const heroes = dataService.getRandomHeroes(roles[round]);
			const secretID = chooseSecretHero();
			setRandomHeroes(heroes);
			setSecretHero(secretID);
			setSound(heroes[secretID].sound)
		}
		props.setRound(round);
		setAnswer(null)
		setRoundFinished(false)
	}

	const handleAnswer = (hero) => {
		const answersObject = Object.assign({}, madeAnswers);
		setChosedHero(hero);
		setChoosedAudio(randomHeroes[hero].sound)
		console.log(randomHeroes)
		if (hero == secretHero) {
			setAnswer(answers.right)
			setRoundFinished(true)
			props.setScore(props.score+scoreCount);
			answersObject[hero] = classesStatus.rightAnswer;
			setScoreCount(5)
		}
		else {
			setAnswer(answers.fail);
			setScoreCount(scoreCount - 1);
			answersObject[hero] = classesStatus.wrongAnswer;
			setRemoveHeroInformation(false)
		}
		setMadeAnswers(answersObject);
		console.log(choosedAudio)
	}

	const NextRoundButton = () => {
		return (
			<Button 
		  variant="contained"
			color="primary"
			onClick={roundFinished && !gameFinished ? startNewLvL : null}
			className={roundFinished ? null : classes.disabledButton}>
				{props.round < 8 ? 'Начать следующий раунд' : 'Заверишть игру'}
			</Button>
		)
	}

	return (redirect) ? <Redirect to='/pages/finishGame' /> : (
		<div className={classes.root}>
			<div className={classes.gameHeader}>
				<div className={props.round >= 1 ? classes.currentLevelTitle : classes.levelTitle}>Силовики</div>
				<div className={props.round >= 2 ? classes.currentLevelTitle : classes.levelTitle}>Ловкачи</div>
				<div className={props.round >= 3 ? classes.currentLevelTitle : classes.levelTitle}>Маги</div>
				<div className={props.round >= 4 ? classes.currentLevelTitle : classes.levelTitle}>Керри</div>
				<div className={props.round >= 5 ? classes.currentLevelTitle : classes.levelTitle}>Саппорты</div>
				<div className={props.round >= 6 ? classes.currentLevelTitle : classes.levelTitle}>Мидеры</div>
				<div className={props.round >= 7 ? classes.currentLevelTitle : classes.levelTitle}>Хардлайнеры</div>
				<div className={props.round >= 8 ? classes.currentLevelTitle : classes.levelTitle}>Лесники</div>
			</div>
			<div className={classes.gameInfo}>
				<div >Игрок: <span className={classes.playerAndRound}>{props.gamer}</span></div>
				<div >Раунд: <span className={classes.playerAndRound}>{props.round}</span>/8</div>
				<div >Счет: <span className={props.score >= 0 ? classes.positiveScore : classes.negativeScore}>{props.score}</span></div>
			</div>
			<NextRoundButton 

			/>
			<div className={classes.game}>
				<div>
				{(randomHeroes) ? randomHeroes.map((hero, idx) => (
					<CheckListLabel 
						name={hero.name} 
						image={hero.image} 
						key={idx.toString()} 
						index={idx} 
						handleAnswer={handleAnswer}
						choosedHero={choosedHero}
						secretHero={secretHero}
						roundFinished={roundFinished}
						round={props.round}
						class={madeAnswers[idx]}
						/>
				)) : null}
				</div>
				<div>

						{secretHero || secretHero === 0 ? 
						<AudioPlayer audio={sound}/> : ''
						}
					<div className={classes.answerLine}>
						<Answer answer={answer} />
					</div>
					<div>
					{choosedHero || choosedHero === 0?  
						<HeroInformation 
							remove={removeHeroInformation}
							name={randomHeroes[choosedHero].name} 
							image={randomHeroes[choosedHero].image} 
							description={randomHeroes[choosedHero].description}
							sound={choosedAudio} /> : ''}
					</div>
				</div>
			</div>
		</div>
	) 
}
