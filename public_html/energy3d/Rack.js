/*
 * @author: Saeid Nourian (snourian@concord.org)
 */

/* global THREE */

class Rack extends ElementView {

	static createMesh(width, height) {
		const geometry = new THREE.BoxBufferGeometry(width, height, 0.05);
		return geometry;
	}

	constructor() {
		super();
		const userData = new UserData(this);
		this.root = new THREE.Group();
		this.root.name = "Rack";
		this.root.userData = userData;

		this.topMesh = new THREE.Mesh(Rack.createMesh(1, 1, 0.05), new THREE.MeshStandardMaterial());
		this.topMesh.name = "Rack Top";
		this.topMesh.userData = userData;
		this.topMesh.position.z = 1;
		this.topMesh.rotation.x = 0.5;
		this.root.add(this.topMesh);

		this.update();
	}

	update() {
		this.root.children.length = 1;
		const scaleX = this.topMesh.geometry.parameters.width;
		const scaleY = this.topMesh.geometry.parameters.height * Math.cos(this.topMesh.rotation.x);
		for (let i = 0; i < scaleX; i += 1) {
			const x = i / 2;
			for (let j = 0; j < scaleY; j += 1) {
				const y = j / 2;
				this.addPole(new THREE.Vector3(x, y, 0), 1);
				if (i !== 0)
					this.addPole(new THREE.Vector3(-x, y, 0), 1);
				if (j !== 0) {
					this.addPole(new THREE.Vector3(x, -y, 0), 1);
					if (i !== 0)
						this.addPole(new THREE.Vector3(-x, -y, 0), 1);
				}
			}
		}
	}

	addPole(position, poleHeight) {
		const radius = 0.05;
		poleHeight += (position.y - radius) * Math.tan(this.topMesh.rotation.x);
		const geometry = new THREE.CylinderBufferGeometry(radius, radius, poleHeight, 20);
		const material = new THREE.MeshBasicMaterial();
		const pole = new THREE.Mesh(geometry, material);
		pole.name = "Rack Pole";
		position.z = poleHeight / 2;
		pole.position.copy(position);
		pole.rotation.x = Math.PI / 2;
		pole.scale.x = 1 / this.root.scale.x;
		pole.scale.z = 1 / this.root.scale.y;
		this.root.add(pole);
	}

	draw() {

	}

}