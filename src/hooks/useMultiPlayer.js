
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import useSound from "use-sound";
import { getRoomTitle } from "../components/sketches/Sketches";

export default function useAudio(audioOn, hasLoadedRoom) {

    const currentPage = getRoomTitle(useLocation().pathname);
    const [volume, setVolume] = useState(0);

    const onLoad = () => {
        console.log("test")
        playCurrentPage();
    }

    const sources = [
        {
            title: "out of site", 
            player: useSound(window.AWS + "/infrastructure/server.mp3", {
                volume: .5,
                interrupt: false,
                autoplay: false,
                preload:true,
                onload: onLoad,
                loop: true,
            })
        },
        {
            title: "mojave", 
            player: useSound(window.LMD + "/yosemite/fire.mp3", {
                volume: .5,
                interrupt: false,
                autoplay: false,
                preload:true,
                onload: onLoad,
                loop: true,
            })
        },
        {
            title: "yosemite", 
            player: useSound(window.LMD + "/yosemite/fire.mp3", {
                volume: volume,
                interrupt: false,
                autoplay: false,
                onload: onLoad,
                loop: true,
            })
        },
        {
            title: "cat 5", 
            player: useSound( window.AWS + "/hurricane/hurricane.mp3", {
                volume: .5,
                interrupt: false,
                autoplay: false,
                onload: onLoad,
                loop: true,
            })
        },
        {
            title: "hard drives on seashores", 
            player: useSound( window.LMD + "/hardDrives/seagulls.mp3", {
                volume: .5,
                interrupt: false,
                autoplay: false,
                onload: onLoad,
                loop: true,
            })
        },
    ];

    
    

    const [currentSource, setCurrentSource] = useState(sources[0])

    const setNewPage = (title) =>{
        // console.log("setting new page", title);
        stopCurrentPage();
        let nextSource = sources.find((source) => title === source.title);
        if  (nextSource &&  nextSource.player) {
            const [play, {stop}] = nextSource.player;
            stop();
        }
        setCurrentSource(nextSource);
        // console.log("nextsource", nextSource?nextSource.title:"null");
    }

    const playCurrentPage = () => {
        if (currentSource && currentSource.player) {
            const [play, {stop}] = currentSource.player;
           // only for yosemite
            setVolume(0);
            play();
            // console.log("play", currentSource.title)
        }
    }

    const stopCurrentPage = () => {
        if  (currentSource && currentSource.player) {
            const [play, {stop}] = currentSource.player;
            stop();
            // console.log("stop", currentSource.title)
        }
    }

    // if the audio is set to auto play
    // turn on playing when the page loads
    useEffect(() => {
        if (audioOn && hasLoadedRoom) {
            playCurrentPage();
        }
        else {
            stopCurrentPage();
        }
    },
    [hasLoadedRoom]
    );

    useEffect(() => {
        if (audioOn && hasLoadedRoom) {
            playCurrentPage();
        }
        else {
            stopCurrentPage();
        }
    },
    [audioOn]
    );

    useEffect(() => {
        // console.log(volume, currentSource);
    },
    [volume]
    );

    useEffect(() => {
        setNewPage(currentPage);
    },
    [currentPage]
    );


    return [setVolume];
};

