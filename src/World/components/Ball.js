import { MonoBehaviour } from "../systems/MonoBehaviour.js";
import {
	Box3,
	Mesh,
	MeshStandardMaterial,
	Sphere,
	SphereGeometry,
	Vector3
} from "/vendor/three/build/three.module.js";

class Ball extends MonoBehaviour {
	
	constructor( terrain ) {
		super();
		this.terrain = terrain;
		this.bb = new Sphere( this.mesh.position, this.radius );

		this.leftBorder = new Box3( undefined, undefined );
		this.leftBorder.setFromObject( terrain.lineleft );
		this.rightBorder = new Box3( undefined, undefined );
		this.rightBorder.setFromObject( terrain.lineright );
		this.topBorder = new Box3( undefined, undefined );
		this.topBorder.setFromObject( terrain.linetop );
		this.bottomBorder = new Box3( undefined, undefined );
		this.bottomBorder.setFromObject( terrain.linebot );
	}
	
	start() {
		this.radius = 0.2;
		this.velocity = new Vector3(1, 1, 0);
		this.speed = 5;
		const g_sphere = new SphereGeometry( this.radius );
		const m_white = new MeshStandardMaterial({ color: 'white' });
		this.mesh = new Mesh( g_sphere, m_white );

		this.mesh.position.set(0, 0, -2);
	}

	update( dt ) {
		this.mesh.position.x += this.velocity.x * this.speed * dt;
		this.mesh.position.y += this.velocity.y * this.speed * dt;

		if (this.bb.intersectsBox( this.leftBorder ) && this.velocity.x < 0)
			this.velocity.x *= -1;
		if (this.bb.intersectsBox( this.rightBorder ) && this.velocity.x > 0 )
			this.velocity.x *= -1;
		if (this.bb.intersectsBox( this.bottomBorder ) && this.velocity.y < 0 )
			this.velocity.y *= -1;
		if (this.bb.intersectsBox( this.topBorder ) && this.velocity.y > 0 )
			this.velocity.y *= -1;
	}

}

export { Ball };


// function checkCollision(cx, cy, radius, rx, ry, rw, rh) {
// 	let testX = cx;
// 	let testY = cy;

// 	// which edge is closest?
// 	if (cx < rx)         testX = rx;      // test left edge
// 	else if (cx > rx+rw) testX = rx+rw;   // right edge
// 	if (cy < ry)         testY = ry;      // top edge
// 	else if (cy > ry+rh) testY = ry+rh;   // bottom edge

// 	// get distance from closest edges
// 	let distX = cx-testX;
// 	let distY = cy-testY;
// 	let distance = Math.sqrt( (distX*distX) + (distY*distY) );

// 	// if the distance is less than the radius, collision!
// 	if (distance <= radius) {
// 		return true;
// 	}
// 	return false;
// }