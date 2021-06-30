import React from "react";
import Sketch from "react-p5";

import Parts from './components/Parts';

let shadow;
let ui;
let dogica;
let _aryInitRot = [];
let _myObject;

// thanks to Kusakari!
// https://openprocessing.org/sketch/1117787
export default (props) => {
    //   user = props.user;
    // ui = props.ui;

    const preload = (p5) => {

        const url = "https://lmd-bucket.s3.us-east-2.amazonaws.com/sketches";
        dogica = p5.loadFont(url + '/shared/fonts/dogica.ttf');
        // shadow = p5.loadImage(url + "/gallery/tracklights/black_shadow.png");
    }

    ////////////////////////////////////////////////////////////////////////
    // INITIALIZE
    ////////////////////////////////////////////////////////////////////////
    const setup = (p5, canvasParentRef) => {
        // use parent to render the canvas in this ref
        // (without that p5 will render the canvas outside of your component)
        p5.setAttributes('premultipliedAlpha', true);
        const cnv = p5.createCanvas(p5.windowWidth, p5.windowHeight, p5.WEBGL);
        cnv.mousePressed(() => canvasPressed(p5));


        cnv.parent(canvasParentRef);
        p5.frameRate(30);
        p5.noStroke();
        for (let i = 0; i < 3; i++) {
            _aryInitRot[i] = [p5.random(2 * p5.PI), p5.random([-1, 1])];
        }

        _myObject = new Parts(150, p5);

        p5.textFont(dogica);
    };

    ////////////////////////////////////////////////////////////////////////
    // DRAW
    ////////////////////////////////////////////////////////////////////////
    const draw = (p5) => {
        // ortho(-width/2, width/2, -width/2, width/2, 0, width*2);
        // p5.background(200);
        p5.clear();
        p5.ambientLight(60);
        let ang = _aryInitRot[1][0] + p5.frameCount / 100;
        p5.directionalLight(255, 255, 255, -p5.sin(ang), 1, -p5.cos(ang));
        let c = (p5.height / 2) / p5.tan(p5.PI / 6);
        p5.camera(c * p5.sin(ang), 0, c * p5.cos(ang), 0, 0, 0, 0, 1, 0);
        p5.rotateZ(p5.PI / 4);

        _myObject.update(p5);

        // drawText(p5);

        checkDimensions(p5);
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

    const canvasPressed = (p5) => {
    }


    const mouseReleased = (p5) => {
    }

    const windowResized = (p5) => {
        p5.resizeCanvas(p5.windowWidth, p5.windowHeight);
    }

    const doubleClicked = (p5) => {

    }




    return <Sketch preload={preload} setup={setup} draw={draw} windowResized={windowResized} keyPressed={keyPressed} mouseReleased={mouseReleased} mouseDragged={mouseDragged} doubleClicked={doubleClicked} />;
};
