import React, { useState, useEffect } from 'react';
import Frame from '../../../shared/Frame/Frame';



export default function StackedMine(props) {

    const ids = new Array(10).fill(0);
    const pitStyle = {
        backgroundSize: 'cover',
        width: "100%",
        height: "100%"
    }
    return (
        <div className="StackedMine">
            {ids.map((val, i) => {
                let img = (i % 2 === 0) ? "pit" : "copper";
                pitStyle.backgroundImage = `url(${process.env.PUBLIC_URL}/local_images/mine/${img}.jpeg)`;
                const sty = {...pitStyle};
                const dv = 30;
                const maxW = ids.length*dv + 100;
                const w = maxW - i * dv;
                const h = w * .8;
                const x = props.x + dv/2 * i;
                const y = props.y  + (dv/2 + 26) * i;
                return (
                    <Frame
                        title=""
                        key={i}
                        content={
                            <div className="Pit" style={sty} />
                        }
                        width={w}
                        height={h}
                        x={x}
                        y={y}
                    />
                )
            })}
        </div>
    )
}

