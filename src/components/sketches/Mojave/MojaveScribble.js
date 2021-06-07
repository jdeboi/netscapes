import React, { useEffect, useState } from "react";
import './Mojave.scss';
import Dune from './components/Dune';
import { FreeCamera, Vector3, HemisphericLight, Mesh, MeshBuilder, CubeTexture, StandardMaterial, Color3, Color4, Texture, Vector2 } from "@babylonjs/core";
import { WaterMaterial } from "@babylonjs/materials";
// import Babylon from "../../shared/3D/Babylon"; // uses above component in same directory
import SceneComponent from 'babylonjs-hook'; // if you install 'babylonjs-hook' NPM.

let box, ground, skybox;


const onSceneReady = (scene) => {
    // This creates and positions a free camera (non-mesh)
    scene.clearColor = new Color4(0, 0, 0, 0);

    var camera = new FreeCamera("camera1", new Vector3(0, 5, -10), scene);

    // This targets the camera to scene origin
    camera.setTarget(Vector3.Zero());

    const canvas = scene.getEngine().getRenderingCanvas();

    // This attaches the camera to the canvas
    camera.attachControl(canvas, true);

    // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
    var light = new HemisphericLight("light", new Vector3(0, 1, 0), scene);

    // Default intensity is 1. Let's dim the light a small amount
    light.intensity = 0.7;



    // Our built-in 'ground' shape.
    // MeshBuilder.CreateGround("ground", { width: 6, height: 6 }, scene);

    // addSkybox(scene);
    // addGround(scene);
    // addW/ater(scene);
};

const addSkybox = (scene) => {
    skybox = MeshBuilder.CreateBox("skyBox", { size: 1000.0 }, scene);
    var skyboxMaterial = new StandardMaterial("skyBox", scene);
    skyboxMaterial.backFaceCulling = false;
    skyboxMaterial.reflectionTexture = new CubeTexture(process.env.PUBLIC_URL + "/local_images/skybox/mountain/mossymountains", scene);
    // skyboxMaterial.reflectionTexture = new CubeTexture(process.env.PUBLIC_URL + "/local_images/skybox/sunset/sunset", scene);

    skyboxMaterial.reflectionTexture.coordinatesMode = Texture.SKYBOX_MODE;
    skyboxMaterial.diffuseColor = new Color3(0, 0, 0);
    skyboxMaterial.specularColor = new Color3(0, 0, 0);
    skybox.material = skyboxMaterial;
}

const addWater = (scene) => {
    var waterMesh = Mesh.CreateGround("waterMesh", 512, 512, 32, scene, false);
    var water = new WaterMaterial("water", scene, new Vector2(512, 512));
    water.backFaceCulling = true;
    water.bumpTexture = new Texture(process.env.PUBLIC_URL + "/textures/water/waterbump.png", scene);
    water.windForce = -5;
    water.waveHeight = 0.1;
    water.bumpHeight = 0.1;
    water.waterColor = new Color3(0.6, 0.9, 0.9);
    water.colorBlendFactor = 0.5;
    water.addToRenderList(skybox);
    // water.addToRenderList(ground);
    waterMesh.material = water;
}

const addGround = (scene) => {
    // Ground
    // var groundTexture = new Texture(process.env.PUBLIC_URL + "/textures/grass.dds", scene);
    // groundTexture.vScale = groundTexture.uScale = 8.0;

    var groundMaterial = new StandardMaterial("groundMaterial", scene);
    // groundMaterial.diffuseTexture = groundTexture;

    ground = Mesh.CreateGround("ground", 512, 512, 32, scene, false);
    ground.position.y = -1;
    ground.material = groundMaterial;
}
/**
 * Will run on every frame render.  We are spinning the box on y-axis.
 */
const onRender = (scene) => {

};

export default () => {

    const [backX, setBackX] = useState(0);


    useEffect(
        () => {
            // mount
            //   const interval = setInterval(() => setBackX(backX => backX - 4), 50);

            return () => {
                // clearInterval(interval);
            }
        },
        [backX]
    );

    let divs = new Array(50).fill(0);
    return (
        <div className="Mojave Sketch">
           
            <SceneComponent antialias onSceneReady={onSceneReady} onRender={onRender} id="babylon-canvas" />
            <div className="dunes">
            {divs.map((d, i) => {
                let w = 180;
                let h = 100;
                return (
                    <Dune
                        key={i}
                        x={(i % 20) * w}
                        y={Math.floor(i / 20) * h}
                        w={w}
                        h={h}
                    />
                )

            })}
            </div>
        </div>
    );
}