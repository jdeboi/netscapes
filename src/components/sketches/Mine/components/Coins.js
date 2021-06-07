import React, { useState, useEffect } from 'react';
import Frame from '../../../shared/Frame/Frame';



export default function Coins(props) {

    const space = props.coinSpace;
    const ids = [
        {x: -props.w - space, y: 0},
        {x: -props.w - space, y: props.h + space + 26},
        // {x: -props.w - space, y: (props.h + space + 26)*2},
        // {x: -props.w - space, y: (props.h + space + 26)*3},

        {x: props.totalW - props.w, y: 0},
        {x: props.totalW + space, y: 0},

        {x: props.totalW + space, y: props.totalH -props.h - 26},

        {x: 530*.7 - props.w - space, y: props.totalH-props.h - 26},
        {x: 530*.7 - (props.w + space)*2, y: props.totalH-props.h - 26},
    ]

    return (
        <div className="Coins">
            {
                ids.map((val, i) => {
                    return (
                        <Frame
                            title=""
                            key={i}
                            windowStyle={{ background: "transparent" }}
                            content={
                                <div className="Coin" />
                            }
                            width={props.w}
                            height={props.w}
                            x={props.x + val.x}
                            y={props.y+ val.y}
                        />
                    )
                }
                )
            }
        </div>
    )

}

