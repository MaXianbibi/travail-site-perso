import * as THREE from 'three';
import * as dat from 'dat.gui'


const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, innerWidth / innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
const light = new THREE.DirectionalLight(0xFFFFFF, 1)
const gui = new dat.GUI();
const world = {
	plane: {
		witdh: 10,
	}
}

light.position.set(0, 0, 1);
renderer.setSize(innerWidth, innerHeight)
renderer.setPixelRatio(devicePixelRatio);
document.body.appendChild(renderer.domElement);
camera.position.z = 5;


const planeGeometry = new THREE.PlaneGeometry( 10, 10, 10, 10 );
const planeMaterial = new THREE.MeshPhongMaterial
({
	color: 0xFF0000,
	side: THREE.DoubleSide,
	flatShading: 1
});
const plane = new THREE.Mesh(planeGeometry, planeMaterial);


gui.add(world.plane, 'witdh', 1, 20).onChange(() => {
	plane.geometry.dispose();
	plane.geometry = new THREE.PlaneGeometry(world.plane.witdh, 10, 10, 10);
	random_z();
})

scene.add(plane);
scene.add(light);



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
	
}
random_z();
animate();
