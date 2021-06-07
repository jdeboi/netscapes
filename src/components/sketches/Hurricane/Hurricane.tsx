// import useState next to FunctionComponent
import React, { FunctionComponent, useState } from 'react';
import FrameSimple from '../../shared/Frame/FrameSimple';
import Sketch from './HurricaneSketch';
import './Hurricane.scss';

export default function Hurricane() {
    // const [position, setPosition] = useState({x: 0, y: 0});

    return (
        <div className="Hurricane Sketch">

            {/* <FrameSimple
                windowStyle={{ background: "transparent" }}
                title=""
                content={
                    <img src={process.env.PUBLIC_URL + "/local_images/hurricane.png"} width="100%" height="100%" />
                }
                width={200} 
                height={200} 
                px={10} 
                py={100}
            /> */}
             <Sketch className="p5sketch" />


        </div>
    )
}