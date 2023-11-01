import { createCamera } from './components/camera.js';
import { createLights } from './components/lights.js';
import { createScene } from './components/scene.js';

import { createRenderer } from './systems/renderer.js';
import { Resizer } from './systems/Resizer.js';
import { Loop } from './systems/Loop.js';

import { Terrain } from './components/terrain.js';
import { Ball } from './components/Ball.js';
import { Vector2 } from "/vendor/three/build/three.module.js";

let scene;
let camera;
let renderer;
let loop;

class World {
	constructor( container ) {
		camera = createCamera();
		scene = createScene();
		renderer = createRenderer();
		loop = new Loop(camera, scene, renderer);
		container.append(renderer.domElement);

		const terrain = new Terrain(new Vector2(16, 10), 4, 0.4);
		const ball = new Ball( terrain );
		const { ambientLight, mainLight } = createLights();

		scene.add( ambientLight, mainLight, terrain.mesh );

		const resizer = new Resizer(container, camera, renderer);

		this.render = function() { renderer.render(scene, camera); }
		this.start = function() { loop.start();	}
		this.stop = function() { loop.stop(); }
	}

	static add( mesh ) {
		scene.add( mesh )
	}

	static remove( mesh ) {
		mesh.geometry.dispose();		// unsure
		mesh.material.dispose();		// unsure
		scene.remove( mesh );
		renderer.renderLists.dispose();	// unsure
	}
}

export { World };
