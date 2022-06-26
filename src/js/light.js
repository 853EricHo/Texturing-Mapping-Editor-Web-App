import * as THREE from "../../node_modules/three/build/three.module.js";

// create light
function createLight1() {
    const DirectionalLight1 = new THREE.DirectionalLight(0xffffff);
    DirectionalLight1.position.set(6, 2.96, -1.54);
    DirectionalLight1.intensity = 3;
    DirectionalLight1.castShadow = true; // default false

    //Set up shadow properties for the light1
    DirectionalLight1.shadow.mapSize.width = 512; // default
    DirectionalLight1.shadow.mapSize.height = 512; // default
    DirectionalLight1.shadow.camera.near = 0.5; // default
    DirectionalLight1.shadow.camera.far = 500; // default
    return DirectionalLight1;
}

function createLight2() {
    const DirectionalLight2 = new THREE.DirectionalLight(0xffffff);
    DirectionalLight2.position.set(-0.22, -2.73, 5.47);
    DirectionalLight2.intensity = 3;
    DirectionalLight2.castShadow = true; // default false

    //Set up shadow properties for the light1
    DirectionalLight2.shadow.mapSize.width = 512; // default
    DirectionalLight2.shadow.mapSize.height = 512; // default
    DirectionalLight2.shadow.camera.near = 0.5; // default
    DirectionalLight2.shadow.camera.far = 500; // default
    return DirectionalLight2;
    }

//create helper
function createLightHelper1(DirectionalLight1) {
    const DirectionalHelper1 = new THREE.DirectionalLightHelper(DirectionalLight1, 1);
    return DirectionalHelper1;
}

function createLightHelper2(DirectionalLight2) {
    const DirectionalHelper2 = new THREE.DirectionalLightHelper(DirectionalLight2, 1);
    return DirectionalHelper2;
}

export {createLight1, createLight2, createLightHelper1, createLightHelper2};