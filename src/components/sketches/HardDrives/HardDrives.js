import React, { useState, useEffect } from 'react';
import "./HardDrives.scss";

import * as THREE from "three";
// import { AnaglyphEffect } from 'three/examples/jsm/effects/AnaglyphEffect.js';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader.js';
import { DDSLoader } from 'three/examples/jsm/loaders/DDSLoader.js';
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { Water } from '../../shared/3D/Water2';

// components
import Frame from '../../shared/Frame/Frame';
import Birds from './Birds';


// store
// import { connect } from 'react-redux';
// import { setSketchMusic } from '../../../store/actions/music';



var AnaglyphEffect = require('../../shared/3D/AnaglyphEffect')(THREE, true);



// var start;
// var changed = false;



export default function HardDrives() {

    let scene, controls, mount, camera, renderer, effect, requestID;
    let water, floorMaterial;
    const trees = [];
    const bottles = [];
    const scaler = 4;
    let seed = 13;
    const island = "https://www.google.com/maps/embed?pb=!4v1591730465198!6m8!1m7!1sCAoSLEFGMVFpcFBTYW9SYVFBMmR0QjhoeTVaSUs5R3lQaGJBNVB5dVhFQ2o0UVdW!2m2!1d-17.3611139!2d177.1339841!3f99.14217177224654!4f16.212409154729073!5f0.5970117501821992";

    // const { ui } = this.props;
    const ui = {
        contentW: window.innerWidth,
        contentH: window.innerHeight,
        orientation: "landscape"
    }
    const svFrame = {};
    let f = .8;
    if (ui.contentW >= 1920)
        f = 1.3;
    const ogW = 600 * f;
    const ogH = 450 * .8 * f;
    svFrame.w = ogW;
    svFrame.h = ogH;
    svFrame.x = (ui.contentW - svFrame.w) * .27;
    svFrame.y = (ui.contentH - svFrame.h - 30) * .5;

    if (ui.hasFooter || ui.isMobile) {
        if (ui.orientation === "portrait") {
            let wTemp = ui.width - 40;
            if (wTemp < ogW) {
                svFrame.w = wTemp; // Math.min(ui.width-40, ogW);
                svFrame.h = svFrame.h * (svFrame.w / ogW);
                svFrame.y = 20; //ui.headerH + 50;
                svFrame.x = 18;
            }
            else {
                svFrame.x = (ui.width - svFrame.w - 4) / 2;

            }
            svFrame.y = ui.height / 2 - svFrame.h * .8;
        }
        else {
            const factor = ui.height / 500;

            if (factor < 1) {
                svFrame.h *= ui.height / 500;
                svFrame.w *= ui.height / 500;
                svFrame.y = 10; //ui.headerH + 20;
                svFrame.x = 50;
            }

        }
    }

    const title = "";// (ui.isMobile || ui.hasFooter) ? "": "hard drives on seashores";


    useEffect(
        () => {
            window.addEventListener('resize', handleWindowResize);
            setupScene();
            startAnimationLoop();

            return () => {
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
        const width = window.innerWidth; //this.el.clientWidth;
        const height = window.innerHeight; //this.el.clientHeight;
        renderer.setSize(width, height);
        effect.setSize(width, height);
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
    };

    const setupScene = () => {

        // const camera = new AnaglyphUniversalCamera("af_cam", new Vector3(0, 8 * scaler, -5 * scaler), 0.033, scene);
        // scene.clearColor = Color3.Black();
        // camera.setTarget(new Vector3(0, 8 * scaler, 0));

        scene = new THREE.Scene();
        camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 10000);
        // camera.up = new THREE.Vector3(0,0,1);
        camera.position.set(0, 8 * scaler, -5 * scaler);
        camera.lookAt(new THREE.Vector3(0, 8 * scaler, 0));

        renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, });
        renderer.setSize(window.innerWidth, window.innerHeight);
        // document.body.appendChild( renderer.domElement );
        // use ref as a mount point of the Three.js scene instead of the document.body
        mount.appendChild(renderer.domElement);


        effect = new AnaglyphEffect(renderer);
        effect.setSize(window.innerWidth, window.innerHeight);

        // controls = new OrbitControls(camera, renderer.domElement);
        // controls.minDistance = 1;
        // controls.maxDistance = 80;
        // controls.enablePan = false;

        var ambientLight = new THREE.AmbientLight(0xaaaaaa);
        scene.add(ambientLight);
        addLight(-10, 2, 4);
        addLight(1, -10, -2);


        addPalms();
        addSkybox();
        addBottles();
        addWater();
        addFloor();

    }

    const startAnimationLoop = () => {


        if (controls)
            controls.update();
        effect.render(scene, camera);
        requestID = window.requestAnimationFrame(startAnimationLoop);

        for (let i = 0; i < trees.length; i++) {
            var sign = i % 2 === 0 ? 1 : -1;
            trees[i].rotation.y += .005 * sign;
        }

        for (let i = 0; i < bottles.length; i++) {
            bottles[i].position.y = .7 * Math.sin(new Date() / 600 + bottles[i].position.x / 60);
        }
    };

    const addWater = () => {
        const waterGeometry = new THREE.PlaneGeometry(512 * scaler, 512 * scaler);

        const params = {
            color: '#ffffff',
            scale: 1,
            flowX: .21,
            flowY: .21
        };

        water = new Water(waterGeometry, {
            color: params.color,
            scale: params.scale,
            flowDirection: new THREE.Vector2(params.flowX, params.flowY),
            textureWidth: 1024,
            textureHeight: 1024
        });

        water.position.y = 1; //scaler;
        water.rotation.x = Math.PI * - 0.5;

        // water.material.uniforms['color'].value.set(0xffffff);
        // water.material.uniforms['config'].value.w = 4;
        // water.material.uniforms['flowDirection'].value.x = 1;
        // water.material.uniforms['flowDirection'].value.normalize();
        // water.material.uniforms['flowDirection'].value.y = 1;
        // water.material.uniforms['flowDirection'].value.normalize();

        scene.add(water);
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

    const addFloor = () => {
        // FLOOR
        var floorTexture = new THREE.TextureLoader().load(window.AWS + "/shared/black_sand.jpg");
        floorTexture.wrapS = floorTexture.wrapT = THREE.RepeatWrapping;
        floorTexture.repeat.set(20.0, 20.0);
        floorMaterial = new THREE.MeshBasicMaterial({ map: floorTexture, side: THREE.BackSide });
        var floorGeometry = new THREE.PlaneGeometry(1000, 1500, 10, 10);
        var floor = new THREE.Mesh(floorGeometry, floorMaterial);
        floor.position.y = -3;
        floor.rotation.x = Math.PI / 2;
        floor.position.z = - 200
        scene.add(floor);
    }


    const addPalms = () => {
        var modelPath = window.AWS + "/hardDrives/palm/";
        var model = "QueenPalmTree";
        var onProgress = function (xhr) {
            if (xhr.lengthComputable) {
                var percentComplete = xhr.loaded / xhr.total * 100;
                // console.log(Math.round(percentComplete, 2) + '% downloaded');
            }
        }
        var onError = function () { };
        var manager = new THREE.LoadingManager();
        manager.addHandler(/\.dds$/i, new DDSLoader());
        new MTLLoader(manager)
            .setPath(modelPath)
            .load(model + '.mtl', function (materials) {

                materials.preload();

                new OBJLoader(manager)
                    .setMaterials(materials)
                    .setPath(modelPath)
                    .load(model + '.obj', function (tree) {
                        let positions = [{ x: -5, y: 0, z: -2 }, { x: 5, y: 0, z: -2 }, { x: 4, y: 0, z: -10 }, { x: -4, y: 0, z: -10 }]

                        tree.rotation.y = 0;
                        tree.scale.set(scaler, scaler, scaler);
                        tree.position.x = positions[0].x * scaler;
                        tree.position.y = positions[0].y * scaler;
                        tree.position.z = positions[0].z * scaler;
                        trees.push(tree);
                        scene.add(tree);

                        for (let i = 1; i < positions.length; i++) {
                            let copy = tree.clone();
                            copy.rotation.y = Math.PI * 1.5;
                            copy.position.x = positions[i].x * scaler;
                            copy.position.z = positions[i].z * scaler;
                            trees.push(copy);
                            scene.add(copy);
                        }

                    }, onProgress, onError);

            });

        //
    }

    const addBottles = () => {
     
        var modelPath = window.AWS + "/hardDrives/Corona/"
        var model = "Corona2";
        var onProgress = function (xhr) {
            if (xhr.lengthComputable) {
                var percentComplete = xhr.loaded / xhr.total * 100;
                // console.log("bt", Math.round(percentComplete, 2) + '% downloaded');
            }
        }
        var onError = function (error) {
            // console.log("issue with bottle", error)
         };
        var manager = new THREE.LoadingManager();
        manager.addHandler(/\.dds$/i, new DDSLoader());
        new MTLLoader(manager)
            .setPath(modelPath)
            .load(model + '.mtl', function (materials) {

                materials.preload();

                new OBJLoader(manager)
                    .setMaterials(materials)
                    .setPath(modelPath)
                    .load(model + '.obj', function (bottle) {
                        let bottleVectors = [
                            {},
                            { "id": 0, "pos": { "x": 88, "y": 0, "z": 128 }, "rot": { "x": 0, "y": 0, "z": 0 } },
                            { "id": 1, "pos": { "x": 38, "y": 0, "z": 78 }, "rot": { "x": 0, "y": 0, "z": 0 } },
                            { "id": 2, "pos": { "x": 68, "y": 0, "z": 108 }, "rot": { "x": 0, "y": 0, "z": 0 } },
                            { "id": 3, "pos": { "x": 0, "y": 0, "z": 108 }, "rot": { "x": 0, "y": 0, "z": 0 } },
                            { "id": 4, "pos": { "x": -88, "y": 0, "z": 98 }, "rot": { "x": 0, "y": 0, "z": 0 } },
                            { "id": 5, "pos": { "x": -78, "y": 0, "z": 68 }, "rot": { "x": 0, "y": 0, "z": 0 } },
                            { "id": 6, "pos": { "x": 3, "y": 0, "z": 148 }, "rot": { "x": 0, "y": 0, "z": 0 } },
                            { "id": 7, "pos": { "x": 4, "y": 0, "z": 28 }, "rot": { "x": 0, "y": 0, "z": 0 } },
                            { "id": 8, "pos": { "x": -40, "y": 0, "z": -98 }, "rot": { "x": 0, "y": 0, "z": 0 } }, // back
                            { "id": 8, "pos": { "x": -70, "y": 0, "z": 98 }, "rot": { "x": 0, "y": 0, "z": 0 } },

                            // back (repeat)
                            { "id": 0, "pos": { "x": 88, "y": 0, "z": -128 }, "rot": { "x": 0, "y": 0, "z": 0 } },
                            { "id": 1, "pos": { "x": 38, "y": 0, "z": -78 }, "rot": { "x": 0, "y": 0, "z": 0 } },
                            { "id": 2, "pos": { "x": 68, "y": 0, "z": -108 }, "rot": { "x": 0, "y": 0, "z": 0 } },
                            { "id": 3, "pos": { "x": 0, "y": 0, "z": -108 }, "rot": { "x": 0, "y": 0, "z": 0 } },
                            { "id": 4, "pos": { "x": -88, "y": 0, "z": -98 }, "rot": { "x": 0, "y": 0, "z": 0 } },
                            { "id": 5, "pos": { "x": -78, "y": 0, "z": -68 }, "rot": { "x": 0, "y": 0, "z": 0 } },
                            { "id": 6, "pos": { "x": 3, "y": 0, "z": -148 }, "rot": { "x": 0, "y": 0, "z": 0 } },


                            // left
                            { "id": 0, "pos": { "x": 188, "y": 0, "z": 48 }, "rot": { "x": 0, "y": 0, "z": 0 } },
                            { "id": 1, "pos": { "x": 138, "y": 0, "z": 28 }, "rot": { "x": 0, "y": 0, "z": 0 } },
                            { "id": 2, "pos": { "x": 168, "y": 0, "z": 0 }, "rot": { "x": 0, "y": 0, "z": 0 } },
                            { "id": 3, "pos": { "x": 100, "y": 0, "z": -20 }, "rot": { "x": 0, "y": 0, "z": 0 } },


                            // right
                            { "id": 0, "pos": { "x": -188, "y": 0, "z": 30 }, "rot": { "x": 0, "y": 0, "z": 0 } },
                            { "id": 1, "pos": { "x": -138, "y": 0, "z": 20 }, "rot": { "x": 0, "y": 0, "z": 0 } },
                            { "id": 2, "pos": { "x": -168, "y": 0, "z": 0 }, "rot": { "x": 0, "y": 0, "z": 0 } },
                            { "id": 3, "pos": { "x": -100, "y": 0, "z": -18 }, "rot": { "x": 0, "y": 0, "z": 0 } },
                        ]

                        // bottle.rotation.y = 0;
                        // bottle.scale.set(scaler, scaler, scaler);
                        // bottle.position.x = bottleVectors[0].x * scaler;
                        // bottle.position.y = positions[0].y * scaler;
                        // bottle.position.z = positions[0].z * scaler;
                        // trees.push(tree);
                        // scene.add(tree);

                        for (let i = 1; i < bottleVectors.length; i++) {
                            let copy = bottle.clone();
                            copy.rotation.y = getRandom() * Math.PI * 2;
                            copy.rotation.x = Math.PI;
                            copy.rotation.z = (-.3 + getRandom() * .6);
                            copy.position.y = 2; //Math.abs((Math.sin(((x / 0.05) + time * water.waveSpeed)) * water.waveHeight * water.windDirection.x * 5.0) + (Math.cos(((z / 0.05) +  time * water.waveSpeed)) * water.waveHeight * water.windDirection.y * 5.0));

                            copy.position.x = bottleVectors[i].pos.x;
                            // copy.position.y = bottleVectors[i].pos.y;
                            copy.position.z = bottleVectors[i].pos.z;

                            bottles.push(copy);
                            scene.add(copy);

                        }

                    }, onProgress, onError);

            });

        //
    }

    const getRandom = () => {
        var x = Math.sin(seed++) * 10000;
        return x - Math.floor(x);
    }


    return (
        <div className="HardDrives Sketch">

            <div className="threeCanvas" ref={ref => (mount = ref)} />
            <Frame title={title} content={
                <iframe title="island view" src={island} width={svFrame.w} height={svFrame.h} frameBorder="0" allowFullScreen="" aria-hidden="false" tabIndex="0"></iframe>
            }
                width={svFrame.w} height={svFrame.h} x={svFrame.x} y={svFrame.y}
            />
            <Birds />
        </div>
    )



}
