
import React, { useState, useEffect } from 'react';
import './Fan.scss';
import Frame from '../../../../shared/Frame/Frame';
import { mapVal, constrain } from '../../../../shared/Helpers/Helpers';

export default function Fan({ isMobile, w, x, y, mousePosition }) {
    const [angle, setFanAngle] = useState(0);
    const [velocity, setFanVelocity] = useState(0);

    useEffect(() => {
        const maxVel = .3;
        if (!isMobile && mousePosition) {

            const dx = mousePosition.x - (x + w / 2);
            const dy = mousePosition.y - (y + 26 + w / 2);
            // const r = Math.sqrt(dx * dx + dy * dy);
            let vel = mapVal(dx, -500, 500, -maxVel, maxVel);
            vel = constrain(vel, -maxVel, maxVel);

            setFanVelocity(vel);
            setFanAngle(angle => angle + velocity);
        }
        else if (isMobile) {
            setFanVelocity(maxVel); 
        }


    }, [mousePosition]);

    // useEffect(() => {
    //    if (quadrant === 0) {
    //     if (id === 0 || id == )
    //    }


    // }, [quadrant]);

    useEffect(() => {
        const interval = setInterval(() => {
            // setFanVelocity(velocity => {
            //     if (velocity <= .01)
            //         return 0;
            //     return velocity;
            // });
            setFanAngle(angle => {
                return angle + velocity
            });
                
        }, 20);
        return () => clearInterval(interval);
    }, [angle, velocity, isMobile]);

    // console.log(angle, velocity);
    const bladesStyle = {
        transform: `rotate(${angle / Math.PI * 180}deg)`,
        transformOrigin: "center center"
    }

    return (
        <Frame
            title=""
            content={
                <div className="Fan">
                    <div className="fanbase"></div>
                    <div className="blades" style={bladesStyle}></div>
                </div>
            }
            width={w}
            height={w}
            x={x}
            y={y}
        />
    )
}