
import React, { useEffect } from 'react';
import Sketch from './Sketch';
import Frame from '../../shared/Frame/Frame';
import Drapes from './components/Drapes/Drapes';

import './Mojave.scss';

export default function Mojave({ hasLoadedRoom, ui }) {

    let vidRef = React.createRef();
    const netURL = "https://netscapes.s3.us-east-2.amazonaws.com/mojave";

    useEffect(() => {
        // video starts  playing if you've already loaded the page once
        // dunno why
        if (hasLoadedRoom) {
            if (vidRef.current)
                vidRef.current.play();
        }

        return (() => {

        })
    }, [hasLoadedRoom])

    const vw = Math.min(480, ui.contentW - 20);
    const vid = {
        w: vw,
        h: 296 * (vw/480)
    }
    vid.x = (ui.contentW - vid.w) / 2;
    vid.y = (ui.contentH - vid.h - 26) / 2;

    return (
        <div className="Mojave Sketch">


            <Sketch className="p5sketch" ui={ui} />
            <Drapes ui={ui} />
            <Frame title={""} content={
                <a href="https://giphy.com/gifs/weed-blunt-elon-musk-2Y8Iq3xe121Ba3hUAM" target="_blank" rel="noopener noreferrer">
                    <video
                        ref={vidRef}
                        width={vid.w}
                        height={vid.h}
                        loop
                        playsInline
                        muted
                    >
                        <source src={netURL+ "/elon.mp4"} type="video/mp4"></source>
                    </video>
                </a>
            }
                width={vid.w}
                height={vid.h}
                x={vid.x}
                y={vid.y}
            />
        </div>
    )
}