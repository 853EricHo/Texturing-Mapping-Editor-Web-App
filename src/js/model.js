import * as THREE from "three/build/three.module";


// Model
function createSphere(){
    const sphereGeometry= new THREE.SphereBufferGeometry();
    sphereGeometry.sphereRadius = .5;
    sphereGeometry.sphereWidthSegments = 32;
    sphereGeometry.sphereheightSegments = 32;

    const spheretextureLoader = new THREE.TextureLoader();

    const sphereDiffuseTexture = spheretextureLoader.load('/texture/lava/Lava_006_basecolor.jpg');
    const sphereNormalTexture = spheretextureLoader.load('/texture/lava/Lava_006_normal.jpg');
    const sphereDisplacementTexture = spheretextureLoader.load('/texture/lava/Lava_006_height.png');

    const sphereMaterial = new THREE.MeshStandardMaterial();
    sphereMaterial.map = sphereDiffuseTexture;
    sphereMaterial.normalMap = sphereNormalTexture;
    sphereMaterial.displacementMap = sphereDisplacementTexture;
    sphereMaterial.displacementScale = .1;
    sphereMaterial.needsUpdate = true;

    const Sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);

    return Sphere;
}
const sphereModel = createSphere();

function createFloor() {
    const floorGeometry = new THREE.PlaneBufferGeometry( 10, 10 );

    const floorTextureloader = new THREE.TextureLoader()

    const floorDiffusetexture = floorTextureloader.load( 'texture/Rock_040_SD/Rock_040_basecolor.jpg' );
    const floorNormalTexture = floorTextureloader.load('/texture/lava/Lava_006_normal.jpg');
    const floorDisplacementTexture = floorTextureloader.load('/texture/lava/Lava_006_height.png');

    const floorMaterial = new THREE.MeshPhongMaterial( { color: 0xffffff, depthWrite: false})
    floorMaterial.map = floorDiffusetexture;
    floorMaterial.normalMap = floorNormalTexture;
    floorMaterial.displacementMap = floorDisplacementTexture;
    floorMaterial.displacementScale = .1;
    floorMaterial.needsUpdate = true;

    const floor = new THREE.Mesh(floorGeometry, floorMaterial);

    return floor;

}

// function createCube(){

//     const boxGeometry = new THREE.BoxGeometry(1, 1, 1);

//     const cubeTextureloader = new THREE.CubeTextureLoader();

//     const cubeDiffusetexture = cubeTextureloader.load('/texture/Sci_fi_Metal_Panel/Sci_fi_Metal_Panel_004_basecolor.jpg');
//     const cubeNormaltexture = cubeTextureloader.load('/texture/Sci_fi_Metal_Panel/Sci_fi_Metal_Panel_004_normal.jpg');
//     const cubeDisplacementtexture = cubeTextureloader.load('/texture/Sci_fi_Metal_Panel/Sci_fi_Metal_Panel_004_height.jpg');

//     const CubeMaterial = new THREE.MeshStandardMaterial({color: 0xffffff});
//     CubeMaterial.map = cubeDiffusetexture;
//     CubeMaterial.normalMap = cubeNormaltexture;
//     CubeMaterial.displacementMap = cubeDisplacementtexture;
//     CubeMaterial.displacementScale = .1;
//     CubeMaterial.needsUpdate = true;
//     CubeMaterial.needsUpdate = true;
//     return new THREE.Mesh(boxGeometry, CubeMaterial);
// }

function updateDiffuse(sphereModel, SpherediffuseTexture) {

    console.log( sphereModel);

    sphereModel.material.map = SpherediffuseTexture;

    SpherediffuseTexture.needsUpdate = true;

    sphereModel.material.needsUpdate = true; // because the encoding can change

}


function handleJPG( event ) { // PNG, too

    function imgCallback( event ) {

        const userTexture = new THREE.Texture( event.target );

        userTexture.encoding = THREE.sRGBEncoding;

        updateDiffuse(sphereModel, userTexture);

    }

    const img = new Image();

    img.onload = imgCallback;

    img.src = event.target.result;

}

function loadFile( file ) {

	const filename = file.name;
	const extension = filename.split( '.' ).pop().toLowerCase();

	const reader = new FileReader();

	reader.addEventListener( 'load', function ( event ) {

	handleJPG( event );

	} );

		reader.readAsDataURL( file );

	}

//TextureUpload
function initInputTag(){
    const input = document.getElementById('userImage');

    input.addEventListener( 'change', function( event ) {
        event.preventDefault();
        loadFile( input.files[0] );

        });
}

export {createSphere, createFloor, sphereModel};
export {updateDiffuse, handleJPG, loadFile, initInputTag};
