/*
 * @author: Saeid Nourian (snourian@concord.org)
 */

/**
 * @author mrdoob / http://mrdoob.com/
 */

Sidebar.Energy = function (editor) {

	var container = new UI.Panel();
	container.setBorderTop('0');
	container.setPaddingTop('20px');


	// date
	var row = new UI.Row();
	var dateInput = new UI.Input("1/1/2017").onChange(function () {
		console.log(dateInput.getValue());
	});

	row.add(new UI.Text('Date').setWidth('90px'));
	row.add(dateInput);
	container.add(row);

	// time
	var row = new UI.Row();
	var timeInput = new UI.Input("24:00").onChange(function () {
		console.log(timeInput.getValue());
	});

	row.add(new UI.Text('Time').setWidth('90px'));
	row.add(timeInput);
	container.add(row);

	// city
	var options = ["Boston", "Ottawa", "Tehran"];
	var row = new UI.Row();
	var citySelect = new UI.Select().setOptions(options).setWidth('150px').onChange(function () {

		var value = this.getValue();


	});
	citySelect.setValue(0);

	row.add(new UI.Text('City').setWidth('90px'));
	row.add(citySelect);
	container.add(row);

	// latitude
	var row = new UI.Row();
	var latitudeInput = new UI.Input("42").onChange(function () {
		console.log(latitudeInput.getValue());
		Heliodon.instance.setLatitude(latitudeInput.getValue());
		editor.signals.sceneGraphChanged.dispatch();
	});

	row.add(new UI.Text('Latitude').setWidth('90px'));
	row.add(latitudeInput);
	container.add(row);

	return container;

};
