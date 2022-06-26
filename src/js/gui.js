import * as THREE from "../../node_modules/three/build/three.module.js";
import * as dat from 'dat.gui';

// GUI
function createGUI1() {
    window.gui1 = new dat.GUI();
    // gui1.domElement.style = 'position:absolute;top:1000px;left:1800px;width:50px'
    return gui1;
}

function createGUI2() {
    window.gui2 = new dat.GUI();
    // gui2.domElement.style = 'position:absolute;top:1000px;left:1500px;width:50px'
    return gui2;
}

// lightGUI
function createLightGUI1(light1){
    const light1GUI = gui1.addFolder('Light 1');
    light1GUI.add(light1.position, 'x').min(-6).max(6).step(0.01);
    light1GUI.add(light1.position, 'y').min(-6).max(6).step(0.01);
    light1GUI.add(light1.position, 'z').min(-6).max(6).step(0.01);
    light1GUI.add(light1, 'intensity').min(0).max(10).step(0.01);

    const light1Color = {
        color: 0xffffff
}

    light1GUI.addColor(light1Color, 'color')
        .onChange(() => {
            light1.color.set(light1Color.color);
            console.log(light1.color);
    })
    return light1GUI;
}

function createLightGUI2(light2) {
    const light2GUI = gui1.addFolder('Light 2');
    light2GUI.add(light2.position, 'x').min(-6).max(6).step(0.01);
    light2GUI.add(light2.position, 'y').min(-6).max(6).step(0.01);
    light2GUI.add(light2.position, 'z').min(-6).max(6).step(0.01);
    light2GUI.add(light2, 'intensity').min(0).max(10).step(0.01);
        
    const light2Color = {
        color: 0xffffff
    }
       
    light2GUI.addColor(light2Color, 'color')
        .onChange(() => {
            light2.color.set(light2Color.color);
    })
    return light2GUI;
}




export {createGUI1, createGUI2, createLightGUI1, createLightGUI2};