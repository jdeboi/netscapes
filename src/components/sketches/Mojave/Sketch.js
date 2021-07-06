import React from "react";
import Sketch from "react-p5";

let dogica;
let desert, desert2, moon;

// Developed using Emoji City 18XX
// by Naoki Tsutae

let joshua, fire;

let Counter = 0;
let UnitPixels = 48;
let MX = .1, MY = .2;

let pg;

let ui;

export default (props) => {
    ui = props.ui;

    const preload = (p5) => {
        const url = "https://lmd-bucket.s3.us-east-2.amazonaws.com/sketches";
        const netURL = "https://netscapes.s3.us-east-2.amazonaws.com/mojave";
        dogica = p5.loadFont(url + '/shared/fonts/dogica.ttf');

        desert = p5.loadImage(process.env.PUBLIC_URL + "/local_images/mojave/mars.jpeg");
        desert2 = p5.loadImage(process.env.PUBLIC_URL + "/local_images/mojave/sand.jpeg");

        fire = p5.loadImage(netURL + "/fire.png");
        joshua = p5.loadImage(netURL + "/joshua.png");
        moon = p5.loadImage(netURL + "/moon5.jpeg");


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

        p5.textFont(dogica);



        // fire = p5.loadImage("fire.png");
        p5.rectMode(p5.CENTER);
        p5.imageMode(p5.CENTER);

        p5.noiseSeed(1);

        pg = p5.createGraphics(p5.windowWidth, p5.windowHeight);
        initializePG(p5);
    };

    ////////////////////////////////////////////////////////////////////////
    // DRAW
    ////////////////////////////////////////////////////////////////////////
    const draw = (p5) => {

        p5.imageMode(p5.CORNER);
        p5.image(pg, 0, 0, p5.width, p5.height);


        drawMarsStrip(p5);

        p5.imageMode(p5.CENTER);

        let startAmt = .4;
        let dA = .03;
        update(p5.color(0), 0, startAmt -= dA, p5);
        update(p5.color(0x01F332), 1, startAmt -= dA, p5); // tree
        update(p5.color(0x01F3E0), 2, startAmt -= dA, p5); // house
        update(p5.color(0x01F3ED), 2, startAmt, p5); // factory
        update(p5.color(0x01F3F0), 3, startAmt, p5); // castle

        let jw = p5.height * .6;

        if (ui.isMobile) {
            MX += 0.01;
            MY += 0.01;
        }
        else {
            MX = p5.mouseX * 0.001;
            MY = p5.mouseY * 0.001;
            Counter += .001;
            Counter %= 1.4;
        }

        // p5.erase(255);
        // for (let i = 0; i < 10; i++) {
        //     p5.fill(255);
        //     p5.rect(0, p5.random(pg.height), p5.width, p5.random(1, 20));
        // }
        // for (let i = 0; i < 10; i++) {
        //     p5.fill(255);
        //     p5.rect(p5.random(p5.width), 0, p5.random(1, 20), p5.height);
        // }

        // p5.noErase();


        checkDimensions(p5);
    }

    const drawMarsStrip = (p5) => {
        let factor = .3;
        let index = 0;
        let w = desert2.width * factor;
        let y = (p5.height- 26 - 30)/2 ;
        for (let x = 0; x < p5.width; x += w) {
            if (index % 2 === 0) {
                p5.push();
                p5.scale(-1, 1);
                p5.image(desert, x - w, y, w, desert2.height * factor);
                p5.pop();
            }
            else
                p5.image(desert, x, y, w, desert2.height * factor);
            index++;
        }

    }

    const update = (codeNumber, unitSize, t, p5) => {
        let k = Math.pow(2, unitSize) * UnitPixels;
        p5.randomSeed(1);
        for (let y = 0; y < p5.height; y += k) {
            for (let x = 0; x < p5.width; x += k) {
                let noiseX = x * 1.0 / p5.width - MX;
                let noiseY = y * 1.0 / p5.height - MY;
                let noiseZ = p5.mag(x, y) * 1.0 / p5.width - Counter;

                if (p5.noise(noiseX, noiseY, noiseZ) < t) {

                    let r = p5.random();
                    if (unitSize < 2) {
                        if (r < .3)
                            p5.image(fire, x + k / 2, y + k / 2, k * 0.82, k * 0.82);
                        else
                            drawJoshua(x + k / 2, y + k / 2, k * 0.82, k * 0.82, p5);
                    }
                    else
                        drawJoshua(x + k / 2, y + k / 2, k * 0.82, k * 0.82, p5);
                }
            }
        }
    }

    const drawJoshua = (x, y, w, h, p5) => {
        p5.image(desert2, x, y, w, h);
        p5.image(joshua, x, y, w, h);

        p5.stroke(68, 48, 61);
        p5.strokeWeight(p5.map(w, 30, 300, 1, 4));
        p5.fill(255, 50);
        p5.noFill();
        p5.rect(x, y, w, h);
    }

    const initializePG = (p5) => {
        let pgtemp = p5.createGraphics(pg.width, pg.height);
        pgtemp.clear();


        pgtemp.imageMode(p5.CORNER);

        let factor = 1;

        pgtemp.push();


        for (let y = 0; y < pg.height; y += moon.height) {
            for (let x = 0; x < pg.width; x += moon.width) {
                pgtemp.image(moon, x, y, moon.width, moon.height);
            }
        }

        for (let y = 0; y <= pg.height; y += desert2.height * 1.03) {
            for (let x = 0; x < pg.width; x += desert2.width * 1.02) {
                pgtemp.image(desert2, x, y, desert2.width, desert2.height);
            }
        }


        pgtemp.erase();
        for (let i = 0; i < 10; i++) {
            pgtemp.fill(255);
            pgtemp.rect(0, p5.random(pg.height), pgtemp.width, p5.random(1, 20));
        }
        for (let i = 0; i < 10; i++) {
            pgtemp.fill(255);
            pgtemp.rect(p5.random(pg.width), 0, p5.random(1, 20), p5.height);
        }


        pgtemp.pop();

        pg.tint(255, 20);
        pg.image(pgtemp, 0, 0);
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
        pg = p5.createGraphics(p5.windowWidth, p5.windowHeight);
        initializePG(p5);
    }


    const doubleClicked = (p5) => {

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
