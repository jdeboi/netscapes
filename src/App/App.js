
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
import Beached from '../components/sketches/Beached/Beached';
import Mojave from '../components/sketches/Mojave/Mojave';
import Infrastructure from '../components/sketches/Infrastructure/Infrastructure';
import Mine from '../components/sketches/Mine/Mine';

// import NotFound from '../components/shared/NotFound/NotFound';

// other components

import FPSStats from "react-fps-stats";
import RoomDecal from '../components/shared/RoomDecal/RoomDecal';
import useDimensions from '../hooks/useDimensions';


window.AWS = "https://lmd-bucket.s3.us-east-2.amazonaws.com/sketches";


function App(props) {

  // const currentPage = useLocation();
  // const currentPage = "yosemite";
  const currentPage = getRoomTitle(useLocation().pathname);
  const ui = useDimensions();
  const [hasLoadedRoom, setLoadedRoom] = useState(false);


  useEffect(
    () => {
      return () => {
      }
    },
    [ui, hasLoadedRoom]
  );


  return (
    <div className="App">
      <Header ui={ui} currentPage={currentPage} isMenuOn={true} />

      {/* sketches */}
      <Route exact path="/" component={Yosemite} />
      <Route exact path={getUrl("yosemite")} component={Yosemite} />
      <Route exact path={getUrl("hard")} component={HardDrives} />
      <Route exact path={getUrl("jungle")} render={() => (<JungleGyms />)} />
      <Route exact path={getUrl("cat")} component={Hurricane} />
      <Route exact path="/beached" component={Beached} />
      <Route exact path={getUrl("mojave")} component={Mojave} />
      <Route exact path={getUrl("mine")} component={Mine} />
      <Route exact path={getUrl("out")} component={Infrastructure} />

      {/* other components */}
      <RoomDecal
        resetLoaded={() => setLoadedRoom(false)}
        startMedia={() => setLoadedRoom(true)}
        hasLoadedRoom={hasLoadedRoom}
        ui={ui}
        room={currentPage}
      />
      {<FPSStats top={window.innerHeight - 255} left={10} />}

    </div>
  );
}


export default App;

