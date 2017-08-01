/*
 * @author: Saeid Nourian (snourian@concord.org)
 */

/* global THREE */

class Foundation extends ElementView {

	constructor(model) {
		super(model);
		this.draw();
	}

	draw() {
		const geometry = new THREE.BoxBufferGeometry(this.model.width, this.model.height, this.model.depth);
		geometry.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, this.model.depth / 2));	
		if (this.root)
			this.root.geometry = geometry;
		else
			this.root = new THREE.Mesh(geometry, new THREE.MeshStandardMaterial());
		this.root.name = "Foundation";
		this.root.userData = this.userData;		
		this.root.position.x = this.model.x;
		this.root.position.y = this.model.y;
		this.root.rotation.z = this.model.rotationAngle;
	}	

}