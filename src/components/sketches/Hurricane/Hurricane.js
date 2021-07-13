
import React, { FunctionComponent, useState, useEffect } from 'react';
import Sketch from './HurricaneSketch';
import './Hurricane.scss';

export default function Hurricane(props) {

   

    return (
        <div className="Hurricane Sketch">
            <Sketch className="p5sketch" />
        </div>
    )
}