/*
 * @author: Saeid Nourian (snourian@concord.org)
 */

/* global Sidebar, UI */

Sidebar.Map = function (editor) {

	var container = new UI.Panel();
	container.setBorderTop('0');
	container.setPaddingTop('20px');

	// address
	var row = new UI.Row();
	var addressInput = new UI.Input("25 Love lane, Concord, MA, USA").setWidth('210px').onChange(function () {
		editor.signals.sceneGraphChanged.dispatch();
	});

	addressInput.setMargin("5px");

	row.add(new UI.Text("Address"));
	row.add(addressInput);
	container.add(row);

	// latitude, longitude, zoom
	var row = new UI.Row();
	var latitudeInput = new UI.Input("42").setWidth('27px').onChange(function () {
		editor.signals.sceneGraphChanged.dispatch();
	});
	var longitudeInput = new UI.Input("-72").setWidth('27px').onChange(function () {
		editor.signals.sceneGraphChanged.dispatch();
	});
	var zoomInput = new UI.Input("20").setWidth('27px').onChange(function () {
		editor.signals.sceneGraphChanged.dispatch();
	});

	latitudeInput.setMargin("5px");
	longitudeInput.setMargin("5px");
	zoomInput.setMargin("5px");

	row.add(new UI.Text("Latitude"));
	row.add(latitudeInput);
	row.add(new UI.Text("Longitude"));
	row.add(longitudeInput);
	row.add(new UI.Text("Zoom"));
	row.add(zoomInput);
	container.add(row);

	// map image
	var row = new UI.Row();
	var mapImg = document.createElement('img');
	row.add(mapImg);
	container.add(row);

	return container;

};
