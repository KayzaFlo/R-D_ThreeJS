import { World } from "../World.js";
import { Loop } from "./Loop.js";

class MonoBehaviour {
	constructor( isStatic=false ) {
		if ( !isStatic )
			Loop.addUpdatable( this );
		this.start();
		// this.mesh = this.generate();
		World.add( this.mesh );

		this.generate = function() {};
	}
	
	start() {
		// World.add( this.mesh );
		
	}

	update( dt ) {

	}
	
	delete() {
		World.remove( this.mesh );
		Loop.removeUpdatable( this );
	}
}

export { MonoBehaviour };
