
import React, { useState, useEffect } from 'react';
import './Fan.scss';
import Frame from '../../../../shared/Frame/Frame';

export default function Fan(props) {
    const [angle, setFanAngle] = useState(0);
    const [velocity, setFanVelocity] = useState(.3);
    const [acceleration, setFanAcceleration] = useState(-.001);

    useEffect(() => {
        const interval = setInterval(() => {
            setFanVelocity(velocity => {
                if (velocity <= .01)
                    return 0;
                return velocity - .001;
            });
            setFanAngle(angle => {
                return angle + velocity
            });
        }, 30);
        return () => clearInterval(interval);
    }, [angle, velocity]);



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
            width={props.w}
            height={props.w}
            x={props.x}
            y={props.y}
        />
    )
}