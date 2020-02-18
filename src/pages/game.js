import React, { useState, useEffect  } from 'react';
import { Button } from '@material-ui/core'
import DataService from '../services/dataService';
import CheckListLabel from './game_components/CheckListLabel';
import HeroInformation from './game_components/HeroInformation';
import AudioPlayer from './game_components/AudioPlayer';
import Answer from './game_components/Answer'
import { makeStyles } from '@material-ui/core/styles'
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

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
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'flex-start',
		minHeight: '100vh',
		padding: '0 20px'
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
		height: '30px',
		lineHeight: '0',
	},
		currentLevelTitle: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		padding: '0 10px',
		backgroundColor: '#00bc8c',
		color: 'white',
		height: '30px',
		lineHeight: '0'
	},
	nextRoundButton: {
		backgroundColor: '#4caf50',
		color: 'white',
		margin: '0 auto',
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
	},
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


function Game({changeRound, changeScore, endGame, user, score, round}) {

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

	const handleAnswer = (hero) => {
		const answersObject = Object.assign({}, madeAnswers);
		setChosedHero(hero);
		setChoosedAudio(randomHeroes[hero].sound)
		if (hero === secretHero) {
			setAnswer(answers.right)
			setRoundFinished(true)
			changeScore(scoreCount);
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
	}

	const NextRoundButton = () => {
		const ButtonInner = () => {
			if (round === 0) {
				return 'Начать первый раунд'
			} else if (round === 8) {
				return 'Завершить игру'
			} else {
				return 'Начать следующий раунд'
			}
		}

		const nextRound = () => {
			const heroesData = dataService.getRandomHeroes(roles[round > 0 ? round : 1]);
			setRandomHeroes(heroesData)
			round <=8 ? changeRound() : endGame();
		}

		return (
			<Button 
		  variant="contained"
			color="primary"
			onClick={nextRound}
			className={roundFinished ? null : classes.disabledButton}>
				<ButtonInner />
				{/* {props.round < 8 ? 'Начать следующий раунд' : 'Заверишть игру'} */}
			</Button>
		)
	}


	return (redirect) ? <Redirect to='/pages/finishGame' /> : (
		<div className='game'>
			<div className='game-header'>
				<div className={round >= 1 ? classes.currentLevelTitle : classes.levelTitle}>Силовики</div>
				<div className={round >= 2 ? classes.currentLevelTitle : classes.levelTitle}>Ловкачи</div>
				<div className={round >= 3 ? classes.currentLevelTitle : classes.levelTitle}>Маги</div>
				<div className={round >= 4 ? classes.currentLevelTitle : classes.levelTitle}>Керри</div>
				<div className={round >= 5 ? classes.currentLevelTitle : classes.levelTitle}>Саппорты</div>
				<div className={round >= 6 ? classes.currentLevelTitle : classes.levelTitle}>Мидеры</div>
				<div className={round >= 7 ? classes.currentLevelTitle : classes.levelTitle}>Хардлайнеры</div>
				<div className={round >= 8 ? classes.currentLevelTitle : classes.levelTitle}>Лесники</div>
			</div>
			<div className='game-info'>
				<div className='_button-container'>
					<NextRoundButton/>
				</div>
				<div className='_text-information'>
					<p >Игрок: <span className={classes.playerAndRound}>{user ? user : 'Аноним'}</span><br />
					Раунд: <span className={classes.playerAndRound}>{round}</span>/8
					Счет: <span className={score >= 0 ? classes.positiveScore : classes.negativeScore}>{score}</span></p>
				 </div>
			</div>

			<div className='game-body'>
				{secretHero || secretHero === 0 ? 
					<AudioPlayer audio={sound}/> : ''}
				<div className='_hero-field'>
				<div className='_hero-choise'>
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
						round={round}
						class={madeAnswers[idx]}
						/>
				)) : null}
				</div>
				<div className='one-hero-part'>
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
							sound={choosedAudio}
							notFirst={answer == null ? true : false}
							 /> : ''}
							
					</div>
				</div>
				</div>
			</div>
		</div>
	) 
}

const mapStateProps = state => ({
	user: state.user,
	score: state.score,
	round: state.round
})

const mapDispatchToProps = dispatch => {
	return {
		changeRound: () => dispatch({type: 'NEXT_ROUND'}),
		changeScore: (points) => dispatch({type: 'CHANGE_SCORE', payload: points}),
		endGame: () => dispatch({type: 'END_GAME'})
	}
}

export default connect(mapStateProps, mapDispatchToProps)(Game);
