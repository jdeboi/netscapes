
import React, { useState, useEffect } from 'react';
import './App.scss';
import { Route, useLocation } from 'react-router-dom';

import Header from '../components/shared/Header/Header';

// sketches
import { getUrl, getRoomTitle } from '../components/sketches/Sketches';
import Yosemite from '../components/sketches/Yosemite/Yosemite';
import HardDrives from '../components/sketches/HardDrives/HardDrives';
import JungleGyms from '../components/sketches/JungleGyms/JungleGyms';
import Hurricane from '../components/sketches/Hurricane/Hurricane';
import Mojave from '../components/sketches/Mojave/Mojave';
import Infrastructure from '../components/sketches/Infrastructure/Infrastructure';
import Mine from '../components/sketches/Mine/Mine';
import Wallpaper from '../components/sketches/Wallpaper/Wallpaper';
// import Beached from '../components/sketches/Beached/Beached';
// import Melt from '../components/sketches/Melt/Melt';

import Home from '../components/sketches/Home/Home';

// import NotFound from '../components/shared/NotFound/NotFound';

// other components
import About from '../components/About/About';
import FPSStats from "react-fps-stats";
import RoomDecal from '../components/shared/RoomDecal/RoomDecal';

// hooks
import useDimensions from '../hooks/useDimensions';
// import useSound from 'use-sound';
import useMultiPlayer from '../hooks/useMultiPlayer';

window.AWS = "https://netscapes.s3.us-east-2.amazonaws.com";
window.LMD = "https://lmd-bucket.s3.us-east-2.amazonaws.com/sketches";


function App(props) {

  const currentPage = getRoomTitle(useLocation().pathname);
  const ui = useDimensions();
  const [hasLoadedRoom, setLoadedRoom] = useState(false);
  const [audioOn, setAudioOn] = useState(true);

  const [setVolume] = useMultiPlayer(audioOn, hasLoadedRoom);


  useEffect(
    () => {
      return () => {
        // pause();
      }
    },
    [ui]
  );


   // if we change audio or the room loads, play
  //  useEffect(
  //   () => {
  //     if (hasLoadedRoom && audioOn) {
  //       play();
  //       // console.log("play", audioSource, volume, hasLoadedRoom, audioOn)
  //     }
  //     else {
  //       pause();
  //       // console.log("stop", audioSource, volume, hasLoadedRoom, audioOn)
  //     }  
  //   },
  //   [audioOn, hasLoadedRoom, audioSource]
  // );


  // if there's a new page, reset the audio
  useEffect(() => {
    // setAudioSource("");
    setLoadedRoom(false);
    // pause();
  },
    [currentPage]
  );


  const sketchProps = {
    ui,
    hasLoadedRoom,
    audioOn,
    setVolume,
    // setAudioSource,
    currentPage
  }


  return (
    <div className="App">
      <Header
        ui={ui}
        currentPage={currentPage}
        isMenuOn={true}
        audioOn={audioOn}
        toggleAudio={() => setAudioOn(v => !v)}
      />

      {/* sketches */}
      <Route exact path="/" render={() => (<Mine {...sketchProps}/>)} />
      <Route exact path={getUrl("yosemite")} render={() => (<Yosemite {...sketchProps} />)} />
      <Route exact path={getUrl("hard")} render={() => (<HardDrives {...sketchProps} />)} />
      <Route exact path={getUrl("jungle")} render={() => (<JungleGyms {...sketchProps} />)} />
      <Route exact path={getUrl("cat")} render={() => (<Hurricane {...sketchProps} />)} />
      <Route exact path={getUrl("mojave")} render={() => (<Mojave {...sketchProps} />)} />
      <Route exact path={getUrl("mine")} render={() => (<Mine {...sketchProps} />)} />
      <Route exact path={getUrl("out")} render={() => (<Infrastructure {...sketchProps} />)} />
      {/* <Route exact path={getUrl("beached")} component={Beached} /> */}
      <Route exact path={getUrl("roomba")} render={() => (<Wallpaper {...sketchProps} />)} />

      <Route exact path="/home" component={Home} />
      <Route exact path="/about" component={About} />

      {/* other components */}
      <RoomDecal
        startMedia={() => setLoadedRoom(true)}
        hasLoadedRoom={hasLoadedRoom}
        ui={ui}
        room={currentPage}
      />
      {/* {<FPSStats top={window.innerHeight - 255} left={10} />} */}

    </div>
  );
}


export default App;

