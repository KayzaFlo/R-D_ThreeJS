import {
	BoxGeometry,
	Mesh,
	MeshBasicMaterial,
	MeshStandardMaterial,
	Vector2,
	Vector3
} from "/vendor/three/build/three.module.js";

class Terrain {
	constructor( size, lineWidth, margin ) {
		this.size = size;
		this.lineWidth = lineWidth;
		this.margin = margin;
		
		const g_terrain = new BoxGeometry(this.size.x, this.size.y, 1);
		const g_lineh = new BoxGeometry(this.size.x - this.margin * 2, this.lineWidth, 10);
		const g_linev = new BoxGeometry(this.lineWidth, this.size.y - this.margin * 2, 10);
		const m_black = new MeshBasicMaterial({ color: 'black' });
		const m_white = new MeshStandardMaterial({ color: 'white' });
		this.terrain = new Mesh(g_terrain, m_black);
		this.linetop = new Mesh(g_lineh, m_white);
		this.linebot = new Mesh(g_lineh, m_white);
		this.lineright = new Mesh(g_linev, m_white);
		this.lineleft = new Mesh(g_linev, m_white);
	
		this.terrain.add(this.linetop, this.linebot, this.lineright, this.lineleft);
	
		this.linetop.position.set(0, this.size.y / 2 - this.margin - this.lineWidth / 2, 0);
		this.linebot.position.set(0, -(this.size.y / 2 - this.margin - this.lineWidth / 2), 0);
		this.lineright.position.set(this.size.x / 2 - this.margin - this.lineWidth / 2, 0, 0);
		this.lineleft.position.set(-(this.size.x / 2 - this.margin - this.lineWidth / 2), 0, 0);
	
		this.terrain.position.z = -10;
	}

	get mesh() { return this.terrain; }

	get right() { return this.size.x / 2 - this.margin - this.lineWidth; }
	get left() { return -this.right; }
	get top() { return this.size.y / 2 - this.margin - this.lineWidth; }
	get bottom() { return -this.top; }

	// get ll() { return this.lineleft; }
}

export { Terrain };
