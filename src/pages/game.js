import React from 'react';
import heroesData from '../data/heroes'

import { Link } from '@material-ui/core'

const handleClick = () => {
	console.log(heroesData[0])
}

export default function Game(props) {
	return (
		<div>
			<img src={heroesData[0][0].image} width='64px' height='64px' onClick={handleClick}/>
		</div>
	)
}