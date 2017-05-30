/*
 * @author: Saeid Nourian (snourian@concord.org)
 */

/* global THREE */

class Rack extends ElementView {

	constructor() {
		super();
		const userData = new UserData(this);
		this.root = new THREE.Group();
		this.root.name = "Rack";
		this.root.userData = userData;

		const topMesh = new THREE.Mesh(new THREE.BoxBufferGeometry(1, 1, 0.05), new THREE.MeshStandardMaterial());
		topMesh.name = "Rack Top";
		topMesh.userData = userData;
		topMesh.position.z = 1;
		topMesh.rotation.x = 0.5;
		this.root.add(topMesh);

		this.update();
	}

	update() {
		this.root.children.length = 1;
		this.addPole(new THREE.Vector3(), 1);
	}

	addPole(position, poleHeight) {
		const radius = 0.05;
		poleHeight -= -0.5 * radius; // slightly shorter so that the pole won't penetrate the surface of the rack
		const geometry = new THREE.CylinderBufferGeometry(radius, radius, poleHeight, 20);
		const material = new THREE.MeshBasicMaterial();
		const pole = new THREE.Mesh(geometry, material);
		pole.name = "Rack Pole";
		position.z = poleHeight / 2;
		pole.position.copy(position);
		pole.rotation.x = Math.PI / 2;
		pole.scale.x = 1 / this.root.scale.x;
		pole.scale.y = 1 / this.root.scale.y;
		this.root.add(pole);
	}

	draw() {

	}

}