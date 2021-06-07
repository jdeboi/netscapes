import React from "react";
import Sketch from "react-p5";

let shadow;
let ui;



export default (props) => {
    //   user = props.user;
    ui = props.ui;

    const preload = (p5) => {
        const url = "https://lmd-bucket.s3.us-east-2.amazonaws.com/sketches";
        shadow = p5.loadImage(url + "/gallery/tracklights/black_shadow.png");
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

    };

    ////////////////////////////////////////////////////////////////////////
    // DRAW
    ////////////////////////////////////////////////////////////////////////
    const draw = (p5) => {

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
