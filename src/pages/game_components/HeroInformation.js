import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AudioPlayer from './AudioPlayer';

const useStyles = makeStyles({
    root: {
      width: '100%',
      display: 'flex',
      flexWrap: 'wrap',
      flexDirection: 'row'
    },
    image: {
        float: 'left',
        marginRight: '20px',
        height: '100px',
        width: '100px',
    },
    article: {
        textAlign: 'justify'
    },
    cardHeader: {
        display: 'flex',
        flexDirection: 'column',
        padding: '5px 20px',
        alignItems: 'center'
    },
    audioPlayer: {
        margin: '20px 0'
    },
    title: {
        lineHeight: '0',
        fontSize: '1.7rem',
        color: 'wheat'
    }
})


export default function HeroInformation(props) {

    const classes = useStyles({})
    if (props.remove && props.notFirst) {
        return null
    } else {
    return(
      <div className='hero-information'>
          <h3 className={classes.title}>{props.name}</h3>
          <div className={classes.cardHeader}>
              <img src={props.image} alt={props.name} className={classes.image}/>
              <AudioPlayer audio={props.sound} />
          </div>
          <article>
              {props.description}
          </article>
        </div>
    )
  }
}