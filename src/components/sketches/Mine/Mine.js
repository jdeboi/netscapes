import React, { useState, useEffect } from 'react';
// import ReactDOM from "react-dom";
// import StackedMine from './components/StackedMine';
import Coins from './components/Coins';
import Heli from './components/Heli';
import Frame from '../../shared/Frame/Frame';

import useSound from 'use-sound';

import './Mine.scss';
import * as THREE from "three";

import { FirstPersonControls } from 'three/examples/jsm/controls/FirstPersonControls.js';
import { ImprovedNoise } from 'three/examples/jsm/math/ImprovedNoise.js';
import { BufferGeometryUtils } from 'three/examples/jsm/utils/BufferGeometryUtils.js';

import { mapVal, constrain } from '../../shared/Helpers/Helpers';


export default function Mine({ ui, hasLoadedRoom, audioOn }) {

    let vidRef = React.createRef();

    let scene, renderer, camera, effect, controls, requestID, mount;
    const worldWidth = 128, worldDepth = 128;
    const worldHalfWidth = worldWidth / 2;
    const worldHalfDepth = worldDepth / 2;
    let data;
    const clock = new THREE.Clock();
    let mouse = 0;

    const [play, { pause }] = useSound(window.AWS + "/mine/mario.mp3", {
        volume: .5,
        interrupt: false,
        autoplay: false,
        loop: false,
    });

    useEffect(
        () => {
            // mount
            window.addEventListener('resize', handleWindowResize);
            window.addEventListener("mousemove", handleMouseMove);

            setupScene();
            startAnimationLoop();

            return () => {
                // unmount
                pause();

                window.removeEventListener('resize', handleWindowResize);
                window.removeEventListener("mousemove", handleMouseMove);

                window.cancelAnimationFrame(requestID);
                if (controls)
                    controls.dispose();
            }
        },
        // empty array if you want this to run once
        // otherwise, fill with variables that will update
        []
    );

    useEffect(() => {
        // video starts  playing if you've already loaded the page once
        // dunno why
        if (hasLoadedRoom) {
            if (vidRef.current)
                vidRef.current.play();
        }

        return (() => {

        })
    }, [hasLoadedRoom])


    const handleWindowResize = () => {
        const width = window.innerWidth;
        const height = window.innerHeight;
        renderer.setSize(width, height);
        camera.aspect = width / height;
        camera.updateProjectionMatrix();

        // effect.setSize(width, height);
    };

    const handleMouseMove = (e) => {
        var x = e.pageX;
        // var y = e.pageY;
        mouse = mapVal(x, 0, window.innerWidth, .01, -.01);
        if (!mouse)
            mouse = 0;
    }

    const playSound = () => {
        if (audioOn && hasLoadedRoom)
            play();
    }

    const setupScene = () => {
        scene = new THREE.Scene();
        camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 100000);

        renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, });
        renderer.setSize(window.innerWidth, window.innerHeight);
        mount.appendChild(renderer.domElement);

        initScene();
        // addLights();
        // addSkybox();
    }

    const initScene = () => {


        data = generateHeight(worldWidth, worldDepth);
        const matrix = new THREE.Matrix4();

        const pxGeometry = new THREE.PlaneGeometry(100, 100);
        pxGeometry.attributes.uv.array[1] = 0.5;
        pxGeometry.attributes.uv.array[3] = 0.5;
        pxGeometry.rotateY(Math.PI / 2);
        pxGeometry.translate(50, 0, 0);

        const nxGeometry = new THREE.PlaneGeometry(100, 100);
        nxGeometry.attributes.uv.array[1] = 0.5;
        nxGeometry.attributes.uv.array[3] = 0.5;
        nxGeometry.rotateY(- Math.PI / 2);
        nxGeometry.translate(- 50, 0, 0);

        const pyGeometry = new THREE.PlaneGeometry(100, 100);
        pyGeometry.attributes.uv.array[5] = 0.5;
        pyGeometry.attributes.uv.array[7] = 0.5;
        pyGeometry.rotateX(- Math.PI / 2);
        pyGeometry.translate(0, 50, 0);

        const pzGeometry = new THREE.PlaneGeometry(100, 100);
        pzGeometry.attributes.uv.array[1] = 0.5;
        pzGeometry.attributes.uv.array[3] = 0.5;
        pzGeometry.translate(0, 0, 50);

        const nzGeometry = new THREE.PlaneGeometry(100, 100);
        nzGeometry.attributes.uv.array[1] = 0.5;
        nzGeometry.attributes.uv.array[3] = 0.5;
        nzGeometry.rotateY(Math.PI);
        nzGeometry.translate(0, 0, - 50);

        //

        const geometries = [];

        for (let z = 0; z < worldDepth; z++) {

            for (let x = 0; x < worldWidth; x++) {

                const h = getY(x, z);

                matrix.makeTranslation(
                    x * 100 - worldHalfWidth * 100,
                    h * 100,
                    z * 100 - worldHalfDepth * 100
                );

                const px = getY(x + 1, z);
                const nx = getY(x - 1, z);
                const pz = getY(x, z + 1);
                const nz = getY(x, z - 1);

                geometries.push(pyGeometry.clone().applyMatrix4(matrix));

                if ((px !== h && px !== h + 1) || x === 0) {

                    geometries.push(pxGeometry.clone().applyMatrix4(matrix));

                }

                if ((nx !== h && nx !== h + 1) || x === worldWidth - 1) {

                    geometries.push(nxGeometry.clone().applyMatrix4(matrix));

                }

                if ((pz !== h && pz !== h + 1) || z === worldDepth - 1) {

                    geometries.push(pzGeometry.clone().applyMatrix4(matrix));

                }

                if ((nz !== h && nz !== h + 1) || z === 0) {

                    geometries.push(nzGeometry.clone().applyMatrix4(matrix));

                }

            }

        }

        const geometry = BufferGeometryUtils.mergeBufferGeometries(geometries);
        geometry.computeBoundingSphere();

        const texture = new THREE.TextureLoader().load(process.env.PUBLIC_URL + '/textures/minecraft/atlas.png');
        texture.magFilter = THREE.NearestFilter;

        const mesh = new THREE.Mesh(geometry, new THREE.MeshLambertMaterial({ map: texture, side: THREE.DoubleSide }));
        scene.add(mesh);

        const ambientLight = new THREE.AmbientLight(0xcccccc);
        scene.add(ambientLight);

        const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
        directionalLight.position.set(1, 1, 0.5).normalize();
        scene.add(directionalLight);


        controls = new FirstPersonControls(camera, renderer.domElement);
        // controls.movementSpeed = 1000;
        controls.lookSpeed = 0.025;
        controls.lookVertical = false;

        const color = 0x000000;  // white
        const near = 100;
        const far = 10000;
        // scene.fog = new THREE.Fog(color, near, far);
        // scene.background = new THREE.Color(color);
    }

    const generateHeight = (width, height) => {

        // const r = Math.random();
        const r = .011;
        const data = [], perlin = new ImprovedNoise(),
            size = width * height, z = r * 100;

        let quality = 2;

        for (let j = 0; j < 4; j++) {

            if (j === 0) for (let i = 0; i < size; i++) data[i] = 0;

            for (let i = 0; i < size; i++) {

                const x = i % width, y = (i / width) | 0;
                data[i] += perlin.noise(x / quality, y / quality, z) * quality;


            }

            quality *= 4;

        }

        return data;

    }

    const getY = (x, z) => {

        return (data[x + z * worldWidth] * 0.2) | 0;

    }


    const startAnimationLoop = () => {
        // renderer.render( scene, camera );

        if (controls)
            controls.update(clock.getDelta());

        camera.rotateY(mouse);
        if (effect)
            effect.render(scene, camera);
        else
            renderer.render(scene, camera);
        requestID = window.requestAnimationFrame(startAnimationLoop);

    };



    const addLights = () => {
        var ambientLight = new THREE.AmbientLight(0xaaaaaa);
        scene.add(ambientLight);
        addLight(-10, 2, 4);
        addLight(1, -10, -2);
    }

    const addLight = (...pos) => {
        const color = 0xFFFFFF;
        const intensity = 1;
        const light = new THREE.DirectionalLight(color, intensity);
        light.position.set(...pos);
        scene.add(light);
    }

    let factor = mapVal(ui.width, 1110, 375, 1, .33);
    factor = constrain(factor, .33, 1);
    const vidW = 530 * factor;
    const vidH = 300 * factor;

    const coinW = 80;
    const coinSpace = 15;

    const totalW = vidW + vidW * .7 + (coinW + coinSpace) * 2;
    const totalH = vidH + 26  + (coinW + 26 + coinSpace);

    const vid = { x: (window.innerWidth - totalW) / 2 + coinW + coinSpace, y: (window.innerHeight - totalH) / 2, w: vidW, h: vidH };
    const pit = { x: vid.x + vid.w * .7, y: vid.y + coinW + 26 + coinSpace, w: vidW, h: vidH };
    const waterfall = { x: pit.x + 330 * factor, y: vid.y, w: constrain(100 * factor, 80, 100), h: constrain(300 * factor, .8 * 300, 300) };

    if (ui.width < 700) {
        waterfall.y = mapVal(ui.width, 700, 300, vid.y, vid.y - 60);
        waterfall.x = Math.min(waterfall.x, pit.x+pit.w-waterfall.w)
    }
        
    //
    return (
        <div className="Mine Sketch pickCursor" onClick={playSound}>
            {/* <Cloud y={100} /> */}
            {/* <Cloud y={200} /> */}
            <div className="threeCanvas" ref={ref => (mount = ref)} />
            {/* <StackedMine x={200} y={50} /> */}
            <Heli x={50} y={30} classN={"Cloud"} speed={1} />
            <Heli x={520} y={100} classN={"Cloud"} speed={2.2} />

            <Coins ui={ui} w={coinW} h={coinW} coinSpace={coinSpace} x={vid.x} y={vid.y} pitX={pit.x} vidW={vid.w} totalW={totalW} totalH={totalH} playSound={playSound} />

            <Frame
                title={""}
                content={
                    <img src={window.AWS + "/mine/pit.jpeg"} className="fullImg" onClick={playSound} />
                }
                width={pit.w}
                height={pit.h}
                x={pit.x}
                y={pit.y}
            />
            <Frame
                title={""}
                content={
                    <img src={window.AWS + "/mine/waterfall.gif"} className="fullImg" onClick={playSound} />
                }
                width={waterfall.w}
                height={waterfall.h}
                x={waterfall.x}
                y={waterfall.y}
            />
            <Frame title={""} content={
                <a href="https://www.youtube.com/watch?v=eClDkXzKdGM" target="_blank" rel="noopener noreferrer">
                    <video
                        ref={vidRef}
                        width={vid.w}
                        height={vid.h}
                        loop
                        playsInline
                        muted={!audioOn}
                    >
                        <source src={window.AWS + "/mine/quarry2.mp4"} type="video/mp4"></source>
                    </video>
                </a>
            }
                width={vid.w}
                height={vid.h}
                x={vid.x}
                y={vid.y}
            />
           
        </div>
    )
}
