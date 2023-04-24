import * as THREE from 'three';
import * as dat from 'dat.gui'
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
import { Raycaster } from 'three';




const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, innerWidth / innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
const light = new THREE.DirectionalLight(0xFFFFFF, 1)
const lightBehind = new THREE.DirectionalLight(0xFFFFFF, 1)
const gui = new dat.GUI();
const rayCaster = new THREE.Raycaster();

const colors = [];

const mouse = {
	x: undefined,
	y: undefined
}
const world = {
	plane: {
		witdh: 10,
		height: 10,
		widthSegments: 10,
		heightSegments: 10
	}
}



light.position.set(0, 0, 1);
lightBehind.position.set(0, 0, -1);
renderer.setSize(innerWidth, innerHeight)
renderer.setPixelRatio(devicePixelRatio);
document.body.appendChild(renderer.domElement);
camera.position.z = 5;


const planeGeometry = new THREE.PlaneGeometry( 10, 10, 10, 10 );
const planeMaterial = new THREE.MeshPhongMaterial
({
	// color: 0xFF0000,
	side: THREE.DoubleSide,
	flatShading: 1,
	vertexColors: true
});
const plane = new THREE.Mesh(planeGeometry, planeMaterial);

gui.add(world.plane, 'witdh', 1, 20).onChange(() => {
	generatePlane();
})
gui.add(world.plane, 'height', 1, 20).onChange(() => {
	generatePlane();
})
gui.add(world.plane, 'widthSegments', 1, 20).onChange(() => {
	generatePlane();
})
gui.add(world.plane, 'heightSegments', 1, 20).onChange(() => {
	generatePlane();
})
gui.add(camera.position, 'z', 1, 50);

scene.add(plane);
scene.add(light);
scene.add(lightBehind);

function generatePlane () {
	plane.geometry.dispose();
	plane.geometry = new THREE.PlaneGeometry(world.plane.witdh, world.plane.height,
							world.plane.widthSegments, world.plane.heightSegments);
	random_z();
}


function random_z () {
	const {array} = plane.geometry.attributes.position
	for (let i = 0; i < array.length; i += 3)
	{
		const x = array[i];
		const y = array[i + 1];
		const z = array[i + 2];
		
		array[i + 2] = z + Math.random();
	}
}
	
function animate() {
	requestAnimationFrame(animate) 
	renderer.render(scene, camera);

	rayCaster.setFromCamera(mouse, camera);
	const intersect = rayCaster.intersectObject(plane);

	if (intersect.length > 0)
	{
		// console.log(intersect[0].object.geometry.attributes.color);
		intersect[0].object.geometry.attributes.color.setX(0, 1);

		intersect[0].object.geometry.attributes.color.needsUpdate = true;
		
	}
	
}

for (let i = 0; i < plane.geometry.attributes.position.count; i++)
	colors.push(0,0, 1);
plane.geometry.setAttribute('color', new THREE.BufferAttribute(new Float32Array(colors), 3));

new OrbitControls(camera, renderer.domElement);
random_z();
animate();

addEventListener('mousemove', (event) => {
	mouse.x = (event.clientX / innerWidth) * 2 - 1;
	mouse.y = -(event.clientY / innerHeight) * 2 + 1;
})
