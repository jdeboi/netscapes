import React, { useState, useEffect } from 'react';
// import ReactDOM from "react-dom";
// import StackedMine from './components/StackedMine';
import Coins from './components/Coins';
import Heli from './components/Heli';
import Frame from '../../shared/Frame/Frame';

import './Mine.scss';
import * as THREE from "three";

import { FirstPersonControls } from 'three/examples/jsm/controls/FirstPersonControls.js';
import { ImprovedNoise } from 'three/examples/jsm/math/ImprovedNoise.js';
import { BufferGeometryUtils } from 'three/examples/jsm/utils/BufferGeometryUtils.js';

import { mapVal } from '../../shared/Helpers/Helpers';


export default function Mine() {

    const vidRef = React.createRef();
    let scene, renderer, camera, effect, controls, requestID, mount;
    const worldWidth = 128, worldDepth = 128;
    const worldHalfWidth = worldWidth / 2;
    const worldHalfDepth = worldDepth / 2;
    let data;
    const clock = new THREE.Clock();
    let mouse = 0;

    useEffect(
        () => {
            // mount
            window.addEventListener('resize', handleWindowResize);
            window.addEventListener("mousemove", handleMouseMove);

            setupScene();
            startAnimationLoop();

            return () => {
                // unmount
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

    const addSkybox = () => {
        const loader = new THREE.CubeTextureLoader();
        const texture = loader.load([
            window.AWS + "/hardDrives/skybox/skybox_px.jpg",
            window.AWS + "/hardDrives/skybox/skybox_nx.jpg",
            window.AWS + "/hardDrives/skybox/skybox_py.jpg",
            window.AWS + "/hardDrives/skybox/skybox_ny.jpg",
            window.AWS + "/hardDrives/skybox/skybox_pz.jpg",
            window.AWS + "/hardDrives/skybox/skybox_nz.jpg",
        ]);
        scene.background = texture;
    }

    const vidW = 530;
    const vidH = 300;
    const coinW = 80;
    const coinSpace = 15;

    const totalW = vidW + vidW*.7;
    const totalH = vidH + coinW + 26*2 + coinSpace;

    const vid = { x: (window.innerWidth - totalW)/2, y: (window.innerHeight-totalH-40)/2, w: vidW, h: vidH };
    const pit = { x: vid.x + vid.w * .7, y: vid.y + coinW + 26 + coinSpace, w: vidW, h: vidH };
    const waterfall = { x: pit.x + 330, y: vid.y };

//
    return (
        <div className="Mine Sketch pickCursor"> 
            {/* <Cloud y={100} /> */}
            {/* <Cloud y={200} /> */}
            <div className="threeCanvas" ref={ref => (mount = ref)} />
            {/* <StackedMine x={200} y={50} /> */}
            <Coins w={coinW} h={coinW} coinSpace={coinSpace} x={vid.x} y={vid.y} totalW={totalW} totalH={totalH} />

            <Frame
                title={""}
                content={
                    <img src={process.env.PUBLIC_URL + "/local_images/mine/pit.jpeg"} className="fullImg" />
                }
                width={pit.w}
                height={pit.h}
                x={pit.x}
                y={pit.y}
            />
            <Frame
                title={""}
                content={
                    <img src={process.env.PUBLIC_URL + "/local_images/mine/waterfall.gif"} className="fullImg" />
                }
                width={100}
                height={300}
                x={waterfall.x}
                y={waterfall.y}
            />
            <Frame title={""} content={
                <a href="https://www.youtube.com/watch?v=eClDkXzKdGM" target="_blank" rel="noopener noreferrer">
                    <video
                        ref={vidRef}
                        width={vid.w}
                        height={vid.h}
                        muted
                        loop
                        playsInline
                        autoPlay>
                        <source src={process.env.PUBLIC_URL + "/local_images/mine/quarry2.mp4"} type="video/mp4"></source>
                    </video>
                </a>
            }
                width={vid.w}
                height={vid.h}
                x={vid.x}
                y={vid.y}
            />
            <Heli y={90} classN={"Cloud"} speed={1} />
            {/* <Heli y={200} classN={"Cloud"} speed={3} /> */}
            <Heli y={250} classN={"Cloud"} speed={2} />
        </div>
    )
}
