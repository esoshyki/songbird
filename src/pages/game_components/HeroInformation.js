import React from 'react';
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
    image: {
        float: 'left',
        marginRight: '20px'
    },
    article: {
        textAlign: 'justify'
    }
})


export default function HeroInformation(props) {

    const classes = useStyles({})

    return(
        <div className='hero-information'>
            <h3>{props.name}</h3>
            <img src={props.image} alt={props.name} className={classes.image}/>
            <article>
                {props.description}
            </article>
        </div>
    )
}