
import React, { FunctionComponent, useState, useEffect } from 'react';
import Sketch from './HurricaneSketch';
import './Hurricane.scss';
// import useAudio from '../../../hooks/useAudio';

export default function Hurricane(props) {

    // hooks
    // const [playing, setPlaying, restartPlay, toggle, setVolume] = useAudio(window.AWS + "/hurricane/hurricane.mp3", .5);


    useEffect(
        () => {
            props.setAudioSource(window.AWS + "/hurricane/hurricane.mp3");
            props.setVolume(.5);
            
            return (() => {
                props.setVolume(0);
            })
        },
        []
    );

    return (
        <div className="Hurricane Sketch">


            <Sketch className="p5sketch" />


        </div>
    )
}