import { Clock } from "/vendor/three/build/three.module.js";

const clock = new Clock();

class Loop {
	constructor(camera, scene, renderer) {
		this.camera = camera;
		this.scene = scene;
		this.renderer = renderer;
		this.updatables = [];
	}

	start() {
		this.renderer.setAnimationLoop(() => {
			//update
			this.tick();
			//render
			this.renderer.render(this.scene, this.camera);
		});
	}

	stop() {
		this.renderer.render(null);
	}

	tick () {
		const delta = clock.getDelta();

		for(const object of this.updatables) {
			object.tick(delta);
		}
	}
}

export { Loop };