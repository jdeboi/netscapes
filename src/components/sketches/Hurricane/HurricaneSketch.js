import React from "react";
import Sketch from "react-p5";
import Boid from './components/Boid/Boid';
import Hurricane from "./components/Hurricane";

// let hurricaneImg;
let hurricane;
let boids = [];
let dogica;

let beach;
let beachGraphics;

let boidImgs = [];
let waterGif;

export default (props) => {


    const preload = (p5) => {
        const url = "https://lmd-bucket.s3.us-east-2.amazonaws.com/sketches";
        dogica = p5.loadFont(url + '/shared/fonts/dogica.ttf');

        boidImgs[0] = p5.loadImage("https://lmd-bucket.s3.us-east-2.amazonaws.com/sketches/waveforms/txt.png")
        boidImgs[1] = p5.loadImage("https://lmd-bucket.s3.us-east-2.amazonaws.com/sketches/loop/folder.png");
        beach = p5.loadImage("/netscapes/local_images/hurricane/beach.jpeg");

        waterGif = p5.loadGif("/netscapes/local_images/hurricane/water5.gif"); //not sure why this one has a cors issue

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

        hurricane = new Hurricane(p5);

        setBeachGraphics(p5);

        for (let i = 0; i < 20; i++) {
            boids[i] = new Boid(i, hurricane.getPos(), boidImgs, p5);
        }



        p5.textFont(dogica);

    };

    ////////////////////////////////////////////////////////////////////////
    // DRAW
    ////////////////////////////////////////////////////////////////////////
    const draw = (p5) => {
        p5.noErase();
        p5.colorMode(p5.HSB, 255);
        // p5.clear();
        // let bkDim = getCenterCoverDim(p5, bkImg.width, bkImg.height);
        // p5.image(bkImg, bkDim.x, bkDim.y, bkDim.w, bkDim.h);
        p5.background(100, 255, 100, 6);
        p5.image(beachGraphics, 0, 0);



        // displayFlowField(p5);

        // const {w, h, x, y} = getCoverBackground(beach, 1, p5);
        // p5.image(beach, x, y, w, h);


        for (let i = boids.length - 1; i >= 0; i--) {
            let boid = boids[i];
            if (hurricane.isVisible())
                boid.update(hurricane.getPos(), p5);
            boid.display(p5);
        }

        hurricane.display(p5);
        hurricane.update(p5);

        p5.erase(10, 10);
        p5.rect(0, 0, p5.windowWidth, p5.windowHeight)
    }



    const mouseDragged = (p5) => {
    }

    const keyPressed = (p5) => {

    }

    const canvasPressed = (p5) => {
        hurricane.checkMouse();

        for (const boid of boids) {
            boid.checkMouse();
        }
    }


    const mouseReleased = (p5) => {
        hurricane.endDrag();
        for (const boid of boids) {
            boid.endDrag();
        }
    }

    const windowResized = (p5) => {
        p5.resizeCanvas(p5.windowWidth, p5.windowHeight);
        setBeachGraphics(p5);

    }

    const doubleClicked = (p5) => {
        for (const b of boids) {
            b.checkDoubleClicked(p5);
        }
    }

    const displayFlowField = (p5) => {
        let space = 30;
        for (let x = 0; x < p5.windowWidth; x += space) {
            for (let y = 0; y < p5.windowHeight; y += space) {
                const hur = { ...hurricane.getPos() };
                hur.x += hurricane.w / 2;
                hur.y += hurricane.w / 2;
                const d = p5.dist(x, y, hur.x, hur.y);
                const len = p5.constrain(p5.map(d, 0, p5.windowWidth / 2, 30, 0), 0, 30);
                let dy = y - hur.y;
                let dx = x - hur.x;
                let ang = p5.atan2(dy, dx) + Math.PI / 2;
                let newX = x - len * p5.cos(ang);
                let newY = y - len * p5.sin(ang);
                p5.stroke(0);
                // p5.strokeWeight(3);
                // p5.line(x, y, newX, newY);
                p5.push();
                p5.translate(x, y);
                p5.rotate(ang);
                p5.textSize(len * 3);
                // p5.text("0", 0, 0);
                p5.pop();
            }
        }
    }

    const setBeachGraphics = (p5) => {
        const { w, h, x, y } = getCoverBackground(beach, 1, p5);
        beachGraphics = p5.createGraphics(p5.windowWidth, p5.windowHeight);
        beachGraphics.clear();
        beachGraphics.tint(255, 4);
        beachGraphics.image(beach, x, y, w, h);

        // const { w, h, x, y } = getCoverBackground(waterGif, 1, p5);
        // beachGraphics = p5.createGraphics(p5.windowWidth, p5.windowHeight);
        // beachGraphics.clear();
        // beachGraphics.image(waterGif, x, y);
    }

    const getCoverBackground = (img, zoom, p5) => {
        const imgRatio = (img.height / img.width);
        const height = p5.windowHeight;
        const width = p5.windowWidth;
        const containerRatio = (height / width)

        // set h to canvas height, find w 
        if (containerRatio > imgRatio) {
            var h = height * zoom;
            var y = (height - h) / 2;
            var factor = h / img.height;
            var w = factor * img.width;
            var x = (width - w) / 2;
        }
        // set width 
        else {
            var w = width * zoom;
            var x = (width - w) / 2;
            var factor = w / img.width;
            var h = img.height * factor;
            var y = (height - h) / 2;
        }

        return { w, h, x, y, factor };

    }


    return <Sketch preload={preload} setup={setup} draw={draw} windowResized={windowResized} keyPressed={keyPressed} mouseReleased={mouseReleased} mouseDragged={mouseDragged} doubleClicked={doubleClicked} />;
};
