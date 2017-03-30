/*
 * Author: Saeid Nourian (snourian@concord.org)
 */

/* global THREE, MathUtils */

class Heliodon {
	static get TILT_ANGLE() {
		return 23.45 / 180.0 * Math.PI;
	}

	static get DECLINATION_DIVISIONS() {
		return 12;
	}

	static get HOUR_DIVISIONS() {
		return 96;
	}

	constructor() {
		this.latitude = 42 / 180.0 * Math.PI;
		this.root = new THREE.Object3D();
	}

	draw() {
		this.drawBase();
		this.drawSunRegion();
	}

	drawBase() {
		const r = 5.0;
		const BASE_DIVISIONS = 72;
		const step = Math.PI * 2 / BASE_DIVISIONS;
		const baseGeometry = new THREE.Geometry();
		const baseTicksGeometry = new THREE.Geometry();
		let counter = 0;

		for (let angle = 0; angle < MathUtils.TWO_PI + step / 2.0; angle += step) {
			let trimedAngle;
			if (angle > MathUtils.TWO_PI) {
				trimedAngle = MathUtils.TWO_PI;
			} else {
				trimedAngle = angle;
			}

			let width = 0.3;
			baseGeometry.vertices.push(MathUtils.sphericalToCartesianZ(new THREE.Vector3(r, trimedAngle, 0)));
			baseGeometry.vertices.push(MathUtils.sphericalToCartesianZ(new THREE.Vector3(r + width, trimedAngle, 0)));

			if (MathUtils.TWO_PI - trimedAngle > MathUtils.ZERO_TOLERANCE) {
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

	drawSunRegion() {
		const declinationStep = 2.0 * Heliodon.TILT_ANGLE / Heliodon.DECLINATION_DIVISIONS;
		const hourStep = MathUtils.TWO_PI / Heliodon.HOUR_DIVISIONS;
		const geometry = new THREE.Geometry();
		let verticesCount = 0;
		for (let declinationAngle = -Heliodon.TILT_ANGLE; declinationAngle < Heliodon.TILT_ANGLE - declinationStep / 2.0; declinationAngle += declinationStep) {
			for (let hourAngle = -Math.PI; hourAngle < Math.PI - hourStep / 2.0; hourAngle += hourStep) {
				let hourAngle2 = hourAngle + hourStep;
				let declinationAngle2 = declinationAngle + declinationStep;
				if (hourAngle2 > Math.PI) {
					hourAngle2 = Math.PI;
				}
				if (declinationAngle2 > Heliodon.TILT_ANGLE) {
					declinationAngle2 = Heliodon.TILT_ANGLE;
				}
				const v1 = this.computeSunLocation(hourAngle, declinationAngle, this.latitude);
				const v2 = this.computeSunLocation(hourAngle2, declinationAngle, this.latitude);
				const v3 = this.computeSunLocation(hourAngle2, declinationAngle2, this.latitude);
				const v4 = this.computeSunLocation(hourAngle, declinationAngle2, this.latitude);
				if (v1.z >= 0 || v2.z >= 0 || v3.z >= 0 || v4.z >= 0) {
					geometry.vertices.push(v1, v2, v3, v4);
					geometry.faces.push(new THREE.Face3(verticesCount, verticesCount + 1, verticesCount + 2));
					geometry.faces.push(new THREE.Face3(verticesCount, verticesCount + 2, verticesCount + 3));
					verticesCount += 4;
				}
			}
		}
		let material = new THREE.MeshBasicMaterial({
			side: THREE.DoubleSide,
			color: new THREE.Color(1, 1, 0),
			transparent: true,
			opacity: 0.5
		});
		let sunRegion = new THREE.Mesh(geometry, material);
		this.root.add(sunRegion);
	}

	computeSunLocation(hourAngle, declinationAngle, observerLatitude) {
		let altitudeAngle = Math.asin(Math.sin(declinationAngle) * Math.sin(observerLatitude) + Math.cos(declinationAngle) * Math.cos(hourAngle) * Math.cos(observerLatitude));
		let x_azm = Math.sin(hourAngle) * Math.cos(declinationAngle);
		let y_azm = (-(Math.cos(hourAngle)) * Math.cos(declinationAngle) * Math.sin(observerLatitude)) + (Math.cos(observerLatitude) * Math.sin(declinationAngle));
		let azimuthAngle = Math.atan2(y_azm, x_azm);

		let r = 5;
		let coords = new THREE.Vector3(r, azimuthAngle, altitudeAngle);
		MathUtils.sphericalToCartesianZ(coords);
		coords.setX(-coords.x); // reverse the x so that sun moves from east to west
		return coords;
	}

}