/*
 * Author: Saeid Nourian (snourian@concord.org)
 */

class MathUtils {
	static zeroTolerance() {
		return 0.0001;
	}

	static twoPI() {
		return Math.PI * 2;
	}

	static sphericalToCartesianZ(sphereCoords) {
		let a = sphereCoords.x * Math.cos(sphereCoords.z);
		let x = a * Math.cos(sphereCoords.y);
		let y = a * Math.sin(sphereCoords.y);
		let z = sphereCoords.x * Math.sin(sphereCoords.z);
		sphereCoords.set(x, y, z);
		return sphereCoords;
	}
}

