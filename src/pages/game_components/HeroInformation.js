import React from 'react';
import './HeroInformation.sass';

export default function HeroInformation(props) {
    return(
        <div className='hero-information'>
            <h3>{props.name}</h3>
            <img src={props.image} alt={props.name}/>
            <article>
                {props.description}
            </article>
        </div>
    )
}