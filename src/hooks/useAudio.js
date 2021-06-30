import React, { useState, useEffect } from "react";

import useSound from "use-sound";
export default function useAudio(url, initVol, isAutoPlayOn, isPageLoaded, isMainAudioOn) {

  const [volume, setVolume] = useState(initVol);


  const [play, {stop}] = useSound(url, {
    volume: volume,
    interrupt: false,
    autoplay: false,
    loop: isAutoPlayOn,
    onend: function () {
      console.log('Finished!');
    }
  });

  const playSound = () => {
    if (isPageLoaded && isMainAudioOn) {
      play();
      console.log("play?")
    }
    else {
      console.log("no", isPageLoaded,isMainAudioOn);
      stop();
    }
     
  }


  // if the audio is set to auto play
  // turn on playing when the page loads
  useEffect(() => {
    console.log("pageloadd", isPageLoaded);
    if (isPageLoaded && isAutoPlayOn)
      play(); // setPlaying(true);
    else
      stop(); //setPlaying(false);
  },
    [isPageLoaded]
  );

  // if main audio is toggled, play audio
  useEffect(() => {
    console.log("main audio", isMainAudioOn);
    if (isPageLoaded && isMainAudioOn && isAutoPlayOn) {
      play();
    }
    else
      stop();
  },
    [isMainAudioOn]
  );

  useEffect(() => {
    // Pause and clean up on unmount
    return () => {
      console.log("we stopping")
      stop();
    }
  }, []);

  return [playSound, setVolume];
};

