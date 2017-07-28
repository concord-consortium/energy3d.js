/*
 * @author: Saeid Nourian (snourian@concord.org)
 */

class FoundationModel extends ElementModel {

	constructor(width, height, depth, x, y, rotationAngle) {
		super(x, y);
		this.width = width || 10;
		this.height = height || 10;
		this.depth = depth || 0.2;
		this.rotationAngle = rotationAngle || 0;
	}

}