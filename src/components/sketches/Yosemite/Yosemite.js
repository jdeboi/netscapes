import React, { useState, useEffect } from 'react';
import './Yosemite.scss';

// components

import Frame from '../../shared/Frame/Frame';
import DesktopIcon from '../../shared/DesktopIcon/DesktopIcon';

// hooks

// import useAudio from '../../../hooks/useAudio';
import useSound from 'use-sound';
import useInterval from '../../../hooks/useInterval';

// helpers
import { mapVal, constrain, randomInRange } from '../../shared/Helpers/Helpers';


export default function Yosemite(props) {

  const getPopUps = () => {
    const { ui } = props;

    let _numPops = constrain(ui.width / 30, 20, 60);

    let _popups = [];
    for (let i = 0; i < _numPops; i++) {
      let w = 80;//Math.floor(maxS);
      let x = randomInRange(0, ui.width - w);
      let bottom = ui.contentH;
      let yMax = bottom - w - 30;
      let yMin = 60;
      let y = randomInRange(yMin, yMax);
      let z = i;
      let isHidden = true;
      let classN = "";
      _popups.push({ x, y, z, w, isHidden, classN });
    }
    return _popups;
  }

  const [numPops, setNumPops] = useState(0);
  const [popTime, setPopTime] = useState(3000);
  const [numFrames, setNumFrames] = useState(0);
  const [popW, setPopW] = useState(80);
  const [popups, setPopUps] = useState(getPopUps());


  // const start = new Date();
  // const [hasStarted, setHasStarted] = useState(false);

  // hooks


  useEffect(() => {
    props.setVolume(0);

  },
    [])



  useInterval(
    () => {
      popUp();
    },
    props.hasLoadedRoom ? popTime : null,
  )




  const popUp = () => {

    const { ui } = props;

    setPopTime(Math.max(popTime - 200, 300))
    setNumPops((numPops + 1) % popups.length);
    setPopW(Math.min(popW + 10, 3000));

    setPopUps(
      popups.map((pop, i) => {
        if (i === numPops) {
          let p = { ...pop };
          p.w = popW;
          p.isHidden = false;
          p.x = randomInRange(0, ui.width - popW);
          p.y = randomInRange(60, ui.contentH - popW - 30);
          return p;
        }
        return pop;
      }
      ));

    let vol = mapVal(popW, 80, 300, 0, 1);
    vol = constrain(vol, 0, 1);
    props.setVolume(vol);

  }

  const onHide = (id) => {

    setPopUps(
      popups.map((pop, i) => {
        if (i === id) {
          let p = { ...pop };
          p.isHidden = true;
          return p;
        }
        return pop;
      }
      ));
  }


  const onDblClick = (i) => {
    console.log(i);
    setNumFrames(numFrames + 1);
  }

  const clicked = (id) => {
    setNumFrames(numFrames + 1);
  }

  const getFrames = () => {
    const { ui } = props;

    let frames = [];
    for (let i = 0; i < numFrames; i++) {
      frames[i] = i;
    }

    return (
      <div className="openedFrames">
        {frames.map((frame, i) => {
          let framesW = 20;
          let startX = 100;
          if (ui.contentW < 500) {
            framesW = 5;
            startX = 20;
          }

          let direction = Math.floor(frame / framesW);

          let x = 0;
          if (direction % 2 === 0)
            x = startX + frame % framesW * 20;
          else
            x = startX + framesW * 20 - frame % framesW * 20;

          return (
            <Frame
              handle={".App"}
              key={frame}
              // bounded={true}
              x={x}
              y={100 + frame * 20}
              width={300}
              height={150}
              title={""}
              windowStyle={{ background: "white" }}
              content={
                <div className="burned-folders">
                  {getFolderList(["backup_" + (i + 1)], ui.isMobile, frame)}
                </div>
              }
            />
          )
        })}
      </div>
    )

  }


  const getFolderList = (titles, isMobile, frame) => {
    return (

      titles.map((title, i) => {
        if (isMobile) {
          return (
            <div className="folder-item" key={i} onClick={(event) => clicked(frame)}>
              <div className="folder-img" />
              <div className="folder-title">{title}</div>
            </div>
          )
        }
        return (
          <div className="folder-item" key={i} onDoubleClick={(event) => clicked(frame)}>
            <div className="folder-img" />

            <div className="folder-title">{title}</div>
          </div>

        )
      })

    )

  }

  var box = { x: 100, y: 100, w: 300, h: 200 };
  const { ui } = props;

  return (
    <React.Fragment>
      <div className="Sketch Yosemite">

        {
          popups.map((pop, i) => {
            // console.log(i);
            return (
              <Frame
                windowStyle={{ background: "rgba(0, 0, 0, .3)" }}
                content={
                  <div className="fyre" ></div>
                }
                key={i}
                onHide={() => onHide(i)}
                isHidden={pop.isHidden}
                bounded={false}
                width={pop.w}
                height={pop.w}
                className="fire"
                x={pop.x}
                y={pop.y}
                z={i === numPops ? popups.length : i}
              />
            );

          })
        }
        <DesktopIcon
          disableWindow={true}
          onDblClick={() => onDblClick(0)}
          x={ui.contentW - 150}
          y={100}
          width={83}
          height={90}
          box={box}
          title={"home"}
          content={
            <img alt="fire window" src={window.LMD + "/shared/homeicon.png"} width={80} height={80} />
          }
          frameContent={
            <div className="test">home</div>
          }
        />

        {getFrames()}

      </div>
    </React.Fragment>
  )
}




