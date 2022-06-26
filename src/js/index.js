import '../css/style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import * as dat from 'dat.gui';
import { Path, Vector3 } from 'three';

import {createSphere, createFloor, updateDiffuse, handleJPG, loadFile, initInputTag, sphereModel} from './model';
import { createLight1, createLight2, createLightHelper1, createLightHelper2} from './light';
import { createGUI1, createGUI2, createLightGUI1, createLightGUI2} from './gui';

// Scene
const scene = new THREE.Scene();

// Camera
const fov = 75;
const aspect = window.innerWidth/window.innerHeight;
const near = 0.1;
const far = 1000;
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.x = 0;
camera.position.y = 2;
camera.position.z = 3;
scene.add(camera);

// GUI
const gui1 = createGUI1();
scene.add(gui1);

const gui2 = createGUI2();
scene.add(gui2);

//API
const API = {
    exposure: 1.0
};

// Model
// var sphereModel = createSphere();
sphereModel.position.set(0,1,0);
sphereModel.castShadow = true; //default is false
sphereModel.receiveShadow = false; //default

const PlaneModel = createFloor();
PlaneModel.rotation.x = - Math.PI / 2;
PlaneModel.position.set(0,0,0);
PlaneModel.castShadow = false;
PlaneModel.receiveShadow = true;

scene.add(sphereModel, PlaneModel);

// const Cube = createCube();
// Cube.position.set(3,.5,3);
// Cube.castShadow = true; //default is false
// Cube.receiveShadow = false; //default

// TextureUpload
// const update = updateDiffuse(sphereModel);
// const handle = handleJPG();
// const load = loadFile();
const initTag = initInputTag();

scene.add(initTag);


// Canvas
const canvas = document.querySelector('canvas.webgl');

//BackgroundImage
const backgroundLoader = new THREE.TextureLoader();
backgroundLoader.load('/background/bg1.jpg' , function(texture)
            {
             scene.background = texture;  
            });

// // Grid
// const grid = new THREE.GridHelper( 200, 50, 0x000000, 0x000000 );
// grid.material.opacity = 0.2;
// grid.material.transparent = true;
// grid.receiveShadow=true;
// scene.add( grid );

//Add Light
const light1 = createLight1();
const light2 = createLight2();

const lightGUI1 = createLightGUI1(light1);
const lightGUI2 = createLightGUI2(light2);

const lightHelper1 = createLightHelper1(light1);
const lightHelper2 = createLightHelper2(light2);

scene.add(light1);
scene.add(light2);
scene.add(lightGUI1);
scene.add(lightGUI2);
scene.add(lightHelper1);
scene.add(lightHelper2);

/**
 * Sizesc
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = API.exposure;
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap; // default THREE.PCFShadowMap

// ControlPanel
function textureControlGUI2() {
    const controlGUI = gui2.addFolder('Global');
    controlGUI.add(API, 'exposure', 0, 2)
    .onChange(function() {
        renderer.toneMappingExposure = API.exposure;
    } );
}

textureControlGUI2();

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update objects

    // Update Orbital Controls
    controls.update()

    // Render
    renderer.render(scene, camera)


    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()