/*
 * @author: Saeid Nourian (snourian@concord.org)
 */

/* global Sidebar, UI, Infinity, Foundation, THREE */

Sidebar.Element.Foundation = function (editor, object) {

	var signals = editor.signals;

	var container = new UI.Row();

	var geometry = object.geometry;
	var parameters = geometry.parameters;

	// width

	var widthRow = new UI.Row();
	var width = new UI.Number(parameters.width).onChange(function () {
		editor.execute(new SetModelValueCommand(object.userData.elementView, "width", width.getValue()));
	});

	widthRow.add(new UI.Text('Width').setWidth('90px'));
	widthRow.add(width);

	container.add(widthRow);

	// height

	var heightRow = new UI.Row();
	var height = new UI.Number(parameters.height).onChange(function () {
		editor.execute(new SetModelValueCommand(object.userData.elementView, "height", height.getValue()));
	});

	heightRow.add(new UI.Text('Height').setWidth('90px'));
	heightRow.add(height);

	container.add(heightRow);

	// depth

	var depthRow = new UI.Row();
	var depth = new UI.Number(parameters.depth).onChange(function () {
		editor.execute(new SetModelValueCommand(object.userData.elementView, "depth", depth.getValue()));
	});

	depthRow.add(new UI.Text('Depth').setWidth('90px'));
	depthRow.add(depth);

	container.add(depthRow);

	// position

	var objectPositionRow = new UI.Row();
	var objectPositionX = new UI.Number().setWidth('50px').onChange(function () {
		editor.execute(new SetModelValueCommand(object.userData.elementView, "x", objectPositionX.getValue()));
	});
	var objectPositionY = new UI.Number().setWidth('50px').onChange(function () {
		editor.execute(new SetModelValueCommand(object.userData.elementView, "y", objectPositionY.getValue()));
	});

	objectPositionRow.add(new UI.Text('Position').setWidth('90px'));
	objectPositionRow.add(objectPositionX, objectPositionY);

	container.add(objectPositionRow);

	// rotation

	var objectRotationRow = new UI.Row();
	var objectRotationZ = new UI.Number().setStep(10).setUnit('°').setWidth('50px').onChange(function () {
		editor.execute(new SetModelValueCommand(object.userData.elementView, "rotationAngle", objectRotationZ.getValue() * THREE.Math.DEG2RAD));
	});

	objectRotationRow.add(new UI.Text('Rotation').setWidth('90px'));
	objectRotationRow.add(objectRotationZ);

	container.add(objectRotationRow);


	container.updateUI = function (object) {
		objectPositionX.setValue(object.position.x);
		objectPositionY.setValue(object.position.y);
		objectRotationZ.setValue(object.rotation.z * THREE.Math.RAD2DEG);
	};

	return container;

};

Sidebar.Geometry.BoxBufferGeometry = Sidebar.Geometry.BoxGeometry;
