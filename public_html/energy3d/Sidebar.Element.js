/*
 * @author: Saeid Nourian (snourian@concord.org)
 */

/* global Sidebar, UI, THREE */

Sidebar.Element = function (editor) {

	var signals = editor.signals;

	var container = new UI.Panel();
	container.setBorderTop('0');
	container.setPaddingTop('20px');

	// type

	var elementTypeRow = new UI.Row();
	var elementType = new UI.Text();

	elementTypeRow.add(new UI.Text('Type').setWidth('90px'));
	elementTypeRow.add(elementType);

	container.add(elementTypeRow);

	// name

	var elementNameRow = new UI.Row();
	var elementName = new UI.Input().setWidth('150px').setFontSize('12px').onChange(function () {
		editor.execute(new SetValueCommand(editor.selected, 'name', elementName.getValue()));
	});

	elementNameRow.add(new UI.Text('Name').setWidth('90px'));
	elementNameRow.add(elementName);

	container.add(elementNameRow);

	// parameters

	var parameters = new UI.Span();
	container.add(parameters);

	function build() {
		var object = editor.selected;
		if (object && object.userData.elementView) {
			container.setDisplay('block');
			const type = object.userData.elementView.constructor.name;
			elementType.setValue(type);
			elementName.setValue(object.name);
			parameters.clear();
			if (Sidebar.Element[ type ] !== undefined) {
				parameters.add(new Sidebar.Element[ type ](editor, object));
			}
		} else {
			container.setDisplay('none');
		}
	}

	signals.objectSelected.add(build);
	signals.geometryChanged.add(build);

	return container;
};
