
import React from 'react';
import Sketch from './Sketch';
import Fan from './components/Fan/Fan';
import './Infrastructure.scss';

export default function Infrastructure() {
    // Declare a new state variable, which we'll call "count"

   
    return (
        <div className="Infrastructure Sketch" >
            <Sketch className="p5sketch" />
            <Fan x={100} y={100} w={200} />
            <Fan x={100} y={350} w={200} />
        </div>
    )
}