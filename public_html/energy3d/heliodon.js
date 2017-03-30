/*
 * Author: Saeid Nourian (snourian@concord.org)
 */

/* global THREE, MathUtils */

class Heliodon {
	constructor() {
		this.root = new THREE.Object3D();
	}

	draw() {
		this.drawBase();
	}

	drawBase() {
		const r = 5.0;
		const BASE_DIVISIONS = 72;
		const step = Math.PI * 2 / BASE_DIVISIONS;
		const baseGeometry = new THREE.Geometry();
		const baseTicksGeometry = new THREE.Geometry();
		let counter = 0;

		for (let angle = 0; angle < MathUtils.twoPI() + step / 2.0; angle += step) {
			let trimedAngle;
			if (angle > MathUtils.twoPI())
				trimedAngle = MathUtils.twoPI();
			else
				trimedAngle = angle;

			let width = 0.3;
			baseGeometry.vertices.push(MathUtils.sphericalToCartesianZ(new THREE.Vector3(r, trimedAngle, 0)));
			baseGeometry.vertices.push(MathUtils.sphericalToCartesianZ(new THREE.Vector3(r + width, trimedAngle, 0)));

			if (MathUtils.twoPI() - trimedAngle > MathUtils.zeroTolerance()) {
				width = counter % 3 === 0 ? 0.5 : 0.3;
				baseTicksGeometry.vertices.push(MathUtils.sphericalToCartesianZ(new THREE.Vector3(r, trimedAngle, 0)));
				baseTicksGeometry.vertices.push(MathUtils.sphericalToCartesianZ(new THREE.Vector3(r + width, trimedAngle, 0)));
			}
			counter++;
		}

		const normal = new THREE.Vector3(0, 0, 1);
		for (let i = 0; i < counter - 1; i++) {
			const c = (Math.floor(i / 3)) % 2 === 0 ? 0.5 : 1.0;
			const color = new THREE.Color(c, c, c);
			baseGeometry.faces.push(new THREE.Face3(i * 2, i * 2 + 1, i * 2 + 2, normal, color));
			baseGeometry.faces.push(new THREE.Face3(i * 2 + 1, i * 2 + 3, i * 2 + 2, normal, color));
		}

		var base = new THREE.Mesh(baseGeometry, new THREE.MeshBasicMaterial({vertexColors: THREE.FaceColors}));
		let baseTicks = new THREE.LineSegments(baseTicksGeometry, new THREE.MeshBasicMaterial({color: 0x000000}));
		this.root.add(base);
		this.root.add(baseTicks);
	}

}