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

    getRandomHeroes(role) {
        console.log(role)
        const roleDataArray = heroesData[role];
        const range = roleDataArray.length - 1;

        const getRandom = () => Math.floor(Math.random() * range);
        const randomHeroes = [];
        new Array(6).fill(0).forEach((_) => {
            let number = getRandom();
            while (randomHeroes.includes(number)) {
                number = getRandom()
            };
            randomHeroes.push(number)
        })

        return randomHeroes.map(el => {
            return roleDataArray[el]});
    }
} 
