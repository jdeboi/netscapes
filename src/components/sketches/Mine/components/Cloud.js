import React, { useState, useEffect } from 'react';
// import Frame from '../../../shared/Frame/Frame';



export default function Cloud(props) {
    const [x, setX] = useState(Math.random()*window.innerWidth);


    return (
        <div className="Cloud" style={{
            top: props.y,
            left: x,
            position: "absolute"
        }}>
        </div>
    )

}

