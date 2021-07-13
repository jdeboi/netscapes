


import React from 'react';
import Candle from './Candle';

export default function Candles({ ui, x, y, w, h }) {

    const startCandleY = y + h * .65;
    const startCandleX = -60;
    const candleDY = 50;
    const candleDX = 70;
    const candles = {
        y0: startCandleY,
        y1: startCandleY + candleDY,
        y2: startCandleY + candleDY * 2,
        w: 80,
        h: 90
    }

    if (ui.contentW < w + candles.w * 2) {
        return null;
    }

    return (
        <React.Fragment>
            <Candle x={x - candles.w - startCandleX - candleDX * 2} y={candles.y0} w={candles.w} h={90} />
            <Candle x={x + w + startCandleX + candleDX * 2} y={candles.y0} w={candles.w} h={90} />

            <Candle x={x - candles.w - startCandleX - candleDX} y={candles.y1} w={candles.w} h={90} />
            <Candle x={x + w + startCandleX + candleDX} y={candles.y1} w={candles.w} h={90} />


            <Candle x={x - candles.w - startCandleX} y={candles.y2} w={candles.w} h={90} />
            <Candle x={x + w + startCandleX} y={candles.y2} w={candles.w} h={90} />
        </React.Fragment>

    )
}