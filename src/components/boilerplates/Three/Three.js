import React, { useState, useEffect } from 'react';
// import ReactDOM from "react-dom";

import * as THREE from "three";
// import { AnaglyphEffect } from 'three/examples/jsm/effects/AnaglyphEffect.js';
// import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
// import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader.js';
// import { DDSLoader } from 'three/examples/jsm/loaders/DDSLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

// water gets texture from 'textures/...' 
// which is an issue when hosting from github /netscapes/textures...
// import { Water } from '../../shared/3D/Water2';

// var AnaglyphEffect = require('../../shared/3D/AnaglyphEffect')(THREE, true);



export default function Three() {

    let scene, renderer, camera, controls, requestID, mount;
    let effect;

    useEffect(
        () => {
            // mount
            window.addEventListener('resize', handleWindowResize);

            setupScene();
            startAnimationLoop();

            return () => {
                // unmount
                window.removeEventListener('resize', handleWindowResize);
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
        if (effect)
            effect.setSize(width, height);
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
    };

    const setupScene = () => {
        camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 100000);
        scene = new THREE.Scene();
        renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, });
        renderer.setSize(window.innerWidth, window.innerHeight);
        mount.appendChild(renderer.domElement);
        initScene();
    }

    const initScene = () => {
        // effect = new AnaglyphEffect(renderer);
        // effect.setSize(window.innerWidth, window.innerHeight);
        addControls();
        addLights();
        addSkybox();
    }

    const startAnimationLoop = () => {
        // renderer.render( scene, camera );

        if (controls)
            controls.update();
        
        if (effect)
            effect.render(scene, camera);
        else
            renderer.render(scene, camera);
        requestID = window.requestAnimationFrame(startAnimationLoop);

    };

    const addControls = () => {
        controls = new OrbitControls(camera, renderer.domElement);
        controls.minDistance = 1;
        controls.maxDistance = 80;
    }

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

    return (
        <div className="Mine Sketch">
            <div className="threeCanvas" ref={ref => (mount = ref)} />
        </div>
    )
}

