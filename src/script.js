import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import * as dat from "lil-gui";

// Import shaders
import sinusVertexShader from "./shaders/sinus/sinus.vs.glsl";
import sinusFragmentShader from "./shaders/sinus/sinus.fs.glsl";
import mandelbrotVertexShader from "./shaders/mandelbrot/mandelbrot.vs.glsl";
import mandelbrotFragmentShader from "./shaders/mandelbrot/mandelbrot.fs.glsl";
import blinnPhongVertexShader from "./shaders/blinnPhong/blinnPhong.vs.glsl";
import blinnPhongFragmentShader from "./shaders/blinnPhong/blinnPhong.fs.glsl";
import hexagonVertexShader from "./shaders/hexagon/hexagon.vs.glsl";
import hexagonFragmentShader from "./shaders/hexagon/hexagon.fs.glsl";
import hexagonGridVertexShader from "./shaders/hexagonGrid/hexagonGrid.vs.glsl";
import hexagonGridFragmentShader from "./shaders/hexagonGrid/hexagonGrid.fs.glsl";

/**
 * Base
 */
// Debug
const gui = new dat.GUI();

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xa3ffcb);

const backgroundParams = {
	color: 0xa3ffcb,
};
gui.addColor(backgroundParams, "color").onChange(() => {
	scene.background.set(backgroundParams.color);
});

/**
 * Test mesh
 */
// Geometry
const geometry = new THREE.PlaneGeometry(1, 1, 32, 32);
const cubeGeometry = new THREE.BoxBufferGeometry(1, 1, 1, 32, 32, 32);
const planeGeometry = new THREE.PlaneBufferGeometry(1, 1, 32, 32);
const sphereGeometry = new THREE.SphereBufferGeometry(0.5, 32, 32);

// Material
const time = 0;

const sinusParams = {
	xScale: 15.0,
	yScale: 15.0,
	xOffset: 1.0,
	yOffset: 1.0,
	xCenter: 0.5,
	yCenter: 0.5,
	xSpeed: 1.0,
	ySpeed: 1.0,
	thickness: 0.01,
};

const sinusMaterial = new THREE.RawShaderMaterial({
	vertexShader: sinusVertexShader,
	fragmentShader: sinusFragmentShader,
	side: THREE.DoubleSide,
	uniforms: {
		uSinXScale: { value: sinusParams.xScale },
		uSinYScale: { value: sinusParams.yScale },
		uSinXOffset: { value: sinusParams.xOffset },
		uSinYOffset: { value: sinusParams.yOffset },
		uSinYOffset: { value: sinusParams.yOffset },
		uXSpeed: { value: sinusParams.xSpeed },
		uYSpeed: { value: sinusParams.ySpeed },
		uXCenter: { value: sinusParams.xCenter },
		uYCenter: { value: sinusParams.yCenter },
		uThickness: { value: sinusParams.thickness },
		uTime: { value: time },
	},
});

const materialMandelbrot = new THREE.RawShaderMaterial({
	vertexShader: mandelbrotVertexShader,
	fragmentShader: mandelbrotFragmentShader,
	side: THREE.DoubleSide,
});

const sinusGuiFolder = gui.addFolder("Sinus Shader");

sinusGuiFolder
	.add(sinusParams, "xScale")
	.min(0)
	.max(35)
	.step(1)
	.onChange(() => {
		sinusMaterial.uniforms.uSinXScale.value = sinusParams.xScale;
	});

sinusGuiFolder
	.add(sinusParams, "yScale")
	.min(0)
	.max(35)
	.step(1)
	.onChange(() => {
		sinusMaterial.uniforms.uSinYScale.value = sinusParams.yScale;
	});

sinusGuiFolder
	.add(sinusParams, "xOffset")
	.min(0)
	.max(35)
	.step(0.1)
	.onChange(() => {
		sinusMaterial.uniforms.uSinXOffset.value = sinusParams.xOffset;
	});

sinusGuiFolder
	.add(sinusParams, "yOffset")
	.min(0)
	.max(35)
	.step(0.1)
	.onChange(() => {
		sinusMaterial.uniforms.uSinYOffset.value = sinusParams.yOffset;
	});

sinusGuiFolder
	.add(sinusParams, "xCenter")
	.min(0)
	.max(1)
	.step(0.01)
	.onChange(() => {
		sinusMaterial.uniforms.uXCenter.value = sinusParams.xCenter;
	});

sinusGuiFolder
	.add(sinusParams, "yCenter")
	.min(0)
	.max(1)
	.step(0.01)
	.onChange(() => {
		sinusMaterial.uniforms.uYCenter.value = sinusParams.yCenter;
	});

sinusGuiFolder
	.add(sinusParams, "xSpeed")
	.min(0)
	.max(50)
	.step(0.1)
	.onChange(() => {
		sinusMaterial.uniforms.uXSpeed.value = sinusParams.xSpeed;
	});

sinusGuiFolder
	.add(sinusParams, "ySpeed")
	.min(0)
	.max(50)
	.step(0.1)
	.onChange(() => {
		sinusMaterial.uniforms.uYSpeed.value = sinusParams.ySpeed;
	});

sinusGuiFolder
	.add(sinusParams, "thickness")
	.min(0)
	.max(0.25)
	.step(0.001)
	.onChange(() => {
		sinusMaterial.uniforms.uThickness.value = sinusParams.thickness;
	});

// Blinn Phong

const blinnPhongParams = {
	uLightIntensity: new THREE.Vector3(1.0, 0.5, 1.0),
	uKd: new THREE.Vector3(0.1, 1.0, 0.2),
	uKs: new THREE.Vector3(1.0, 0.2, 0.2),
	uShininess: 22.0,
};

const blinnPhongMaterial = new THREE.RawShaderMaterial({
	vertexShader: blinnPhongVertexShader,
	fragmentShader: blinnPhongFragmentShader,
	side: THREE.DoubleSide,
	uniforms: {
		uLightDirection_vs: { value: new THREE.Vector3(2.0, 3.0, 1.0) },
		uLightIntensity: { value: blinnPhongParams.uLightIntensity },
		uKd: { value: blinnPhongParams.uKd },
		uKs: { value: blinnPhongParams.uKs },
		uShininess: { value: blinnPhongParams.uShininess },
	},
});

const blinnPhongGuiFolder = gui.addFolder("Blinn Phong Shader");

blinnPhongGuiFolder
	.add(blinnPhongParams, "uShininess")
	.min(0)
	.max(99)
	.step(1)
	.onChange(() => {
		blinnPhongMaterial.uniforms.uShininess.value = blinnPhongParams.uShininess;
	});

const hexagonMaterial = new THREE.RawShaderMaterial({
	vertexShader: hexagonVertexShader,
	fragmentShader: hexagonFragmentShader,
	side: THREE.DoubleSide,
	uniforms: {
		uTime: { value: time },
	},
});

const hexagonGridMaterial = new THREE.RawShaderMaterial({
	vertexShader: hexagonGridVertexShader,
	fragmentShader: hexagonGridFragmentShader,
	side: THREE.DoubleSide,
	uniforms: {
		uTime: { value: time },
	},
});

// Meshes
const mesh1 = new THREE.Mesh(cubeGeometry, sinusMaterial);

const mesh2 = new THREE.Mesh(cubeGeometry, materialMandelbrot);
mesh2.position.set(2, 0, 0);

const mesh3 = new THREE.Mesh(sphereGeometry, blinnPhongMaterial);
mesh3.position.set(4, 0, 0);

const mesh4 = new THREE.Mesh(cubeGeometry, hexagonMaterial);
mesh4.position.set(6, 0, 0);

const mesh5 = new THREE.Mesh(cubeGeometry, hexagonGridMaterial);
mesh5.position.set(8, 0, 0);

const group = new THREE.Group();
group.add(mesh1);
group.add(mesh2);
group.add(mesh3);
group.add(mesh4);
group.add(mesh5);

scene.add(group);

let meshNumber = group.children.length;
let currentFocusIndex = 0;

/**
 * Sizes
 */
const sizes = {
	width: window.innerWidth,
	height: window.innerHeight,
};

window.addEventListener("resize", () => {
	// Update sizes
	sizes.width = window.innerWidth;
	sizes.height = window.innerHeight;

	// Update camera
	camera.aspect = sizes.width / sizes.height;
	camera.updateProjectionMatrix();

	// Update renderer
	renderer.setSize(sizes.width, sizes.height);
	renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
	75,
	sizes.width / sizes.height,
	0.1,
	100
);
camera.position.set(0, 0, 2);
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

// Keys
document.addEventListener("keydown", (e) => {
	if (e.key === "d") {
		if (currentFocusIndex < meshNumber - 1) {
			currentFocusIndex++;
			controls.target = group.children[currentFocusIndex].position;
			controls.update();
		}
	}
	if (e.key === "q") {
		if (currentFocusIndex > 0) {
			currentFocusIndex--;
			controls.target = group.children[currentFocusIndex].position;
			controls.update();
		}
	}
});

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
	canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

//cameraDirection.subVectors(mesh3.position, camera.position);
//blinnPhongMaterial.uniforms.uLightDirection.value = cameraDirection;
/**
 * Animate
 */

const clock = new THREE.Clock();

const tick = () => {
	// Time
	const elapsedTime = clock.getElapsedTime();

	// Udapte material
	sinusMaterial.uniforms.uTime.value = elapsedTime;
	hexagonMaterial.uniforms.uTime.value = elapsedTime;
	// Update controls
	controls.update();

	// Render
	renderer.render(scene, camera);

	// Call tick again on the next frame
	window.requestAnimationFrame(tick);
};

tick();
