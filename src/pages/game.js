import React, { useState } from 'react';
import { Button } from '@material-ui/core'
import DataService from '../services/dataService';
import CheckListLabel from './game_components/CheckListLabel';
import HeroInformation from './game_components/HeroInformation';
import AudioPlayer from './game_components/AudioPlayer'
import './game.sass'
const dataService = new DataService;

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


export default function Game(props) {

	const [role, setRole] = useState()
	const [randomHeroes, setRandomHeroes] = useState()
	const [choosedHero, setChosedHero] = useState(false);
	const [secretHero, setSecretHero] = useState();
	const [answerWasBeenGet, setAnswerWasBeenGet] = useState(false)

	const chooseSecretHero = () => Math.floor(Math.random() * 5)

	const handleButtonClick = (role) => {
		setChosedHero(false)
		setRole(role);
		setRandomHeroes(dataService.getRandomHeroes(role));
		setSecretHero(chooseSecretHero());
		if (props.round === 0) {
			props.setRound(1)
		}
	}

	const getAnswer = () => {
		choosedHero === secretHero ? props.setScore(props.score + 15) : props.setScore(props.score - 15);
		props.setRound(props.round +1);
	}

	return (
		<div>
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
			<div className='game'>
				<div>
				{randomHeroes ? randomHeroes.map((hero, idx) => (
					<CheckListLabel name={hero.name} image={hero.image} index={idx} setChosedHero={setChosedHero}/>
				)) : null}
				</div>
				<div>
				<div>
					{secretHero || secretHero === 0 ? 
						<AudioPlayer audio={randomHeroes[secretHero].audio}/> : ''
					}
					{choosedHero || choosedHero === 0 ?  
					<Button variant="contained" color="primary" 
						onClick={getAnswer}>Ответить</Button>
						: ''
					}
				</div>
				{choosedHero || choosedHero === 0?  
					<HeroInformation 
						name={randomHeroes[choosedHero].name} 
						image={randomHeroes[choosedHero].image} 
						description={randomHeroes[choosedHero].description}
						audio={randomHeroes[choosedHero].sound} /> : ''}
				</div>
			</div>
		</div>
	)
}