
import React, {useEffect} from 'react';
import Sketch from './Sketch';
import Fan from './components/Fan/Fan';
import './Infrastructure.scss';

export default function Infrastructure(props) {
    // Declare a new state variable, which we'll call "count"

   
    useEffect(
        () => {
            props.setAudioSource(window.AWS + "/infrastructure/server.mp3");
            props.setVolume(.5);
            
            return (() => {
                props.setVolume(0);
            })
        },
        []
    );

    return (
        <div className="Infrastructure Sketch" >
            <Sketch className="p5sketch" />
            <Fan x={100} y={100} w={200} />
            <Fan x={100} y={350} w={200} />

            <Fan x={100} y={350} w={200} />
            <Fan x={100} y={350} w={200} />
        </div>
    )
}