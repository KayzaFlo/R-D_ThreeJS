import { PerspectiveCamera, OrthographicCamera } from "/vendor/three/build/three.module.js";

function createCamera() {
	// const aspect = 0.5;
	const aspect = window.innerHeight / window.innerWidth;
	const r = 8;

	// const camera = new PerspectiveCamera( 35, 1, 0.1, 100 );
	const camera = new OrthographicCamera( -r, r, -r * aspect, r * aspect, 0.01, 100 );

	// move the camera back so we can view the scene
	camera.position.set(0, 0, 10);

	return camera;
}

export { createCamera };
