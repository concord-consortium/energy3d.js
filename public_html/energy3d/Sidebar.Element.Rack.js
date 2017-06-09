/*
 * @author: Saeid Nourian (snourian@concord.org)
 */

/* global Sidebar, UI, Infinity, Foundation, THREE, Rack */

Sidebar.Element.Rack = function (editor, object) {

	var signals = editor.signals;

	var container = new UI.Row();

	var parameters = object.userData.elementView.topMesh.geometry.parameters;

	// width

	var widthRow = new UI.Row();
	var width = new UI.Number(parameters.width).onChange(updateGeometry);

	widthRow.add(new UI.Text('Width').setWidth('90px'));
	widthRow.add(width);

	container.add(widthRow);

	// height

	var heightRow = new UI.Row();
	var height = new UI.Number(parameters.height).onChange(updateGeometry);

	heightRow.add(new UI.Text('Height').setWidth('90px'));
	heightRow.add(height);

	container.add(heightRow);

	// position

	var objectPositionRow = new UI.Row();
	var objectPositionX = new UI.Number().setWidth('50px').onChange(update);
	var objectPositionY = new UI.Number().setWidth('50px').onChange(update);

	objectPositionRow.add(new UI.Text('Position').setWidth('90px'));
	objectPositionRow.add(objectPositionX, objectPositionY);

	container.add(objectPositionRow);

	// rotation

	var objectRotationRow = new UI.Row();
	var objectRotationX = new UI.Number().setStep(10).setUnit('°').setWidth('50px').onChange(update);
	var objectRotationZ = new UI.Number().setStep(10).setUnit('°').setWidth('50px').onChange(update);

	objectRotationRow.add(new UI.Text('Rotation').setWidth('90px'));
	objectRotationRow.add(objectRotationX, objectRotationZ);

	container.add(objectRotationRow);


	function updateGeometry() {
		editor.execute(new SetGeometryCommand(object.userData.elementView.topMesh, Rack.createMesh(width.getValue(), height.getValue())));
	}

	function update() {
		let target = object.userData.elementView.root;
		var newPosition = new THREE.Vector3(objectPositionX.getValue(), objectPositionY.getValue(), target.position.z);
		if (target.position.distanceTo(newPosition) >= 0.01) {
			editor.execute(new SetPositionCommand(target, newPosition));
		}

		var newRotation = new THREE.Euler(0, 0, objectRotationZ.getValue() * THREE.Math.DEG2RAD);
		if (target.rotation.toVector3().distanceTo(newRotation.toVector3()) >= 0.01) {
			editor.execute(new SetRotationCommand(target, newRotation));
		}

		target = object.userData.elementView.topMesh;
		var newRotation = new THREE.Euler(objectRotationX.getValue() * THREE.Math.DEG2RAD, 0, 0);
		if (target.rotation.toVector3().distanceTo(newRotation.toVector3()) >= 0.01) {
			editor.execute(new SetRotationCommand(target, newRotation));
		}
	}

	return container;

};

Sidebar.Geometry.BoxBufferGeometry = Sidebar.Geometry.BoxGeometry;
