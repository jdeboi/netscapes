
import React, { useEffect, useState } from 'react';
import Sketch from './Sketch';
import Fan from './components/Fan/Fan';
import './Infrastructure.scss';

import { constrain, mapVal } from '../../shared/Helpers/Helpers';

export default function Infrastructure({ ui, setAudioSource, setVolume }) {
    // Declare a new state variable, which we'll call "count"

    const [mousePosition, setMousePosition] = useState({
        x: 0,
        y: 0
    })
    const [mouseQuadrant, setMouseQuadrant] = useState(0)

  

    const handleMouseMove = (e) => {
        setMousePosition({ x: e.pageX, y: e.pageY });

        if (e.pageX < ui.contentW / 2) {
            // 1 0
            // 2 3
            if (e.pageX < ui.contentH / 2)
                setMouseQuadrant(0);
            else
                setMouseQuadrant(2);

        }
        else {
            if (e.pageX < ui.contentH / 2)
                setMouseQuadrant(1);
            else
                setMouseQuadrant(3);
        }
       
    }



    const getMobile = () => {
        let dim = Math.min(ui.contentW, ui.contentH);
        dim -= 100;
        dim = Math.max(dim, 100);
        return (
            <Fan x={(ui.contentW - dim) / 2} y={(ui.contentH - dim - 26) / 2} w={dim} isMobile={ui.isMobile} />
        )
    }

    const getDesktop = () => {
        let w = mapVal(ui.contentW, 500, 2500, 100, 400);
        w = constrain(w, 100, 400);
        const sep = .1 * w;

      
        const fanParams = {isMobile: ui.isMobile, mousePosition, mouseQuadrant, w}
        return (
            <React.Fragment>
                <Fan id={0} x={ui.width / 2 - sep - w} y={ui.height / 2 - 26 - w - sep} {...fanParams} />
                <Fan id={2} x={ui.width / 2 - sep - w} y={ui.height / 2 + sep} w={w} {...fanParams} />
                <Fan id={3} x={ui.width / 2 + sep} y={ui.height / 2 - 26 - w - sep} {...fanParams} />
                <Fan id={1} x={ui.width / 2 + sep} y={ui.height / 2 + sep} {...fanParams} />
            </React.Fragment>
        )
    }

    return (
        <div className="Infrastructure Sketch" onMouseMove={handleMouseMove}>
            <Sketch className="p5sketch" />

            {ui.contentW < 500 ? getMobile() : getDesktop()}
        </div>
    )


}