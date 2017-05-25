/*
 * @author: Saeid Nourian (snourian@concord.org)
 */

/* global THREE */

class Foundation extends ElementView {

	constructor() {
		super();
		const mesh = new THREE.Mesh(new THREE.BoxBufferGeometry(10, 10, 0.2), new THREE.MeshStandardMaterial());
		mesh.name = "Foundation";
		mesh.userData = new UserData(this);
		mesh.position.z = 0.1;
		this.root = mesh;
	}

}