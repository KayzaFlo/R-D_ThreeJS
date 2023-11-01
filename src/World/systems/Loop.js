import { Clock } from "/vendor/three/build/three.module.js";
import { MonoBehaviour } from "./MonoBehaviour.js";

const clock = new Clock();
const updatables = [];

class Loop {
	constructor(camera, scene, renderer) {
		this.start = function() {
			renderer.setAnimationLoop(() => {
				//update
				this.tick();
				//render
				renderer.render(scene, camera);
			});
		}
		this.stop = function() { renderer.render(null); }

	}
	
	tick () {
		const delta = clock.getDelta();
		for(const object of updatables) {
			if ( object instanceof MonoBehaviour )
				object.update(delta);
			else
				console.warn("Weird element in Updatable tab !");
		}
	}

	static addUpdatable( object ) { updatables.push(object); }
	static removeUpdatable( object ) { updatables.pop(object); }
}

export { Loop };
