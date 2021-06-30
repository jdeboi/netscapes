import React, { useEffect } from 'react';

import './RoomDecal.css';

import { getSketchFromTitle } from '../../sketches/Sketches';

import CenterModal from '../CenterModal/CenterModal';


export default function RoomDecal(props) {

    const { ui, room, startMedia, hasLoadedRoom } = props;
    const sketch = getSketchFromTitle(room);
    

    const buttonClicked = () => {
        startMedia();
        // this.props.startComposition();
    }

    const getButtons = () => {
        return (
            <div className="center-buttons">
                <button className="standardButton primary" onClick={buttonClicked}>ok</button>
            </div>
        );
    }

    const onHide = () => {
        startMedia();
    }



    if (sketch) {
        const buttons = getButtons();
        const { title, about, year } = sketch;

        return (
            <CenterModal
                title={""}
                isHidden={hasLoadedRoom}
                onHide={onHide}
                ui={ui}
                z={2500}
                height={300}
                width={400}
                isRelative={false}
                classN="RoomDecal"
                content={
                    <div className="decal-content">
                        <div className="identify">
                            {/* <p className="" style={{ fontSize: 12, paddingBottom: 0 }}>Jenna deBoisblanc</p>
                                <p style={{ paddingBottom: 20 }}>
                                    <span style={{ fontSize: 24 }}>🇺🇸⚜️</span>
                                    <span style={{ fontSize: 12 }}>, born 1989</span>
                                </p> */}
                            <p style={{ fontSize: 20, paddingBottom: 0, fontWeight: 900 }}>
                                <span className="">{title}</span>
                            </p>
                            {/* <p style={{ fontSize: 12 }}>{year}</p> */}
                            <p style={{ fontSize: 12 }}>Jenna deBoisblanc</p>
                            <p style={{ fontSize: 12 }}>Custom Software</p>
                            <p style={{ fontSize: 12 }}>Variable Dimensions</p>

                            <p style={{ fontSize: 12 }}>{about}</p>
                        </div>

                    </div>
                }
                buttons={buttons}
            />
        );
    }


    return null;



}

