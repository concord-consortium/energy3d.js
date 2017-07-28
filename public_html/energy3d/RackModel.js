/*
 * @author: Saeid Nourian (snourian@concord.org)
 */

class RackModel extends ElementModel {

	constructor(dimensionWidth, dimensionHeight, pollHeight, pollDistanceX, pollDistanceY, rotationAngle, tiltAngle, x, y) {
		super(x, y);
		this.dimensionWidth = dimensionWidth || 2;
		this.dimensionHeight = dimensionHeight || 1;
		this.pollHeight = pollHeight || 1;
		this.pollDistanceX = pollDistanceX || 1;
		this.pollDistanceY = pollDistanceY || 1;
		this.rotationAngle = rotationAngle || 0;
		this.tiltAngle = tiltAngle || 0.5;
	}
}