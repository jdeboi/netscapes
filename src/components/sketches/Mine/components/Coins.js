import React, { useState, useEffect } from 'react';
import Frame from '../../../shared/Frame/Frame';



export default function Coins({ ui, x, pitX, vidW, y, w, h, totalW, totalH, coinSpace, playSound }) {

    const space = coinSpace;
    const idsLG = [
        { x: -w - space, y: 0 },
        { x: -w - space, y: h + space + 26 },
        // {x: -w - space, y: (h + space + 26)*2},
        // {x: -w - space, y: (h + space + 26)*3},

        { x: totalW - w * 3 - space * 2, y: 0 },
        { x: totalW - w * 2 - space, y: 0 },

        { x: totalW - w * 2 - space, y: totalH - h - 26 },

        { x: pitX - x - w - space, y: totalH - h - 26 },
        { x: pitX - x - (w + space) * 2, y: totalH - h - 26 },
    ];

    const idsSM = [
        { x: vidW - w, y: -h - 26 - space },
        { x: vidW + space, y: 0 },
        { x: vidW + space, y: -h - 26 - space },

        // {x: -w - space, y: (h + space + 26)*2},
        // {x: -w - space, y: (h + space + 26)*3},

        { x: totalW - w, y: 0 },
        { x: totalW + space, y: 0 },

        { x: totalW + space, y: totalH - h - 26 },

        { x: pitX - x - w - space, y: totalH - h - 26 },
        { x: pitX - x - (w + space) * 2, y: totalH - h - 26 },
    ]

    // TODO? current this is the same as small
    const idsXSM = [
        { x: vidW - w, y: -h - 26 - space },
        { x: vidW + space, y: 0 },
        { x: vidW + space, y: -h - 26 - space },

        // {x: -w - space, y: (h + space + 26)*2},
        // {x: -w - space, y: (h + space + 26)*3},

        { x: totalW - w, y: 0 },
        { x: totalW + space, y: 0 },

        { x: totalW + space, y: totalH - h - 26 },

        { x: pitX - x - w - space, y: totalH - h - 26 },
        { x: pitX - x - (w + space) * 2, y: totalH - h - 26 },
    ]

    let ids;
    if (ui.width < 710)
        ids = idsXSM;
    else if (ui.width < 1100)
        ids = idsSM;
    else
        ids = idsLG;

    
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
                                <div className="Coin" onClick={playSound} />
                            }
                            width={w}
                            height={w}
                            x={x + val.x}
                            y={y + val.y}
                        />
                    )
                }
                )
            }
        </div>
    )

}

