import React from 'react';
import './AudioPlayer.sass';

export default function AudioPlayer(props) {
    return (
        <div className='audio-player'>
            <audio controls>
                <source src={props.audio} />
            </audio>
        </div>
    )
}