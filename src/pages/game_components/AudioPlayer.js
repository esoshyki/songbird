import React from 'react';
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
	root: {
		background: 'none'
	}
})

export default function AudioPlayer(props) {
		const classes = useStyles({})

    return (
        <div className='audio-player'>
            <audio className={classes.root} controls src={props.audio} />
        </div>
    )
}