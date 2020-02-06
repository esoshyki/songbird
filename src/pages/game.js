import React, { useState } from 'react';
import { Button } from '@material-ui/core'
import DataService from '../services/dataService';
import CheckListLabel from './game_components/CheckListLabel';
import HeroInformation from './game_components/HeroInformation';
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

	const handleButtonClick = (role) => {
		setChosedHero(false)
		setRole(role);
		setRandomHeroes(dataService.getRandomHeroes(role))
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
				{choosedHero || choosedHero === 0?  
					<HeroInformation 
						name={randomHeroes[choosedHero].name} 
						image={randomHeroes[choosedHero].image} 
						description={randomHeroes[choosedHero].description} /> : ''}
			</div>
		</div>
	)
}