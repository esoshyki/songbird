import React from 'react';
import DataService from '../services/dataService'
import { Button } from '@material-ui/core';

const databaseService = new DataService();

export default function AddToDataBase() {
    const handlerClick = () => {

        databaseService.addHero({
            name: 'Abbadon',
            role: 'Support',
            description: 'huy',
            image: 'Image',
            sound: 'dasdsad'
        })
    };
    
    const returnClick = () => {
        console.log(databaseService.collectHeroes('support'))
    }
    return (
		<div>
            Добавить героя
            <Button onClick={handlerClick} variant="contained" color="primary" >
                Добавь Аббу
            </Button>
            <Button onClick={returnClick} variant="contained" color="primary">
                Верни Аббу
            </Button>            
        </div>
	)
}