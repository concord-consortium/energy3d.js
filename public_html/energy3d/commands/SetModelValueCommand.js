/*
 * @author: Saeid Nourian (snourian@concord.org)
 */

/* global Command */

class SetModelValueCommand extends Command {

	constructor(object, attributeName, newValue) {
		super();

		this.type = 'SetValueCommand';
		this.name = 'Set ' + attributeName;
		this.updatable = true;

		this.object = object;
		this.attributeName = attributeName;
		this.oldValue = (object !== undefined) ? object.model[ attributeName ] : undefined;
		this.newValue = newValue;
	}

	execute() {
		this.object.model[ this.attributeName ] = this.newValue;
		this.object.draw();
		this.editor.signals.objectChanged.dispatch(this.object.root);
		this.editor.signals.sceneGraphChanged.dispatch();
		
	}

	undo() {
		this.object.model[ this.attributeName ] = this.oldValue;
		this.object.draw();
		this.editor.signals.objectChanged.dispatch(this.object.root);
	}

	update(cmd) {
		this.newValue = cmd.newValue;
	}

	toJSON() {
		var output = super.toJSON();

		output.objectUuid = this.object.uuid;
		output.attributeName = this.attributeName;
		output.oldValue = this.oldValue;
		output.newValue = this.newValue;

		return output;
	}

	fromJSON(json) {
		super.fromJSON(json);

		this.attributeName = json.attributeName;
		this.oldValue = json.oldValue;
		this.newValue = json.newValue;
		this.object = this.editor.objectByUuid(json.objectUuid);
	}

}
