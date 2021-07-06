
import React from 'react';
import './Drapes.scss';

export default ({ ui }) => {

    const hOG = 741;
    const wOG = 631;

    const drapesStyle = {
        height: Math.min(hOG, ui.contentH - 30)
    }

    drapesStyle.width = wOG * hOG / drapesStyle.height;
    drapesStyle.top = (ui.contentH - drapesStyle.height - 26) / 2;
    drapesStyle.left = (ui.contentW - drapesStyle.width) / 2;

    return (
        <div className="Drapes" style={drapesStyle} />
    )

}