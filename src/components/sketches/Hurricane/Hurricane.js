
import React, { FunctionComponent, useState, useEffect } from 'react';
import Sketch from './HurricaneSketch';
import './Hurricane.scss';
// import useAudio from '../../../hooks/useAudio';

export default function Hurricane(props) {

   

    return (
        <div className="Hurricane Sketch">
            <Sketch className="p5sketch" />
        </div>
    )
}