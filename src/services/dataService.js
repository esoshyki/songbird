import heroesData from '../data/heroes';

const messages = {
    succes: 'The hero has been added to database',
    error: 'There was some problem with adding a hero'
}

export default class DataService {
    
    constructor() {
        this.addHero = this.addHero.bind(this)
    }

    checkHero(heroData) {
        return Object.keys(heroData).every(key => heroData[key].length > 0)
    }

    addHero(heroData) {
        const {role} = heroData;
        if (this.checkHero(heroData)) {
            heroesData[role].append(heroData)
            return messages.succes;
        } else {
            return messages.error
        }
    }

    collectHeroes(role) {
        return heroesData[role]
    }
} 
