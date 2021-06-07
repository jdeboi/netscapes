import React, { useState, useEffect } from 'react';
import Frame from '../../../shared/Frame/Frame';



export default function Dune(props) {

    const[isDark, setDark] = useState(false);

    let style={
        position: "absolute",
        top: props.y,
        left: props.x,
        width:props.w,
        height: props.h
    }

    return (
        <div 
            className={"Dune" + (isDark?" dark": "")}
            style={style}
            onMouseLeave={() => setDark(isDark => !isDark)}
        />
    )



}

