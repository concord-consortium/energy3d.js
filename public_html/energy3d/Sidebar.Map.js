/*
 * @author: Saeid Nourian (snourian@concord.org)
 */

/* global Sidebar, UI */

Sidebar.Map = function (editor) {

	function updateMap() {
		mapImg.src = getGoogleMapUrl(false);
	}

	function getGoogleMapUrl(highResolution) {
		let x = parseFloat(latitudeInput.getValue());
		let y = parseFloat(longitudeInput.getValue());
		let zoom = parseFloat(zoomInput.getValue());
		let scale = highResolution & zoom <= 20 ? 2 : 1;
		return "https://maps.googleapis.com/maps/api/staticmap?maptype=satellite&center=" + x + "," + y + "&zoom=" + zoom + "&size=640x640&scale=" + scale + "&key=AIzaSyBEGiCg33CccHloDdPENWk1JDhwTEQaZQ0";
}

	function getGoogleMapAddressCoordinates() {
		const address = addressInput.getValue().replace(' ', '+');
		const url = "https://maps.googleapis.com/maps/api/geocode/json?address=" + address + "&key=AIzaSyD7MfCQjMAlsdFA3OmfGZ_rzC8ldJPnoHc";
		const xmlHttp = new XMLHttpRequest();
		xmlHttp.onreadystatechange = function () {
			if (xmlHttp.readyState === 4 && xmlHttp.status === 200) {
				const result = JSON.parse(xmlHttp.responseText).results[0];
				addressInput.setValue(result.formatted_address);
				latitudeInput.setValue(result.geometry.location.lat);
				longitudeInput.setValue(result.geometry.location.lng);
				zoomInput.setValue(20);
				updateMap();
			}
		};
		xmlHttp.open("GET", url, true); // true for asynchronous
		xmlHttp.send(null);
	}

	var container = new UI.Panel();
	container.setBorderTop('0');
	container.setPaddingTop('20px');

	// address
	var row = new UI.Row();
	var addressInput = new UI.Input("25 Love lane, Concord, MA, USA").setWidth('210px').onChange(function () {
		getGoogleMapAddressCoordinates();
	});

	addressInput.setMargin("5px");

	row.add(new UI.Text("Address"));
	row.add(addressInput);
	container.add(row);

	// latitude, longitude, zoom
	var row = new UI.Row();
	var latitudeInput = new UI.Input("42.45661").setWidth('27px').onChange(function () {
		updateMap();
	});
	var longitudeInput = new UI.Input("-71.35823").setWidth('27px').onChange(function () {
		updateMap();
	});
	var zoomInput = new UI.Input("20").setWidth('27px').onChange(function () {
		updateMap();
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
	mapImg.style.width = "100%";
	mapImg.src = getGoogleMapUrl(false);
	row.dom.appendChild(mapImg);
	container.add(row);

	// apply button
	var applyButton = new UI.Button("Apply");
	var clearButton = new UI.Button("Clear");

	applyButton.setMargin("5px");
	clearButton.setMargin("5px");

	var row = new UI.Row();
	row.add(applyButton);
	row.add(clearButton);
	container.add(row);

	return container;

};
