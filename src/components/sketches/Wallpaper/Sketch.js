import React from "react";
import Sketch from "react-p5";
import Roomba from './components/Roomba';


let roombas = [];
let roombaImg;
let txtImg;
let folder;
let dogica;

export default (props) => {


    const preload = (p5) => {
        const url = "https://lmd-bucket.s3.us-east-2.amazonaws.com/sketches";
        const netURL = "https://netscapes.s3.us-east-2.amazonaws.com/roomba";
        txtImg = p5.loadImage(url + "/waveforms/txt.png");
        folder = p5.loadImage(url + "/loop/folder.png");
        roombaImg = p5.loadImage(netURL + "/roomba.png");

        dogica = p5.loadFont(url + '/shared/fonts/dogica.ttf');
    }

    ////////////////////////////////////////////////////////////////////////
    // INITIALIZE
    ////////////////////////////////////////////////////////////////////////
    const setup = (p5, canvasParentRef) => {
        // use parent to render the canvas in this ref
        // (without that p5 will render the canvas outside of your component)

        const cnv = p5.createCanvas(p5.windowWidth, p5.windowHeight);
        cnv.parent(canvasParentRef);
        cnv.mousePressed(() => canvasPressed(p5));

        for (let i = 0; i < 6; i++) {
            roombas.push(new Roomba(i, roombaImg, p5));
        }

        p5.textFont(dogica);
    };

    ////////////////////////////////////////////////////////////////////////
    // DRAW
    ////////////////////////////////////////////////////////////////////////
    const draw = (p5) => {
        // p5.background(0, 255, 0);
       randomTxtFiles(p5);
       

        displayRoombas(p5);

        checkDimensions(p5);
    }

    const displayRoombas = (p5) => {
        for (const r of roombas) {
            r.display(p5);
            r.update(roombas, p5);
        }
    }

    const randomTxtFiles = (p5) => {
        if (Math.random() < .4) {
            // p5.noErase();
            // let factor = p5.random(.6, 1);
            let factor = 1;
            const x = Math.random()*p5.windowWidth;
            const y = Math.random()*p5.windowHeight;

            // if (Math.random() < .5)
            // p5.image(folder, x, y, 80, 60);
            // else
            p5.image(txtImg, x, y, 80*factor, 80*factor);
            // p5.fill(255);
            // p5.stroke(0);
            // p5.textSize(12);
            // let str = "abstract";
            // p5.text(str, x + 80 / 2 - p5.textWidth(str) / 2, y + 80 + 18);
        }
    }

    const checkDimensions = (p5) => {
        if (p5.windowWidth !== window.innerWidth || p5.windowHeight !== window.innerHeight) {
            p5.windowWidth = window.innerWidth;
            p5.windowHeight = window.innerHeight;
            windowResized(p5);
        }
    }



    const mouseDragged = (p5) => {
    }

    const keyPressed = (p5) => {

    }

    const vacuum = (p5) => {
        for (const r of roombas) {
            r.vacuum(p5);
        }
    }

 

    const canvasPressed = (p5) => {
        for (const r of roombas) {
            r.checkMouse();
        }
    }


    const mouseReleased = (p5) => {
        for (const r of roombas) {
            r.endDrag();
        }
    }

    const windowResized = (p5) => {
        p5.resizeCanvas(p5.windowWidth, p5.windowHeight);
    }

    const doubleClicked = (p5) => {
        for (const r of roombas) {
            // r.checkDoubleClicked(p5);
        }
    }



    return <Sketch preload={preload} setup={setup} draw={draw} windowResized={windowResized} keyPressed={keyPressed} mouseReleased={mouseReleased} mouseDragged={mouseDragged} doubleClicked={doubleClicked} />;
};
