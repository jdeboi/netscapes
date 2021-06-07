import React, { useState, useEffect } from 'react';
// import ReactDOM from "react-dom";

import "./JungleGyms.scss";

import * as THREE from "three";
// import { AnaglyphEffect } from 'three/examples/jsm/effects/AnaglyphEffect.js';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader.js';
import { DDSLoader } from 'three/examples/jsm/loaders/DDSLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

import Frame from '../../shared/Frame/Frame';

// store
// import { connect } from 'react-redux';
// import { setSketchMusic } from '../../../store/actions/music';

import Pipe from './Pipe';

var AnaglyphEffect = require('../../shared/3D/AnaglyphEffect')(THREE, true);



function JungleGyms() {


  const [firstLoad, setLoad] = useState(true);

  let scene, renderer, camera, effect, controls, requestID;
  let mount;
  let pipes = [];
  let vines = [];
  let nodes = [];
  let videoSwings = React.createRef();
  let videoGym = React.createRef();


  useEffect(
    () => {
      // mount
      const interval = setInterval(reset, 20000);
      window.addEventListener('resize', handleWindowResize);

      setupScene();
      startAnimationLoop();

      return () => {
        // unmount
        window.removeEventListener('resize', handleWindowResize);
        window.cancelAnimationFrame(requestID);
        controls.dispose();
        clearInterval(interval);
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
  };

  const setupScene = () => {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 100000);
    renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, });
    renderer.setSize(window.innerWidth, window.innerHeight);
    // document.body.appendChild( renderer.domElement );
    // use ref as a mount point of the Three.js scene instead of the document.body
    mount.appendChild(renderer.domElement);


    effect = new AnaglyphEffect(renderer);
    effect.setSize(window.innerWidth, window.innerHeight);

    controls = new OrbitControls(camera, renderer.domElement);
    controls.minDistance = 1;
    controls.maxDistance = 80;

    var ambientLight = new THREE.AmbientLight(0xaaaaaa);
    scene.add(ambientLight);
    addLight(-10, 2, 4);
    addLight(1, -10, -2);

    addScreenCube(videoGym.current, 1920, 1080, .01, [0, 0, -8], [0, 0, 0], 47);
    addScreenCube(videoSwings.current, 1080, 1920, .01, [6, 0, -20], [0, -Math.PI / 2, 0], 20);

    pipes = [];
    vines = [];
    nodes = {};

    addWallPaper();
    addVines();
    look();
  }

  const startAnimationLoop = () => {
    // renderer.render( scene, camera );
    for (let i = 0; i < pipes.length; i++) {
      pipes[i].update();
    }
    if (pipes.length === 0) {
      for (let i = 0; i < 1 + (1 + chance(1 / 10)); i++) {
        pipes.push(new Pipe(nodes, scene));
      }
    }
    for (let i = 0; i < 3; i++) {
      if (vines[i]) vines[i].position.y = -10 - i * 5 + Math.sin(new Date().getTime() / 1000);
    }

    if (controls) controls.update();
    effect.render(scene, camera);
    requestID = window.requestAnimationFrame(startAnimationLoop);

  };


  const reset = () => {
    // const {pipes} = this.state;
    renderer.clear();
    for (var i = 0; i < pipes.length; i++) {
      scene.remove(pipes[i].object3d);
    }
    pipes = [];
    nodes = {};
    look();
  }

  const addLight = (...pos) => {
    const color = 0xFFFFFF;
    const intensity = 1;
    const light = new THREE.DirectionalLight(color, intensity);
    light.position.set(...pos);
    scene.add(light);
  }

  const addScreenCube = (video, pW, pH, fac, pos, rot, boxLen) => {
    var videoTex = new THREE.VideoTexture(video);
    pW *= fac;
    pH *= fac;

    videoTex.minFilter = THREE.LinearFilter;
    videoTex.magFilter = THREE.LinearFilter;
    videoTex.format = THREE.RGBFormat;
    var geometry = new THREE.PlaneGeometry(pW, pH, 1);
    var material = new THREE.MeshBasicMaterial({ color: 0xffff00, side: THREE.DoubleSide, map: videoTex });
    var plane = new THREE.Mesh(geometry, material);
    plane.position.set(...pos);
    plane.rotation.set(...rot);
    scene.add(plane);


    var geometry = new THREE.BoxGeometry(pW, pH, boxLen);
    var material = new THREE.MeshPhongMaterial({ color: 0x00aa00, opacity: .3, transparent: true, side: THREE.DoubleSide }); //
    var cube = new THREE.Mesh(geometry, material);
    cube.position.set(...pos);
    cube.rotation.set(...rot);
    scene.add(cube);

    var geometry = new THREE.BoxBufferGeometry(pW, pH, boxLen);
    var edges = new THREE.EdgesGeometry(geometry);
    var line = new THREE.LineSegments(edges, new THREE.LineBasicMaterial({ color: 0x00ff00, linewidth: 24 }));
    line.position.set(...pos);
    line.rotation.set(...rot);
    scene.add(line);
  }

  const addWallPaper = () => {
    const url = window.AWS + "/jungleGyms/wallpaper3.jpg";
    var wall = new THREE.TextureLoader().load(url);
    wall.wrapS = THREE.RepeatWrapping;
    wall.wrapT = THREE.RepeatWrapping;
    wall.repeat.set(4, 4);
    var geometry = new THREE.PlaneGeometry(200, 100, 1);
    var material = new THREE.MeshBasicMaterial({ color: 0xffff00, side: THREE.DoubleSide, map: wall });
    var plane = new THREE.Mesh(geometry, material);
    plane.position.set(0, 0, -14);
    // scene.add( plane );
    scene.background = wall;
  }

  const addVines = () => {
    // var self = this;
    var modelPath = window.AWS + "/jungleGyms/vines/";
    var model = "Vines";
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
          .load(model + '.obj', function (vine) {
            vine.rotation.set(0, Math.PI, 0);
            vine.position.set(-10, -10, -10);
            vine.scale.set(5, 5, 5);
            vines.push(vine);

            var newVine = vine.clone();
            newVine.position.set(0, -15, 0);
            vine.rotation.set(0, 0, 0);
            vines.push(newVine);

            var newVine2 = vine.clone();
            newVine2.rotation.set(0, -Math.PI / 2, 0);
            vines.push(newVine2);
            scene.add(vine);
            scene.add(newVine);
            scene.add(newVine2);

          }, onProgress, onError);

      });

    //
  }

  const look = () => {
    // TODO: never don't change the view (except maybe while clearing)
    if (firstLoad || chance(1 / 2)) {
      // head-on view

      camera.position.set(0, 0, 14);
      setLoad(false);
    } else {
      // random view

      var vector = new THREE.Vector3(30, 0, 0);

      var axis = new THREE.Vector3(random(-1, 1), random(-1, 1), random(-1, 1));
      var angle = Math.PI / 2;
      var matrix = new THREE.Matrix4().makeRotationAxis(axis, angle);

      vector.applyMatrix4(matrix);
      camera.position.copy(vector);
    }
    // camera.position.set(0, 0, 14);
    var center = new THREE.Vector3(0, 0, 0);
    camera.lookAt(center);
    // camera.updateProjectionMatrix(); // maybe?
    controls.update();
  }


  const random = (x1, x2) => {
    return Math.random() * (x2 - x1) + x1;
  }

  const chance = (value) => {
    return Math.random() < value;
  }


  const gymUrl = window.AWS + "/jungleGyms/gym.mp4"
  return (
    <div className="JungleGyms Sketch">
      <div className="threeCanvas" ref={ref => (mount = ref)} />
      <video
        playsInline
        crossOrigin="anonymous"
        ref={videoGym}
        autoPlay
        muted
        loop
        className="gym" >
        <source src={gymUrl} type="video/mp4" ></source>
          Your browser does not support HTML5 video.
        </video>
      <video
        playsInline
        crossOrigin="anonymous"
        ref={videoSwings}
        autoPlay
        muted
        loop
        className="gym" >
        <source src={window.AWS + "/jungleGyms/swings.mp4"} type="video/mp4" ></source>
          Your browser does not support HTML5 video.
        </video>

    </div>
  )
}




// const mapStateToProps = (state) => {
//   return {
//     ui: state.ui
//   }
// }

// const mapDispatchToProps = () => {
//   return {
//     // doneLoadingApp
//     setSketchMusic
//   }
// }


// export default connect(mapStateToProps, mapDispatchToProps())(JungleGyms);
export default JungleGyms;
